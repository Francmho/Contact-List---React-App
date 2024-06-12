const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "https://playground.4geeks.com/contact",
			agendaSlug: "FrancoMho",
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			//primero hacer un get y si existe no crear
			createAgenda: async () => {
				const store = getStore()
				try { 
					const checkResponse = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}`);
					const checkData = await checkResponse.json();

					if (checkResponse.ok){
						console.log("Agenda already exists", checkData);
					} else {
						const createResponse = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}`, {
							method: "POST"
					});
					const createData = await createResponse.json();

					if(!createResponse.ok){
						throw new Error("Create agenda error");
					}
					console.log("Agenda sucesfully created", createData);
				}
				
				} catch (error) {
					console.log(error);
				}
			},

			getContacts: async () => {
				const store = getStore()
				try { 
					const response = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts`);
					const data = await response.json()
					if(!response.ok){
						throw new Error("Can not get contact list")
					}
					setStore({contacts: data.contacts})
					return data.contacts
				} catch (error) {
					console.log(error);
				}
			},

			getContact: async (contactId) => {
				const actions = getActions()
					try {
						const contacts = await actions.getContacts()
						const contact = contacts.find((contact)=> contact.id == contactId)
						console.log(contacts[0], contactId);
						return contact
					} catch (error) {
						console.log("Error getting unique contact", error);
					}
				},
			

			createContact: async (contact) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts`, {
						method:"POST",
						body: JSON.stringify(contact),
						headers: {"Content-Type": "application/json"}
					})
					const data = await response.json()
					if(!response.ok){
						throw new Error("Create contact error")
					}
					setStore({contacts: [...store.contacts, data]})
					return true
				} catch (error) {
					console.log("Create contact error", error);
				}
			},

			editContact: async (contactId, updatedFields) => {
				const store = getStore()
				try {
					//Obtener el contacto actual antes de editarlo
					const response = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts`);
					const existingContact = await response.json();
					if (!response.ok) {
						throw new Error("Error obtainig contact to edit");
					}

					//Fusiono los campo actualizados con el contacto existente
					const editedContact = {...existingContact, ...updatedFields};

					//Envio solicitud de edicion al servidor
					const editResponse = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts/${contactId}`, {
						method:"PUT",
						headers: {
							"Content-Type": "application/json"
					},
					body: JSON.stringify(editedContact)
				});
					const data = await editResponse.json()
					if(!editResponse.ok){
						throw new Error("Error while editing contact");
					} 
					console.log("Contact succesfully edited", data);

				} catch (error) {
					console.log("Error while editing contact", error);
				}
			},

			deleteContact: async(contactId) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts/${contactId}`, {method:"DELETE"});
					if(!response.ok){
						throw new Error("Error while deleting contact");
					}
					console.log("Contact succesfully deleted");
					let filtered = store.contacts.filter((item)=>item.id != contactId)
					setStore({...store, contacts:filtered})
					return true
				} catch (error) {
					console.log("Error while deleting contact", error);
				}
			},

			
		}
	};
};

export default getState;


// state CArd
//create contact
//delete contact 
//modify contact