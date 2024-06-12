import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-black p-4 mb-3">
			<Link to="/">
				<span className="navbar-brand text-light mb-0 h1">AGENDA</span>
			</Link>
			<div className="ml-auto">
				<Link className="btn btn-success" to="/add-contact">
					Add new contact
				</Link>
			</div>
		</nav>
	);
};
