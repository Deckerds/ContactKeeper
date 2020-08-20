import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

export const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const { addContact, current, clearCurrent, updateCurrent } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        } else {
            updateCurrent(contact);
        }
        clearAll();
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <div className="text-center h4 text-primary mt-3 mb-3">{current ? 'Update Contact' : 'Add Contact'}</div>
                <div className="form-group">
                    <input className="w-100" type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input className="w-100" type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input className="w-100" type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
                </div>
                <h5>Contact Type</h5>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} />
                    <label className="form-check-label">Personal</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} />
                    <label className="form-check-label">Professional</label>
                </div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-theme white-txt btn-block mt-2" />
            </div>
            {current && (
                <div>
                    <input type="submit" value="Clear" className="btn btn-light btn-block mt-2" onClick={clearAll} />
                </div>
            )}

        </form>

    )
}

export default ContactForm;