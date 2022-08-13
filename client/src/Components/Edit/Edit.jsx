import React, { useEffect, useState, useReducer } from "react";
import { useAppContext } from "../../context";
import { BsFillTelephoneFill, BsPersonCircle } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { initialState, reducer } from "../../reducer";
import { updateUser } from "../../server manger/user";
import Loading from "../Loading/Loading";
import { Input } from "../Signup/Signup";

import "./edit.scss";
function Edit({ setEdit }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loggedUserData } = useAppContext();
	const { name, email, phone, address, img } = loggedUserData;
	const [updateData, setUpdataData] = useState({
		name,
		email,
		phone,
		address,
		img,
	});
	const [preveiwSrc, setPreveiwSrc] = useState("");
	const handleImgChange = (e) => {
		const imgFile = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(imgFile);
		reader.onloadend = () => {
			setPreveiwSrc(reader.result);
		};
	};
	const handleChange = (e) => {
		const data = { ...updateData, [e.target.name]: e.target.value };
		setUpdataData(data);
	};
	console.log(updateData);
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: "loading" });
		updateUser(updateData, loggedUserData._id, (res) => {
			if (res.status === 200) {
				e.target.reset();
				window.location.reload();
				setEdit(false);
			} else if (res.status === 500 || !res.data) {
				alert("update failed");
			}
		});
	};
	useEffect(() => {
		setUpdataData({ ...updateData, img: preveiwSrc });
	}, [preveiwSrc]);
	return (
		<div className="edit-profile">
			<form method="post" onSubmit={handleSubmit}>
				<p>
					<img
						src={preveiwSrc ? preveiwSrc : img}
						width="100%"
						height={"100%"}
						alt=""
					/>
				</p>
				<input name="img" type="file" onChange={handleImgChange} />
				<Input
					icon={<BsPersonCircle />}
					type="text"
					handleChange={handleChange}
					name="name"
					value={updateData.name}
				/>
				<Input
					type="email"
					handleChange={handleChange}
					icon={<MdEmail />}
					name="email"
					value={updateData.email}
				/>
				<Input
					type="text"
					handleChange={handleChange}
					name="phone"
					icon={<BsFillTelephoneFill />}
					value={updateData.phone}
				/>
				<Input
					type="text"
					handleChange={handleChange}
					name="address"
					icon={<FaAddressBook />}
					value={updateData.address}
				/>
				{state.loading && <Loading />}
				<button type="submit">Update</button>
			</form>
		</div>
	);
}

export default Edit;
