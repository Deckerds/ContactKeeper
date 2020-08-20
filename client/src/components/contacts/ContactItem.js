import React, { useContext } from 'react';
import '../../../src/App.css';
import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { _id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className="card bg-light mt-2">
            <div className="card-body">
                <div className="h5 text-primary">{name} {' '}
                </div>
                <span className={(type === "professional"
                    ? "badge badge-success float-right h6"
                    : "badge badge-primary float-right h6")}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <ul className="list-unstyled pl-0 pt-1">
                    <li>
                        {email && (<i className="fas fa-envelope-open"> {email}</i>)
                        }
                    </li>
                    <li>
                        {phone && (<i className="fas fa-phone"> {phone}</i>)
                        }
                    </li>
                </ul>
                <p>
                    <button className="btn btn-dark btn-sm mr-1" onClick={() => setCurrent(contact)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
                </p>
            </div>
        </div >
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;