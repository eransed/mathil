import * as express from "express"
import * as path from "path"

const app = express()
const port = 80

app.use(express.static(path.join(__dirname, '../dist_test/tests')))
app.use(express.static(path.join(__dirname, '../public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
