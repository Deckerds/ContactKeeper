import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contact';
import ContactForm from '../contacts/ContactForm';
import FilterContact from '../contacts/FilterContact';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container d-flex justify-content-center">
            <div className="row w-75">
                <div className="col">
                    <ContactForm />
                </div>
                <div className="col">
                    <FilterContact />
                    <Contacts />
                </div>
            </div>
        </div>
    )
}

export default Home;