import { log } from "../src/log";
import { gyrMap } from "../src/color";

export function runColorTests() {
    for (let i = 0; i < 11; i++) {
        const input = i/10
        log(`gyrMap(${input.toFixed(1)})=${gyrMap(input)}`)
    }
    for (let i = 0; i < 11; i++) {
        const input = i/10
        log(`gyrMap(${input.toFixed(1)}, 0.5)=${gyrMap(input, 0.5)}`)
    }
}
