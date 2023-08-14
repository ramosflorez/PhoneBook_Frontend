import React, { useEffect, useState } from "react";
import axios from "axios";
import { show_alert } from "../functions";
import ContactModal from './ContactModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import ContactTable from "./ContactTable";

const Contacts = () => {
    const url = "http://127.0.0.1:8000";
    const [contacts, setContacts] = useState([]);
    const [persons, setPersons] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [filter, setFilter] = useState(0);
    const [publicOrg, setPublicOrg] = useState([]);
    const [privateOrg, setPrivateOrg] = useState([]);
    //Contacts variables
    const [idC, setIdC] = useState("");
    const [nameC, setNameC] = useState("");
    const [phoneC, setPhoneC] = useState(0);
    const [emailC, setEmailC] = useState("");
    const [comment, setComment] = useState("");
    const [idtype, setIdtype] = useState(0);
    // Persons Variables
    const [lastname, setLastname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    //Organizations Variables
    const [organizationType, setOrganizationType] = useState("");
    const [address, setAddress] = useState("");
    const [foundationdate, setFoundationDate] = useState("");

    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState("");
    const [disabled, setdisabled] = useState(false);


    useEffect(() => {
        getContacts();
        getPersons();
        getOrganizations();
        getPublicOrg();
        getPrivateOrg();
    }, []);

    const getContacts = async () => {
        const response = await axios.get(`${url}/contacts`);
        setContacts(response.data);
    };
    const getPersons = async () => {
        const response = await axios.get(`${url}/person`);
        setPersons(response.data);
    };

    const getOrganizations = async () => {
        const response = await axios.get(`${url}/Organizations`);
        setOrganizations(response.data);
    };

    const getPublicOrg = () => {
        const filterOrganization = contacts.filter(contact => {
            if ((contact.ContactType).toString() === 'Organization') {
                const organization = organizations.find(org => org.ID_Contact === contact.ID_Contact);
                return (organization && organization.OrganizationType).toString() === 'Public';
            }
            return false
        });

        setPublicOrg(filterOrganization);
    };
    const getPrivateOrg = () => {
        const filterOrganization = contacts.filter(contact => {
            if ((contact.ContactType).toString() === 'Organization') {
                const organization = organizations.find(org => org.ID_Contact === contact.ID_Contact);
                return (organization && organization.OrganizationType).toString() === 'Private';
            }
            return false;
        });
        setPrivateOrg(filterOrganization);
    };


    const getDate = (idContact, idType) => {
        if (idType === 1) {
            const person = persons.find((person) => person.ID_Contact === idContact);
            return person ? person.BirthDate : '';
        }
        if (idType === 2) {

            const org = organizations.find((org) => org.ID_Contact === idContact);
            return org ? org.FoundationDate : '';
        }
        return '';
    };


    const getAddress = (idContact, idType) => {
        if (idType === 1) return 'NONE'
        else if (idType === 2) {
            const org = organizations.find((org) => org.ID_Contact === idContact);
            return org ? org.Address : '';
        }
    };
    const getName = (idContact) => {
        const person = persons.find((person) => person.ID_Contact === idContact);
        return person ? person.Lastname : '';

    };
    const getTypeOrg = (idContact) => {
        const org = organizations.find((org) => org.ID_Contact === idContact);
        return org ? org.OrganizationType : '';

    };

    const openModal = (op, nameC, phoneC, emailC, comment, idType, lastname, birthdate, organizationType, address, foundationdate, idC) => {
        setNameC('');
        setPhoneC(0);
        setEmailC('');
        setComment('');
        setIdtype(0);
        setLastname('');
        setBirthdate('');
        setOrganizationType('');
        setAddress('');
        setFoundationDate('');
        setIdC('');
        setOperation(op);
        if (op === 1) {

            setTitle('ADD NEW CONTACT');
            setdisabled(false);
        }
        else if (op === 2) {
            setTitle('UPDATE CONTACT');
            setIdC(idC);
            setdisabled(true);
            setIdtype(idType);
            setNameC(nameC);
            setPhoneC(phoneC);
            setEmailC(emailC);
            setComment(comment);
            if (idType === 1) {
                setLastname(lastname);
                setBirthdate(birthdate);
            } else if (idType === 2) {
                setFoundationDate(foundationdate);
                setOrganizationType(organizationType);
                setAddress(address);
            }
        }
    };

    const validateInputs = () => {
        let data;
        let method;
        const validFormat = /^\d{4}-\d{2}-\d{2}$/;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (parseInt(idtype) === 0) {
            show_alert('Complete all fields', 'warning');
            return false
        } else if (parseInt(idtype) === 1) {
            if (nameC.trim() === '' || parseInt(idtype) === 0 || phoneC === 0 || emailC.trim() === '' || comment.trim() === '' || lastname.trim() === '' || birthdate.trim() === '') {
                show_alert('Complete all fields', 'warning');
                return false
            } else if ((!validFormat.test(birthdate) || !emailPattern.test(emailC)) && (emailC.trim() !== '' || birthdate.trim() !== '')) {
                show_alert('The email or date format is incorrect', 'warning');
                return false
            }
            else {                
                if (operation === 1) {
                    data = { contact: { Name: nameC.trim(), Phone: parseInt(phoneC), Email: emailC.trim(), ID_Type: parseInt(idtype), Comment: comment }, person: { Lastname: lastname.trim(), BirthDate: birthdate.trim() } };
                    method = 'POST'
                }
                else {
                    data = { contact: { Name: nameC.trim(), Phone: parseInt(phoneC), Email: emailC.trim(), ID_Type: parseInt(idtype), ID_Contact: parseInt(idC), Comment: comment }, person: { Lastname: lastname.trim(), BirthDate: birthdate.trim(), ID_Contact: parseInt(idC) } };
                    method = 'PUT'
                }
                sendRequest(method, data);
                return true
            }

        } else if (parseInt(idtype) === 2) {
            if (nameC.trim() === '' || parseInt(idtype) === 0 || phoneC === 0 || emailC.trim() === '' || comment.trim() === '' || foundationdate.trim() === '' || organizationType.trim() === '' || !validFormat.test(foundationdate) || address.trim() === '') {
                show_alert('Complete all fields', 'warning');
                return false
            } else if ((!validFormat.test(foundationdate) || !emailPattern.test(emailC)) && (emailC.trim() !== '' || foundationdate.trim() !== '')) {
                show_alert('The email or date format is incorrect', 'warning');
                return false
            }
            else {
                if (operation === 1) {
                    data = { contact: { Name: nameC.trim(), Phone: parseInt(phoneC), Email: emailC.trim(), ID_Type: parseInt(idtype), Comment: comment }, organization: { OrganizationType: organizationType.trim(), Address: address.trim(), FoundationDate: foundationdate.trim() } };
                    method = 'POST'
                }
                else {
                    data = { contact: { Name: nameC.trim(), Phone: parseInt(phoneC), Email: emailC.trim(), ID_Type: parseInt(idtype), ID_Contact: parseInt(idC), Comment: comment }, organization: { OrganizationType: organizationType.trim(), Address: address.trim(), FoundationDate: foundationdate.trim(), ID_Contact: parseInt(idC) } };
                    method = 'PUT'
                }
                sendRequest(method, data);
                return true

            }
        }
    };
    const deleteContact = (id, name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Are you sure you want to remove the ' + name + ' contact?',
            icon: 'question', text: 'Cannot be reversed',
            showCancelButton: true, confirmButtonText: 'Yes, delete', cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                setIdC(id);
                sendRequest('DELETE', { ID_Contact: id });
            } else {
                show_alert('The product was NOT eliminated', 'info')
            }
        })
    };



    const sendRequest = async (method, data) => {

        await axios({ method: method, url: url + '/contacts', data: data }).then(function (response) {
            var type = response.data['type'];
            var msg = response.data['message'];
            show_alert(msg, type);
            if (type === 'success') {
                getContacts();
                getPersons();
                getOrganizations();
                getPublicOrg();
                getPrivateOrg();
            }
        })
            .catch(function (error) {
                show_alert('Error in the request', 'error');
                console.log(error);
            })
    }




    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-6 d-flex justify-content-end">
                        <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalContacts'>
                            <i className='fa-solid fa-circle-plus'></i> Add New Contact
                        </button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-start ">
                        <div className="input-group"  style={{ width: '60%' }}>
                            <label className="input-group-text" htmlFor="inputFilter">Filters</label>
                            <select className="form-select" id="inputFilter" value={filter}
                                onChange={(e) => {
                                    {setFilter(e.target.value);getPublicOrg();getPrivateOrg();};
                                }} style={{ width: '30%' }}>
                                <option value={0}>Contacts</option>
                                <option value={1}>Persons</option>
                                <option value={2}>Organizations</option>
                                <option value={3}>Public Organizations</option>
                                <option value={4}>Private Organizations</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div className="row mt-3">
                    {parseInt(filter) === 0 && (
                        <ContactTable
                            contacts={contacts}
                            getName={getName}
                            getTypeOrg={getTypeOrg}
                            getDate={getDate}
                            getAddress={getAddress}
                            openModal={openModal}
                            setIdC={setIdC}
                            deleteContact={deleteContact}

                        />)}
                    {parseInt(filter) === 1 && (
                        <ContactTable
                            contacts={contacts.filter(contact => contact.ContactType === 'Person')}
                            getName={getName}
                            getTypeOrg={getTypeOrg}
                            getDate={getDate}
                            getAddress={getAddress}
                            openModal={openModal}
                            setIdC={setIdC}
                            deleteContact={deleteContact}

                        />)}
                    {parseInt(filter) === 2 && (
                        <ContactTable
                            contacts={contacts.filter(contact => contact.ContactType === 'Organization')}
                            getName={getName}
                            getTypeOrg={getTypeOrg}
                            getDate={getDate}
                            getAddress={getAddress}
                            openModal={openModal}
                            setIdC={setIdC}
                            deleteContact={deleteContact}

                        />)}

                    {parseInt(filter) === 3 && (
                        <ContactTable
                            contacts={publicOrg}
                            getName={getName}
                            getTypeOrg={getTypeOrg}
                            getDate={getDate}
                            getAddress={getAddress}
                            openModal={openModal}
                            setIdC={setIdC}
                            deleteContact={deleteContact}

                        />)}

                    {parseInt(filter) === 4 && (
                        <ContactTable
                            contacts={privateOrg}
                            getName={getName}
                            getTypeOrg={getTypeOrg}
                            getDate={getDate}
                            getAddress={getAddress}
                            openModal={openModal}
                            setIdC={setIdC}
                            deleteContact={deleteContact}

                        />)}

                </div>

            </div>
            <ContactModal
                id='modalContacts'
                validateInputs={validateInputs}
                disabled={disabled}
                nameC={nameC}
                setNameC={setNameC}
                phoneC={phoneC}
                setPhoneC={setPhoneC}
                emailC={emailC}
                setEmailC={setEmailC}
                comment={comment}
                setComment={setComment}
                idtype={idtype}
                setIdtype={setIdtype}
                lastname={lastname}
                setLastname={setLastname}
                birthdate={birthdate}
                setBirthdate={setBirthdate}
                organizationType={organizationType}
                setOrganizationType={setOrganizationType}
                address={address}
                setAddress={setAddress}
                foundationdate={foundationdate}
                setFoundationDate={setFoundationDate}
                title={title}
                setTitle={setTitle}

            />


        </div >
    );
};

export default Contacts;
