import React, { useRef } from 'react'
import SecureLogin from '../Images/SecureLogin.svg'
import TwoFactorAuthentication from '../Images/TwoFactorAuthentication.svg'
import axios from 'axios'

const LoginForm = () => {
    const front = useRef();
    const back = useRef();
    const rePass = useRef();
    const messageBox = useRef();
    const LoginFunc = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        let username = fd.get('username');
        let password = fd.get('password');
        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(fd))
        })

    }

    const RegistrationFunc = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        let password = fd.get('password');
        if (password !== rePass.current.value) {
            messageBox.current.innerHTML = 'Password do not match'
            setTimeout(() => messageBox.current.innerHTML = '', 3000);
            return
        }
        fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(fd))
        })
    }


    return (
        <>
            <section id='login-container'>
                <div className="card">
                    <div ref={front} className="face front">
                        <div className="left-face">
                            <img alt='' src={SecureLogin} className='img-fluid' />
                            <p>New Here?</p>
                            <button type="button" onClick={() => {
                                front.current.style.transform = "rotateY(180deg)";
                                back.current.style.transform = "rotateY(360deg)";
                            }} className="btn login">Register</button>
                        </div>
                        <div className="right-face">
                            <p className='font-bebas display-3'>Login</p>
                            <form id="login-form" onSubmit={(e) => LoginFunc(e)}>
                                <input name='username' type="text" className="input-field" placeholder="User ID" required />
                                <input name='password' type="password" className="input-field" placeholder="Enter Password" required />
                                <input type="checkbox" id="login-checkbox" className="check-box" /><label
                                    for="login-checkbox">Remember Password</label>
                                <button type="submit" className="btn">Login</button>
                            </form>
                        </div>
                    </div>
                    <div ref={back} className="face back">
                        <div className="left-face">
                            <img alt='' src={TwoFactorAuthentication} className='img-fluid' />
                            <p>Already Registered?</p>
                            <button type="button" onClick={() => {
                                back.current.style.transform = "rotateY(180deg)";
                                front.current.style.transform = "rotateY(0deg)";
                            }} className="btn signup">Login</button>
                        </div>
                        <div className="right-face">
                            <p className='font-bebas display-3'>Register</p>
                            <form id="login-form" onSubmit={(e) => RegistrationFunc(e)}>
                                <input type="text" className="input-field" placeholder="User Name" name='username' required />
                                <input type="email" className="input-field" placeholder="Email" name='email' required />
                                <input type="tel" className="input-field" placeholder="Phone Number" pattern="[0-9]{10}" name='phonenumber' required />
                                <input type="password" className="input-field" placeholder="Enter Password" name='password' required />
                                <input type="password" className="input-field" placeholder="Enter Password Again" ref={rePass} required />
                                <input type="checkbox" name="reg-checkbox" id="reg-checkbox" className="check-box" required /><label
                                    for="reg-checkbox">I agree to terms and conditions</label>
                                <p ref={messageBox} className='text-danger'></p>
                                <button type="submit" className="btn">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginForm
