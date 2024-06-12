import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/home.css";

export const EditContact = () => {
	const params = useParams()
	const contactId = params.contactId
	const [contact, setContact] = useState(null);
	const { actions } = useContext(Context)
	const navigate = useNavigate()
	console.log(params);

	useEffect(() => {
		const fetchContactDetails = async () => {
			try {
				// Realizar una llamada al contexto para obtener los detalles del contacto de input para eidtar
				const contactDetails = await actions.getContact(contactId);
				// Establezco los detalles del contacto como estado inicial
				setContact(contactDetails);
			} catch (error) {
				console.log("Error fetching contact details:", error);
			}
		};
		// Llamo a la función para obtener los detalles del contacto
		fetchContactDetails();
	}, [contactId]);

	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value })
	}
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (contact) {
				const response = await actions.editContact(contactId, contact);
				alert("User edited succesfully", response)
				navigate("/")

			}

		} catch (error) {
			console.error(error);
		}
	};
	if (!contact) {
		return <div>Loading...</div>;
	}
	return (
		<div className="p-3 mt-5">
			<form>
				<fieldset className="text-light">
					<legend className="text-center " >Editing Contact</legend>
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




