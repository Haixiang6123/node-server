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
  switch (pathname) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html; charset=utf-8')
      fs.readFile(path.resolve(publicDir, 'index.html'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
    case '/style.css':
      response.setHeader('Content-Type', 'text/css; charset=utf-8')
      fs.readFile(path.resolve(publicDir, 'style.css'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
      fs.readFile(path.resolve(publicDir, 'main.js'), (error, data) => {
        if (error) throw error
        response.end(data.toString())
      })
      break
    default:
      response.statusCode = 404
      response.end()
  }
})

server.listen(8888)
