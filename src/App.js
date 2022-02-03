import React, { useContext } from "react";
import AddBand from "./components/AddBand";
import BandList from "./components/BandList";
import { SocketContext } from "./context/socketContext";

function App() {
	const { online } = useContext(SocketContext);

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
					<BandList />
				</div>
				<div className="col-4">
					<AddBand />
				</div>
			</div>
		</div>
	);
}

export default App;
