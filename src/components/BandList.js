import React, { useEffect, useState } from "react";

const BandList = ({ bandList, socket }) => {
	const [bands, setBands] = useState(bandList);

	const handleChange = (event, id) => {
		const newName = event.target.value;
		if (newName.length > 0) {
			setBands(
				bands.map((band) => {
					if (band.id === id) {
						band.name = newName;
					}
					return band;
				})
			);
		}
	};

	const handleOnBlur = (id, newName) => {
		if (newName.length > 0) {
			socket.emit("change-name", id, newName);
		}
	};

	const handleVote = (id) => {
		socket.emit("band-voted", id);
	};

	const handleRemove = (id) => {
		socket.emit("remove-band", id);
	};

	useEffect(() => {
		setBands(bandList);
	}, [bandList]);

	useEffect(() => {
		socket.on("band-list", (newBands) => {
			setBands(newBands);
		});
	}, [socket]);

	const bandRow = (band) => {
		return (
			<tr key={band.id}>
				<td>
					<button
						className="btn btn-primary"
						onClick={() => handleVote(band.id)}
					>
						Vote!
					</button>
				</td>
				<td>
					<input
						type="text"
						className="form-control"
						value={band.name}
						onChange={(event) => handleChange(event, band.id)}
						onBlur={() => handleOnBlur(band.id, band.name)}
					/>
				</td>
				<td>
					<h3>{band.votes}</h3>
				</td>
				<td>
					<button
						className="btn btn-danger"
						onClick={() => handleRemove(band.id)}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	};

	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th></th>
						<th>Band</th>
						<th>Votes</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{bandList.map((band) => bandRow(band))}</tbody>
			</table>
		</>
	);
};

export default BandList;
