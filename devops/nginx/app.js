// the code below is for the websocket server

import http from "http"
import websocket from "websocket"

const httpServer = http.createServer()
const wsServer = new websocket.server({httpServer})

const port = process.argv[2] || 9000
let connection = null

httpServer.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`)
})

wsServer.on("request", (request) => {
    connection = request.accept(null, request.origin)

    connection.on("message", (message) => {
        console.log(message.type, message.utf8Data)

        if (message.type === "utf8") {
            console.log(message.utf8Data)
        }

        connection.send(`I received your message on port ${port}`)
    })
})