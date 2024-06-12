import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
	const [contact, setContact] = useState({
		"name": "",
		"phone": "",
		"email": "",
		"address": ""
	})
	const { actions } = useContext(Context)
	const navigate = useNavigate()
	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value })
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await actions.createContact(contact)
		if (response) {
			navigate("/")
		}
	}
	return (
		<div className="p-3 mt-5">
			<form>
				<fieldset className="text-light">
					<legend className="text-center" >Add a New Contact</legend>
					<div className="mb-3">
						<label htmlFor="TextInput" className="form-label">Full Name</label>
						<input
							name="name"
							onChange={handleChange}
							value={contact.name}
							type="text"
							id="TextInput"
							className="form-control"
							placeholder="Full Name" />
					</div>
					<div className="mb-3">
						<label htmlFor="TextInput" className="form-label">Email</label>
						<input
							name="email"
							onChange={handleChange}
							value={contact.email}
							type="text"
							id="TextInput"
							className="form-control"
							placeholder="Email" />
					</div>
					<div className="mb-3">
						<label htmlFor="TextInput" className="form-label">Phone</label>
						<input
							name="phone"
							onChange={handleChange}
							value={contact.phone}
							type="text"
							id="TextInput"
							className="form-control"
							placeholder="Phone" />
					</div>
					<div className="mb-3">
						<label htmlFor="TextInput" className="form-label">Address</label>
						<input
							name="address"
							onChange={handleChange}
							value={contact.address}
							type="text"
							id="TextInput"
							className="form-control"
							placeholder="Address" />
					</div>

					<button
						onClick={handleSubmit}
						className="btn btn-primary col-12"
					>Save</button>
					<Link className="btn btn-secondary mt-3" to="/Agenda">Or get back to contacts</Link>
				</fieldset>
			</form>
		</div>
	)
};




