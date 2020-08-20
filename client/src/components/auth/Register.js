import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'User Already Exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please Enter All Fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match!', 'danger')
        } else {
            register({
                name,
                email,
                password
            })
        }

    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center h-100">
                <div className="card p-2 pb-4">
                    <div className="card-header">
                        <h2 className="text-center">Account <span className="text-primary">Register</span></h2>
                    </div>
                    <form onSubmit={onSubmit} className="mt-2">
                        <div className="form-group w-100">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" type="text" name="name" value={name} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" value={email} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={onChange} />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="password2">Confirm Password</label>
                            <input className="form-control" type="password" name="password2" value={password2} onChange={onChange} />
                        </div>
                        <input type="submit" value="Register" className="btn btn-theme white-txt btn-block" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;