import React from "react";
import { Pagination } from "react-bootstrap";


const ContactTable = ({ contacts, getName, getTypeOrg, getDate, getAddress, openModal, setIdC, deleteContact })=> {
    return (
        <div className="col-12 col-lg-10 offset-0 offset-lg-1 ">
            <div className="table-resposive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type of Contact</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Birthday/Foundation</th>
                            <th>Address</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {contacts.map((contact, i) => (
                            <tr key={contact.ID_Contact}>
                                <td>{i + 1}</td>
                                <td>{contact.Name + ' ' + getName(contact.ID_Contact)}</td>
                                <td>{getTypeOrg(contact.ID_Contact) + ' ' + contact.ContactType}</td>
                                <td>{contact.Phone}</td>
                                <td>{contact.Email}</td>
                                <td>{getDate(contact.ID_Contact, contact.ID_Type)}</td>
                                <td>{getAddress(contact.ID_Contact, contact.ID_Type)}</td>
                                <td>{contact.Comment}</td>
                                <td>
                                    <button onClick={() => openModal(2, contact.Name, contact.Phone, contact.Email, contact.Comment, contact.ID_Type, getName(contact.ID_Contact), getDate(contact.ID_Contact, contact.ID_Type), getTypeOrg(contact.ID_Contact), getAddress(contact.ID_Contact, contact.ID_Type), getDate(contact.ID_Contact, contact.ID_Type), contact.ID_Contact)}
                                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalContacts'>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button onClick={() => { setIdC(contact.ID_Contact); deleteContact(contact.ID_Contact, contact.Name); console.log("ID CONTACTO A ELIMINAR: ", contact.ID_Contact) }} className='btn btn-danger'>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

        </div>

    );


};
export default ContactTable;