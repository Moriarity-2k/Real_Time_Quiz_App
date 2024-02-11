function App() {
	const socket = new WebSocket("ws://localhost:8080");
	socket.addEventListener("open", (event) => {
		console.log(event);
	});

	// Listen for messages
	socket.addEventListener("message", (event) => {
		console.log("Message from server ", event.data);
	});

	return (
		<>
			<button
				onClick={() => {
					socket.send("Hello from the client");
				}}
			>
				click me
			</button>
		</>
	);
}

export default App;
