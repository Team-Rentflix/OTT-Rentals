import React, { useRef } from 'react'
import SecureLogin from '../Images/SecureLogin.svg'
import TwoFactorAuthentication from '../Images/TwoFactorAuthentication.svg'
const LoginForm = () => {
    const front = useRef();
    const back = useRef();

    const LoginFunc = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        let username = fd.get('username');
        let password = fd.get('password')
        if (username === 'admin' && password === 'admin') {
            localStorage.ORIsLoggedIn = JSON.stringify(true);
        }
        window.location.reload();
    }

    const RegistrationFunc = (e) => {

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
                            <form id="login-form" action="">
                                <input type="text" className="input-field" placeholder="User ID" required />
                                <input type="email" className="input-field" placeholder="Email ID" required />
                                <input type="number" className="input-field" placeholder="Phone Number" required />
                                <input type="password" className="input-field" placeholder="Enter Password" required />
                                <input type="checkbox" name="reg-checkbox" id="reg-checkbox" className="check-box" required /><label
                                    for="reg-checkbox">I agree to terms and conditions</label>
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
