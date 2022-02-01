import React, { useState } from "react";

const AddBand = ({ socket }) => {
	const [bandName, setBandName] = useState("");

	const handleAddBand = (event) => {
		event.preventDefault();

		if (bandName.length > 0) {
			socket.emit("add-band", bandName);
			setBandName("");
		}
	};

	return (
		<>
			<h3>Add new band</h3>

			<form onSubmit={handleAddBand}>
				<input
					type="text"
					className="form-control"
					placeholder="Enter band name"
					value={bandName}
					onChange={(event) => setBandName(event.target.value)}
				/>

				<button type="submit" className="btn btn-primary mt-2">
					Add
				</button>
			</form>
		</>
	);
};

export default AddBand;
