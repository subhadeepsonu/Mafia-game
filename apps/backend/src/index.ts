import express from 'express';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
export const server = createServer(app);

app.use(cors());
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express + WebSocket!' });
});


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    import('./websockets/index');
});
