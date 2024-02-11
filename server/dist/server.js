"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importStar(require("ws"));
const wss = new ws_1.WebSocketServer({ port: 8080 });
let cnt = 1;
const arr = [];
wss.on("connection", function connection(ws, req) {
    ws.on("error", console.error);
    console.log("Connect : ", cnt++);
    arr.push(ws);
    ws.on("message", (data) => {
        const arrDub = arr.filter((x) => x !== ws);
        console.log(arr.length);
        arrDub.map((cli) => {
            if (cli !== ws)
                cli.send("Hello from one of the clients");
        });
    });
    ws.on("close", (code, reason) => {
        console.log(code, reason);
        arr.map((cli) => {
            if (cli.readyState === ws_1.default.OPEN)
                cli.send(`Reason : ${reason}`);
        });
    });
    // ws.on("message", function message(data, isBinary) {
    // 	wss.clients.forEach(function each(client) {
    // 		if (client.readyState === WebSocket.OPEN) {
    // 			client.send(data, { binary: isBinary });
    // 		}
    // 	});
    // });
});
