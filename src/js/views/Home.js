import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard";

export const Home = () => {
    const {store,actions} = useContext(Context)

    useEffect(()=> {
        actions.createAgenda()
    },[])
    return(
	<div className="d-flex flex-column bg-black text-dark mt-5 ">
        {store.contacts && store.contacts.length > 0 ? store.contacts.map(contact => {
            return (
              <ContactCard
              key={contact.id}
              name={contact.name}
              address={contact.address}
              phone={contact.phone}
              email={contact.email}
              id={contact.id}
              />
            )
        }) :
        <div className="d-flex justify-content-center text-light">
            <p>Empty contact list</p>
        </div>
        }

	</div>
    )


};

// get agenda . guardar con set store coctact
///CARD . map.  renderizar por elemento aqui
// state CArd

