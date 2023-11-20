import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <>
            { error && <p>{error}</p> }
            <h2>Log in</h2>

            <label htmlFor='email'>Email:</label>
            <input
                id='email'
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />

            <label htmlFor='password'>Password:</label>
            <input 
                id='password'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />

            <button onClick={logIn}>Log In</button>

            <Link to='/signup'>Don't have an account? Sign up!</Link>
        </>
    );
}

export default LoginPage;