import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let cnt = 1;

const arr: WebSocket[] = [];

wss.on("connection", function connection(ws, req) {
	ws.on("error", console.error);
	console.log("Connect : ", cnt++);
	arr.push(ws);

	ws.on("message", (data) => {
		const arrDub = arr.filter((x) => x !== ws);
		console.log(arr.length);
		arrDub.map((cli) => {
			if (cli !== ws) cli.send("Hello from one of the clients");
		});
	});

	ws.on("close", (code, reason) => {
		console.log(code, reason);
		arr.map((cli: WebSocket) => {
			if (cli.readyState === WebSocket.OPEN)
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

import express from "express";
