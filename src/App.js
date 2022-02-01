import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import AddBand from "./components/AddBand";
import BandList from "./components/BandList";

const connectToSocketServer = () => {
	const socket = io.connect("http://localhost:8080", {
		transports: ["websocket"],
	});

	return socket;
};

function App() {
	const [socket] = useState(connectToSocketServer());
	const [online, setOnline] = useState(false);
	const [bandList, setBandList] = useState([]);

	useEffect(() => {
		socket.on("connect", () => {
			setOnline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket.on("band-list", (bands) => {
			setBandList(bands);
		});
	}, []);

	return (
		<div className="container">
			<div className="alert">
				<p className="fs-4 fw-bolder">
					Service status:
					{online ? (
						<span className="text-success"> Online</span>
					) : (
						<span className="text-danger"> Offline</span>
					)}
				</p>
			</div>

			<h1>Bands</h1>
			<hr />
			<div className="row">
				<div className="col-8">
					<BandList bandList={bandList} socket={socket} />
				</div>
				<div className="col-4">
					<AddBand socket={socket} />
				</div>
			</div>
		</div>
	);
}

export default App;
