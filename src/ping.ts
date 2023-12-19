import { WebSocket, WebSocketServer } from "ws";
import { bad, error, good, info, log, usNow, usPretty, warn } from "./log"

let crypto: any;
try {
  crypto = require('node:crypto');
} catch (err) {
  error('crypto module not available')
  throw new Error('crypto support is disabled!');
}

export interface PingData {
  t: number,
  id: string,
  d: string
}

export function cryptoRandom(): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)
}

export function rndStr(count: number, randomFunc = cryptoRandom): string {
  const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let out = ''
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(randomFunc() * charSet.length)
    out += charSet[idx]
  }
  return out
}

export function makeId(num = 4, sections = 4, del = '-'): string {
  let str = rndStr(num)
  for (let i = 0; i < sections - 1; i++) {
    str += (del + rndStr(num))
  }
  return str
}

export function makePingData(): PingData {
  return {
    t: usNow(),
    id: makeId(),
    d: rndStr(1)
  }
}

export function rndStr_(): string {
  return (.123 + Math.random()).toString(36).slice(2, 7)
}

export class Pinger {

  private outstandingPings: PingData[] = []
  private pingSentCount = 0
  private accRttUs = 0
  private port = 8080

  averageRttUs(): number {
    if (this.pingSentCount < 1) {
      return -1
    }
    return this.accRttUs / this.pingSentCount
  }

  pingReq(): PingData {
    const pd = makePingData()
    this.pingSentCount++
    // const pingSize = JSON.stringify(pd).length
    // info(`ping size: ${pingSize}`)
    this.outstandingPings.push(pd)
    return pd
  }

  handlePingRes(res: PingData): void {
    const fidx = this.outstandingPings.findIndex((pd) => {
      return pd.id === res.id
    })
    if (fidx !== -1) {
      const req = this.outstandingPings.splice(fidx, 1)[0]
      if (req) {
        const resUs = usNow() - req.t
        this.accRttUs += resUs
        info(`[${this.outstandingPings.length}] RTT: ${usPretty(resUs)}, rtt-average: ${usPretty(this.averageRttUs())}, one-way: ${usPretty(resUs / 2)}, one-way-average: ${usPretty(this.averageRttUs() / 2)}`)
      }
    } else {
      const resUs = usNow() - res.t
      warn(`Ping response ${res.id} sent ${res.t} (${usPretty(resUs)} ago) could not be found`)
    }
  }

  ping(): void {
    const url = `ws://127.0.0.1:${this.port}`
    const ws = new WebSocket(url);

    ws.on('error', console.error);

    ws.on('open', function open() {
      info('ping connected');
    })

    ws.on('close', function close() {
      warn('ping disconnected');
    })

    ws.on('message', function message(data) {
      pinger.handlePingRes(JSON.parse(data.toString()))
    })

    const pinger: Pinger = this
    const delayMs = 250
    const maxPings = 5
    let pc = 0
    const ihandle = setInterval(() => {
      if (pc >= maxPings) {
        clearInterval(ihandle)
        const pr = makePingData()
        pr.d = "quit"
        info(`Ping end`)
        setTimeout(() => {
          ws.send(JSON.stringify(pr))
        }, 500)
      } else {
        const p = JSON.stringify(this.pingReq())
        info(`PING ${url} ${p}`)
        ws.send(p)
        pc++
      }
    }, delayMs)
  }

  bounceServer(): void {
    info(`Starting ping bounce server on port ${this.port}`)

    const wss = new WebSocketServer({
      port: this.port,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
      }
    });


    wss.on('connection', function connection(ws, req) {

      info(`Connection from ${req.socket.remoteAddress}`)

      ws.on('error', console.error)

      ws.on('message', function message(data) {

        // setTimeout(() => {
        ws.send(data)
        log(`ECHO size=${data.toString().length} ${data} to ${req.socket.remoteAddress}`)
        if ((<PingData>JSON.parse(data.toString())).d === "quit") {
          info(`Closing bounceServer`)
          ws.close()
          wss.close()
        }
        // }, 0)

      })

    })


  }

  test(): void {
    if (this.outstandingPings.length === 0) {
      good("ping array empty")
    } else {
      bad("ping array not empty")
      console.log(this.outstandingPings)
    }

    const pcount = 10
    const sent = [this.pingReq()]
    for (let i = 0; i < pcount; i++) {
      sent.push(this.pingReq())
    }

    // sent.reverse()

    if (this.outstandingPings.length === sent.length) {
      good("ping array is of correct length")
    } else {
      bad("ping array not of correct length")
      console.log(this.outstandingPings)
    }

    sent.forEach((s) => {
      this.handlePingRes(s)
    })

    if (this.outstandingPings.length === 0) {
      good("ping array empty")
    } else {
      bad("ping array not empty")
      console.log(this.outstandingPings)
    }

    this.bounceServer()
    this.ping()

  }


}
