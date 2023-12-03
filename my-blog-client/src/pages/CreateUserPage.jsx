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
        <>
            { error && <p>{error}</p> }
            <h2>Sign up</h2>

            <label htmlFor='email'>Email:</label>
            <input
                id='email'
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />

            <label htmlFor='password'>Password:</label>
            <input
                type='password' 
                id='password'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                id='confirmPassword'
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
            /> 

            <button onClick={createUser}>Create Account</button>

            <Link to='/signup'>Don't have an account? Sign up!</Link>
        </>
    );
};

export default CreateUserPage;