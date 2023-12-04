import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUserPage = () => {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState(''); 
    const [ error, setError ] = useState('');

    const createUser =  async() => {
        try {
            setError('');
            if (!email || !password || !confirmPassword) {
                throw new Error('Please, fill in the form');
            }
            if (password !== confirmPassword) {
                throw new Error('Password and Confirm Password do not match');
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <main className="signup-main">
            { error && <p id='error'>{error}</p> }
            <h2 className="signup-title">Sign up</h2>

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

            <input
                type="password"
                placeholder="Confirm Password"
                id='confirmPassword'
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
            /> 

            <button id='signup-button' onClick={createUser}>Create Account</button>

            <Link to='/signup'>Don't have an account? Sign up!</Link>
        </main>
    );
};

export default CreateUserPage;