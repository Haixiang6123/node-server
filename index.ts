import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const server = http.createServer()
const publicDir = path.resolve(__dirname, 'public')

server.on('request', (request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8')

  const {method, url: urlPath, headers} = request
  // 使用 url.parse 解析
  const {pathname, search} = url.parse(urlPath)

  if (method !== 'GET') {
    response.statusCode = 200
    response.end('这是一个假响应')
    return
  }

  let filename = pathname.substr(1)
  if (filename === '') {
    filename = 'index.html'
  }

  fs.readFile(path.resolve(publicDir, filename), (error, data) => {
    if (error) {
      if (error.errno === -2) {
        response.statusCode = 404
        fs.readFile(path.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data)
        })
      } else if (error.errno === -21) {
        response.statusCode = 403
        response.end('无权查看目录内容')
      } else {
        response.statusCode = 500
        response.end('服务器繁忙')
      }
    } else {
      response.end(data)
    }
  })
})

server.listen(8888)
