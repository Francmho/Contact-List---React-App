import React, {useContext} from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/cardContact.css";
import { Context } from "../store/appContext";

export const ContactCard = props => {
	const { actions } = useContext(Context)
	const navigate = useNavigate()
	const handlerDelete = async () => {
		try{
			let result = await actions.deleteContact(props.id)
			if (!result){
				alert("Did not delete soemthing went wrong")
			} else {
				alert("User deleted succesufully")
				navigate("/")
			}
		}catch(error){
			console.error(error);
		}
	}
	return (

			<div className="card col-11 mx-4">
						<div className="d-flex flex-row-reverse p-2"> 
							<Link to={`/edit-contact/${props.id}`}>
								<i className="fa-solid fa-pencil"></i></Link>
							<span className="me-4" >
								<i className="fa-solid fa-trash"
								onClick={handlerDelete}></i></span>
						</div>
					<div className="card-body">
							<h5 className="card-title card-header">
								{props.name}</h5>
							<p className="card-text mt-2">
								<span className="me-2"><i className="fa-solid fa-location-dot"></i></span>
								{props.address}</p>
							<p className="card-text">
								<span className="me-2" ><i className="fa-solid fa-phone"></i></span>
								{props.phone}</p>
							<p className="card-text">
								<span className="me-2" ><i className="fa-solid fa-envelope"></i></span>
								{props.email}</p>
					</div>
			</div>
	);
};

ContactCard.propTypes = {
	name: PropTypes.string,
	address: PropTypes.string,
	phone: PropTypes.string,
	email: PropTypes.string
};
