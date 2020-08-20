import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        error: null,
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //GET CONTACTS
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type:
                    GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }


    //ADD CONTACT
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type:
                    ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //UPDATE CONTACT
    const updateCurrent = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type:
                    UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //DELETE CONTACT
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type:
                    DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //CLEAR CONTACTS
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    }

    //SET CONTACT
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    //CLEAR CURRENT
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    //FILTER CONTACT
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    //CLEAR FILTER
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                clearContacts,
                setCurrent,
                clearCurrent,
                updateCurrent,
                filterContact,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactState;