import { WebSocketServer, WebSocket } from 'ws';
import { server } from "../index";

const wss = new WebSocketServer({ server });

type gameType = {
    id: string,
    status: "waiting" | "in_progress" | "ended",
    users: user[],
    message: messages[],
    nightAction: nightAction[]
}

type nightAction = {
    type: "kill" | "find",
    senderId: string,
    targetId: string
}

type messages = {
    message: string,
    name: string
}

type user = {
    id: string,
    ws: WebSocket,
    name: string,
    role: "common" | "killer" | "detective",
    dead: boolean,

}

const games: gameType[] = []

type userData = {
    id: string,
    socket: WebSocket,
    name: string
}

const users = new Map<string, userData>()

wss.on('connection', (ws) => {

    ws.on('message', (data) => {
        let parsedData
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');

    });
});
