import { useState } from 'react';
import Cookies from 'js-cookie';
import './Login.css'

function Login(props) {

    const {setAuth} = props

    const [formView, setFormView] = useState(true)

    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput1, setPasswordInput1] = useState('');
    const [passwordInput2, setPasswordInput2] = useState('');

    const handleClick = () => {
        setFormView(false)
    }

    const handleErrors = (err) => {
        console.warn(err);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginInfo = {
            username: usernameInput,
            email: emailInput,
            password: passwordInput1,
        }
        const loginRequest = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify(loginInfo),
            }
    
            const response = await fetch(`/rest-auth/login/`, options).catch(handleErrors)
    
            if(!response.ok) {
            // throw new Error('Response was not ok!')
            setUsernameInput('');
            setEmailInput('');
            setPasswordInput1('');
            return alert('Username or password is incorrect!')
            }

            setAuth(true);
        }
        loginRequest();
        setUsernameInput('');
        setEmailInput('');
        setPasswordInput1('');
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const registerInfo = {
            username: usernameInput,
            email: emailInput,
            password1: passwordInput1,
            password2: passwordInput2,
        }

        if (passwordInput1 !== passwordInput2) {
            setPasswordInput1('')
            setPasswordInput2('')
            return alert('Passwords do not match')
        }

        const registerRequest = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify(registerInfo),
            }
    
            const response = await fetch(`/rest-auth/registraion/`, options).catch(handleErrors)
    
            if(!response.ok) {
            throw new Error('Response was not ok!')
            }
        }
        registerRequest()
        setUsernameInput('');
        setEmailInput('');
        setPasswordInput1('');
        setPasswordInput2('');
        setFormView(true);
    }

    const loginFormHTML = (
        <div className='login-form-container'>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type='text' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/>
                <label>Email</label>
                <input type='email' value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
                <label>Password</label>
                <input type='password' value={passwordInput1} onChange={(e) => setPasswordInput1(e.target.value)}/>
                <button type="submit">Login</button>
                <button type='button' onClick={handleClick}>Create Account</button>
            </form>
        </div>
    )

    const registrationFormHTML = (
        <div className='login-form-container'>
            <form className="register-form" onSubmit={handleRegisterSubmit}>
                <label>Username</label>
                <input type='text' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/>
                <label>Email</label>
                <input type='email' value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
                <label>Password</label>
                <input type='password' value={passwordInput1} onChange={(e) => setPasswordInput1(e.target.value)}/>
                <label>Repeat Password</label>
                <input type='password' value={passwordInput2} onChange={(e) => setPasswordInput2(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )

    return (
        <div className='login-view-container'>
            {formView ? loginFormHTML : registrationFormHTML}
        </div>
    )
}

export default Login