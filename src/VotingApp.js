import React from "react";
import App from "./App";
import { SocketProvider } from "./context/socketContext";

const VotingApp = () => {
	return (
		<SocketProvider>
			<App />
		</SocketProvider>
	);
};

export default VotingApp;
