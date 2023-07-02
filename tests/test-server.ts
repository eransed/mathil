import * as express from "express"

const app = express()
const port = 3000

app.use(express.static('../../dist_test_web/tests'))
app.use(express.static('../../dist_test_web/src'))
app.use(express.static('../../public'))

app.listen(port, () => {
  console.log(`Port ${port}`)
})
