import React, { useEffect, useRef } from 'react'
import Register from '../Images/register.png'
import LoginPng from '../Images/login.png'
const LoginForm = () => {
    const front = useRef();
    const back = useRef();

    const LoginFunc = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        localStorage.ORIsLoggedIn = JSON.stringify(true);
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
                            <p>New Here?</p>
                            <button type="button" onClick={() => {
                                front.current.style.transform = "rotateY(180deg)";
                                back.current.style.transform = "rotateY(360deg)";
                            }} className="btn login">Register</button>
                        </div>
                        <div className="right-face">
                            <img src={LoginPng} style={{ width: '400px', margin: '5px' }} alt="Login" />
                            <form id="login-form" onSubmit={(e) => LoginFunc(e)}>
                                <input type="text" className="input-field" placeholder="User ID" required />
                                <input type="password" className="input-field" placeholder="Enter Password" required />
                                <input type="checkbox" id="login-checkbox" className="check-box" /><label
                                    for="login-checkbox">Remember Password</label>
                                <button type="submit" className="btn">Login</button>
                            </form>
                        </div>
                    </div>
                    <div ref={back} className="face back">
                        <div className="left-face">
                            <p>Already Registered?</p>
                            <button type="button" onClick={() => {
                                back.current.style.transform = "rotateY(180deg)";
                                front.current.style.transform = "rotateY(0deg)";
                            }} className="btn signup">Login</button>
                        </div>
                        <div className="right-face">
                            <img src={Register} style={{ width: '425px', margin: '5px' }} alt="Login" />
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
