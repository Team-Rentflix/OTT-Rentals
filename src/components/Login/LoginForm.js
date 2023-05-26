import React, { useContext, useRef } from 'react'
import SecureLogin from '../Images/SecureLogin.svg'
import TwoFactorAuthentication from '../Images/TwoFactorAuthentication.svg'
import APICall from '../APICall'
import { AuthContext } from '../Auth'

const LoginForm = () => {
    const front = useRef();
    const back = useRef();
    const rePass = useRef();
    const messageBox = useRef();
    const messageBox1 = useRef();
    const { setCurrentUser } = useContext(AuthContext)


    const LoginFunc = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);

        const data = await APICall('/api/login', 'POST', Object.fromEntries(fd));


        if (data.user && data.status) {
            console.log(data)
            localStorage.ORIsLoggedIn = true;
            localStorage.token = data.user;
            localStorage.username = data.username;
            localStorage.user_id = data.user_id
            setCurrentUser(true)
        }
        else {
            messageBox1.current.innerHTML = data.error;
            setTimeout(() => messageBox1.current.innerHTML = '', 3000);
        }

    }

    const RegistrationFunc = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        let password = fd.get('password');
        if (password !== rePass.current.value) {
            messageBox.current.innerHTML = 'Password do not match'
            setTimeout(() => messageBox.current.innerHTML = '', 3000);
            return
        }

        const data = await APICall('/api/register', 'POST', Object.fromEntries(fd));
        if (data.status) {
            back.current.style.transform = "rotateY(180deg)";
            front.current.style.transform = "rotateY(0deg)";
        }
        else {
            messageBox.current.innerHTML = `${JSON.stringify(data.error.keyValue)} already exist`
            setTimeout(() => messageBox.current.innerHTML = '', 3000);
        }
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
                                <p ref={messageBox1} className='text-danger'></p>
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
                                <input type="text" className="input-field" placeholder="User Name" name='name' required />
                                <input type="email" className="input-field" placeholder="Email" name='email' required />
                                <input type="tel" className="input-field" placeholder="Phone Number" pattern="[0-9]{10}" name='phoneNumber' required />
                                <input type="password" className="input-field" placeholder="Enter Password" name='password' required />
                                <input type="password" className="input-field" placeholder="Enter Password Again" ref={rePass} required />
                                <input type="checkbox" name="reg-checkbox" id="reg-checkbox" className="check-box" required /><label
                                    for="reg-checkbox">I agree to terms and conditions</label>
                                <p ref={messageBox} className='text-danger text-capitalize'></p>
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
