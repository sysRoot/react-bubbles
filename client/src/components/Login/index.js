import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [loginObject, setLoginObject] = React.useState({
        username: '',
        password: '',
    });

    const history = useHistory();

    const handleTextChange = (e) => {
        e.persist();
        setLoginObject((state) => {
            return { ...state, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('sanity check');
        console.log(loginObject);
        axios
            .post('http://localhost:5000/api/login', loginObject)
            .then((res) => {
                localStorage.setItem('token', JSON.stringify(res.data.payload));
                history.push('/bubbles');
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='username'
                    autoComplete='on'
                    value={loginObject.username}
                    name='username'
                    onChange={(e) => handleTextChange(e)}
                />
                <input
                    type='password'
                    placeholder='password'
                    autoComplete='off'
                    value={loginObject.password}
                    name='password'
                    onChange={(e) => handleTextChange(e)}
                />
                <input type='button' value='Login' onClick={handleSubmit} />
            </form>
        </div>
    );
};

export default Login;
