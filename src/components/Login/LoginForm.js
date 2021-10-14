import React, { useEffect } from 'react'
import Register from '../Images/register.png'
import LoginPng from '../Images/login.png'
const LoginForm = () => {

    let front, back;

    const LoginFunc = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        localStorage.ORIsLoggedIn = JSON.stringify(true);
        window.location.reload();
    }

    const RegistrationFunc = (e) => {

    }

    useEffect(async () => {
        front = await document.querySelector('.front');
        back = await document.querySelector('.back');
    }, []);


    return (
        <>
            <section id='login-container'>
                <div className="card">
                    <div className="face front">
                        <div className="left-face">
                            <p>New Here?</p>
                            <button type="button" onClick={() => {
                                front.style.transform = "rotateY(180deg)";
                                back.style.transform = "rotateY(360deg)";
                            }} className="btn login">Register</button>
                            <p>OR</p>
                            <p>Sign-In using Following Methods</p>
                            <div className="connect-icons">
                                <a href="#"><i className="fab fa-google"></i></a>
                                <a href="#"><i className="fab fa-facebook"></i></a>
                            </div>
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
                    <div className="face back">
                        <div className="left-face">
                            <p>Already Registered?</p>
                            <button type="button" onClick={() => {
                                back.style.transform = "rotateY(180deg)";
                                front.style.transform = "rotateY(0deg)";
                            }} className="btn signup">Login</button>
                            <p>OR</p>
                            <p>Sign-In using Following Methods</p>
                            <div className="connect-icons">
                                <a href="#"><i className="fab fa-google"></i></a>
                                <a href="#"><i className="fab fa-facebook"></i></a>
                            </div>
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
