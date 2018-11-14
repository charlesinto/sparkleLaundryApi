import express from 'express';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import auth from './route/auth';
import getImage from './route/getImage';
import route from './route';
import getItems from './route/getItems';
require('dotenv').config();

const apiVersion = express.Router();
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/', route)
app.use('/api/v1/auth', auth)
app.use('/api/v1/getLuandryItems', getItems);
// app.use('/api/v1/fetch', getImage);


let port = process.env.PORT || 5000;
let server = http.createServer(app)
let io = socket().listen(server);
io.on('connection', (socket)=>{
    console.log(`user connected, id: ${socket.id}`);
   
})

server.listen(port,()=>{console.log(`server is listening on port ${port}`)});

export default server;