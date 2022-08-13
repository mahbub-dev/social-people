import { Navigate } from "react-router-dom";
import "./home.scss";
import { BsFillTelephoneFill, BsPersonCircle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { Footer, Navbar } from "../index";
import { useAppContext } from "../../context";
import { AiFillEdit } from "react-icons/ai";
import Edit from "../Edit/Edit";
import { useState } from "react";
function Home() {
	const [isEdit, setIsEdit] = useState(false);
	const { loggedUserData } = useAppContext();
	const hadleEdit = (id) => {
		id === "edit" ? setIsEdit(true) : setIsEdit(false);
	};
	return (
		<>
			<>
				<Navbar />
				{!isEdit ? (
					<div className="home section">
						<div className="profile">
							<button onClick={() => hadleEdit("edit")}>
								<span>edit</span>
								<span>
									<AiFillEdit />
								</span>
							</button>
							<div className="img">
								<img
									src={loggedUserData.img}
									width={"100%"}
									height={"100%"}
									alt="profile"
								/>
							</div>
							<div className="details">
								<h3>{loggedUserData.name}</h3>
								<p>
									<span>
										<MdEmail />
									</span>
									<span>{loggedUserData.email}</span>
								</p>
								<p>
									<span>
										<BsFillTelephoneFill />
									</span>
									<span>{loggedUserData.phone}</span>
								</p>
								<p>
									<span>
										<FaAddressBook />
									</span>
									<span>{loggedUserData.address}</span>
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="edit">
						<Edit user={loggedUserData} setEdit={setIsEdit} />
					</div>
				)}

				<Footer />
			</>
		</>
	);
}

export default Home;
