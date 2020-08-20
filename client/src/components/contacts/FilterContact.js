import React, { useContext, useEffect, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

const FilterContact = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const { filterContact, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterContact(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input className="mt-3 w-100 mb-2" ref={text} placeholder="Filter Contacts..." onChange={onChange} />
        </form>
    )
}

export default FilterContact;