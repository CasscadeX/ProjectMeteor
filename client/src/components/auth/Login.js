import React , {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email , password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    const onSubmit = async e =>{
        e.preventDefault();
        console.log('Succes')
    };

    return (
        <Fragment>
            <h1 className="large text-primary text-center">Sign In</h1>
            <p className="lead text-center"><i className="fas fa-user"></i>Sign Into your Account</p>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input type="email"
                           placeholder="Email Address"
                           name="email"
                           value={email}
                           onChange={e=>onChange(e)}
                           required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e=>onChange(e)}
                        required
                    />
                </div>
                <div className="text-center">
                    <input type="submit" className="btn btn-primary" value="Login"/>
                </div>
            </form>
            <div className="text-center">
                <p className="my-1">
                    Create an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </Fragment>
    )
}

export default Login;