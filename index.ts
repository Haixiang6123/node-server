import * as http from 'http'

const server = http.createServer()

server.on('request', (request, response) => {
  console.log('request')
  response.end('hi')
})

server.listen(8888)
