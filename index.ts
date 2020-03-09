import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const server = http.createServer()
const publicDir = path.resolve(__dirname, 'public')

server.on('request', (request, response) => {
  const {method, url: urlPath, headers} = request
  // 使用 url.parse 解析
  const {pathname, search} = url.parse(urlPath)
  const filename = pathname.substr(1)

  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  fs.readFile(path.resolve(publicDir, filename), (error, data) => {
    if (error) {
      response.statusCode = 404
      response.end('你要的文件不存在')
    }
    else {
      response.end(data.toString())
    }
  })
})

server.listen(8888)
