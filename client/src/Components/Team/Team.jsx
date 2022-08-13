import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { BsFillTelephoneFill, BsPersonCircle } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Navbar, Footer } from "../index";
import { useAppContext } from "../../context";
import { BsThreeDots } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import "./team.scss";

const ViewPerson = ({ item }) => {
	const { name, img, phone, email, address } = item;
	return (
		<div className="view-person">
			<div className="view-img">
				<img src={img} alt="name" />
			</div>
			<h3>{name}</h3>
			<p>
				<span>
					<MdEmail />
				</span>
				<span>{email}</span>
			</p>
			<p>
				<span>
					<BsFillTelephoneFill />
				</span>
				<span>{phone}</span>
			</p>
			<p>
				<span>
					<FaAddressBook />
				</span>
				<span>{address}</span>
			</p>
		</div>
	);
};
const SinglePerson = ({ item }) => {
	const [style, setStyle] = useState("0");
	const handleUser = (id) => {
		id === "open" ? setStyle("1") : setStyle("0");
	};
	return (
		<div className="person">
			<div className="img">{<img src={item.img} alt="person" />}</div>
			<p>{item.name}</p>
			<div className="dot-btn">
				{style === "0" ? (
					<BsThreeDots onClick={() => handleUser("open")} />
				) : (
					<TiDelete onClick={() => handleUser("close")} />
				)}
			</div>
			<div className="view-item" style={{ opacity: style }}>
				<ViewPerson item={item} handleUser={handleUser} />
			</div>
		</div>
	);
};
function Team() {
	const { member, loggedUserData } = useAppContext();
	return (
		<>
			<>
				<Navbar />
				<div className="team">
					{member.map((item) => (
						<SinglePerson item={item} key={item._id} />
					))}
				</div>
				<Footer />
			</>
		</>
	);
}

export default Team;
