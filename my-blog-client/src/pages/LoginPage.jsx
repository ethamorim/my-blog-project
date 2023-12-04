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
            if (!email || !password) {
                throw new Error('Invalid email or password');
            }

            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <main className="login-main">
            { error && <p id='error'>{error}</p> }
            <h2 className="login-title">Log in</h2>

            <input
                id='email'
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />

            <input
                type='password'
                placeholder="Password"
                id='password'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />

            <button id='login-button' onClick={logIn}>Log In</button>

            <Link to='/signup'>Don't have an account? Sign up!</Link>
        </main>
    );
}

export default LoginPage;