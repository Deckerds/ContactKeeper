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
    <div className='container'>
      <div>
        <div className='w-50 ml-auto mr-auto'>
          <ContactForm />
        </div>
        <div className='mt-5'>
          <hr />
          <h2 className='text-center mt-3'>
            Your <span className='text-primary'>Contacts</span>
          </h2>
          <div className='w-50'>
            <FilterContact />
          </div>
          <div>
            <Contacts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
