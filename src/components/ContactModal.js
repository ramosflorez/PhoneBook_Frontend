import React from 'react';



const ContactModal= ({
    id,
    validateInputs,
    closeModal,
    disabled,
    nameC,
    setNameC,
    phoneC, 
    setPhoneC,
    emailC, 
    setEmailC,
    comment, 
    setComment,
    idtype, 
    setIdtype,
    lastname, 
    setLastname,
    birthdate, 
    setBirthdate,
    organizationType, 
    setOrganizationType,
    address, 
    setAddress,
    foundationdate, 
    setFoundationDate,
    title
})=>{
    

    return(
        <div
                id={id}
                className="modal fade"
                data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{title}</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
                                    <select className="form-select" id="inputGroupSelect01" value={idtype}
                                        onChange={(e) => {
                                            setIdtype(e.target.value);
                                        }} disabled={disabled}>
                                        <option value={0}>Choose...</option>
                                        <option value={1}>Person</option>
                                        <option value={2}>Organization</option>

                                    </select>
                                </div>

                                {idtype == 1 && (


                                    <div >
                                        <div className="input-group">
                                            <span className="input-group-text"><i className='fa-solid fa-user'></i> </span>
                                            <input type='text' id='name' className='form-control' placeholder='Name' value={nameC}
                                                onChange={(e) => setNameC(e.target.value)}></input>
                                            <input type='text' id='lastname' className='form-control' placeholder='LastName' value={lastname}
                                                onChange={(e) => {setLastname(e.target.value); console.log("hola:",lastname)}}></input>
                                        </div>
                                        <div className='input-group mb-3' style={{ marginTop: '20px' }}>
                                            <span className='input-group-text'><i className='fa-solid fa-phone'></i></span>
                                            <input type='number' id='phone' className='form-control' placeholder='Phone number' value={phoneC}
                                                onChange={(e) => setPhoneC(e.target.value)}></input>
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'><i className='fa-solid fa-envelope'></i></span>
                                            <input pattern=".+@beststartupever\.com" type='email' id='email' className='form-control' placeholder='Email' value={emailC}
                                                onChange={(e) => setEmailC(e.target.value)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'><i className='fa-solid fa-calendar-days'></i></span>
                                            <input type='text' id='birthdate' className='form-control' placeholder='2001-10-18' value={birthdate}
                                                onChange={(e) => setBirthdate(e.target.value)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                            <textarea id='comment' className='form-control' placeholder='Comments' value={comment}
                                                onChange={(e) => setComment(e.target.value)}></textarea>
                                        </div>


                                    </div>
                                )}

                                {idtype == 2 && (


                                    <div >
                                        <div className="input-group">
                                            <span className="input-group-text"><i className='fa-solid fa-building'></i> </span>
                                            <input type='text' id='name' className='form-control' placeholder='Organization Name' value={nameC}
                                                onChange={(e) => setNameC(e.target.value)}></input>
                                            <select className="form-select" id="inputGroupSelect02" value={organizationType}
                                                onChange={(e) => setOrganizationType(e.target.value)}>
                                                <option value=''>Choose...</option>
                                                <option value="Public">Public</option>
                                                <option value="Private">Private</option>
                                            </select>

                                        </div>
                                        <div className='input-group mb-3' style={{ marginTop: '20px' }}>
                                            <span className='input-group-text'><i className='fa-solid fa-phone'></i></span>
                                            <input type='number' id='phone' className='form-control' placeholder='Phone number' value={phoneC}
                                                onChange={(e) => setPhoneC(e.target.value)}></input>
                                        </div>

                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'><i className='fa-solid fa-envelope'></i></span>
                                            <input pattern=".+@beststartupever\.com" type='email' id='email' className='form-control' placeholder='Email' value={emailC}
                                                onChange={(e) => setEmailC(e.target.value)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'><i className='fa-solid fa-calendar-days'></i></span>
                                            <input type='text' id='foundationdate' className='form-control' placeholder='2001-10-18' value={foundationdate}
                                                onChange={(e) => setFoundationDate(e.target.value)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'><i className='fa-solid fa-street-view'></i></span>
                                            <input type='text' id='address' className='form-control' placeholder='Cra 15 #42b-09' value={address}
                                                onChange={(e) => setAddress(e.target.value)}></input>
                                        </div>
                                        <div className='input-group mb-3'>
                                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                            <textarea id='comment' className='form-control' placeholder='Comments' value={comment}
                                                onChange={(e) => setComment(e.target.value)}></textarea>
                                        </div>


                                    </div>
                                )}


                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button"  id='btnCerrar' className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={()=>{closeModal=validateInputs();if (closeModal) document.getElementById('btnCerrar').click();}} className="btn btn-primary">Save</button>
                        </div>

                    </div>
                </div>
            </div >
    )
};

export default ContactModal;
