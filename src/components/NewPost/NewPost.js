import React, { useRef, useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import VideoGamesSvg from '../Images/VideoGames.svg'
import { Helmet } from 'react-helmet'
import APICall from '../APICall'
import useUpdateEffect from '../../utils/useUpdateEffect'
const NewPost = () => {

    const platformList = ['Netflix', 'Amazon Prime', 'Hotstar']
    const AmountRef = useRef();
    const confirmPass = useRef()
    const [rate, setRate] = useState(0)
    const msg = useRef()
    const [account, setAccount] = useState(platformList[0])
    let msgtimeout;

    useEffect(() => {
        return () => {
            clearTimeout(msgtimeout)
        }
    })

    const NewPostFunc = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        if (fd.get('acc_pass') !== confirmPass.current.value) {
            msg.current.innerHTML = account + '\'s Password do not match.'
            return;
        }
        const data = await APICall('/api/post/create', 'POST', Object.fromEntries(fd))
        if (data.status) {
            msg.current.innerHTML = 'Post Added Successfully'
        } else {
            msg.current.innerHTML = data.error.message || data.error;
        }
        msgtimeout = setTimeout(() => msg.current.innerHTML = '', 3000);
        // try {
        //     const data = JSON.parse(localStorage.posts);
        //     localStorage.posts = JSON.stringify([...data, Object.fromEntries(fd)])
        // } catch (err) {
        //     console.log(err)
        //     localStorage.posts = JSON.stringify([Object.fromEntries(fd)])
        // }
        // window.alert('Post Added')
    }

    const UpdateAmount = (e) => {
        AmountRef.current.value = parseInt(e) * rate;
    }


    useUpdateEffect(() => UpdateAmount(document.getElementById('time_period').value), [rate])


    return (
        <>
            <Helmet>
                <title>New Post</title>
            </Helmet>
            <h1 className='text-light text-uppercase display-3 fw-bold head-underline position-relative'>create new post</h1>
            <div className='row'>
                <div className='col-md-6 pe-md-4 p-4'>
                    <Form onSubmit={(e) => { NewPostFunc(e) }}>
                        <div className='row py-3'>
                            <div className='col-md-4 m-0 p-2'>
                                <div className="form-floating">
                                    <select name="platform" className="form-select" onChange={e => setAccount(e.target.value)}>
                                        {platformList.map((val, index) => <option value={val.replace(/ /g, "")} key={val + index}>{val}</option>)}
                                    </select>
                                    <label>OTT Platform</label>
                                </div>
                            </div>
                            <div className="col-md-4 m-0 p-2">
                                <div className='form-floating'>
                                    <select className="form-select" id='subscription-type' name="subscription_type">
                                        <option value="booknow">Book Now</option>
                                        <option disabled={true} value="prebook">Pre-Book(Coming soon)</option>
                                    </select>
                                    <label>Subsciption Type</label>
                                </div>
                            </div>
                            <div className="col-md-4 m-0 p-2">
                                <div className='form-floating'>
                                    <input onChange={e => setRate(e.target.value)} type='number' name='rate' className='form-control' placeholder='Amount/Day' />
                                    <label>Amount/Day(in ₹)</label>
                                </div>
                            </div>
                            <div className="col-md-4 m-0 p-1">
                                <div className="row mx-auto">
                                    <div className="col m-0 p-1">
                                        <div className="form-floating">
                                            <input onChange={e => UpdateAmount(e.target.value)} name="time_period" id='time_period' type="number" min="1" max='15' className="form-control" placeholder="Time Period" />
                                            <label>Time Period(In Days)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 m-0 p-1">
                                <div className="row mx-auto">
                                    <div className="col m-0 p-1 pe-2">
                                        <div className='form-floating'>
                                            <input type='date' name='end_date' className='form-control' />
                                            <label>End Date</label>
                                        </div>
                                    </div>

                                    <div className="col m-0 p-1 ps-2">
                                        <div className="form-floating">
                                            <input ref={AmountRef} type="number" min="0" className="form-control" placeholder="Total Amount" />
                                            <label>Total Amount</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 p-2 m-0'>
                                <div className='form-floating'>
                                    <input type='password' name='acc_pass' className='form-control' />
                                    <label>{account} Password</label>
                                </div>
                            </div>
                            <div className='col-md-4 p-2 m-0'>
                                <div className='form-floating'>
                                    <input type='password' ref={confirmPass} className='form-control' />
                                    <label>Confirm Password</label>
                                </div>
                            </div>
                            <div className='col-md-4 p-2 m-0'>
                                <div className='form-floating'>
                                    <input type='text' name='secret_key' className='form-control' />
                                    <label>Custom Secret Key</label>
                                </div>
                            </div>
                            <div className="col-md-12 m-0 p-2">
                                <div className="form-floating">
                                    <textarea maxLength="1000" name="description" rows='4' className="form-control"></textarea>
                                    <label>Description</label>
                                </div>
                            </div>
                            <div className='text-light small fst-italic'>
                                <p className='mb-1'>* End Date - Your offer will expire on this date</p>
                                <p>* Total Amount - This amount can vary depending on which day your offer is claimed</p>
                            </div>
                            <div className="col-md-12 m-0 p-2">
                                <p ref={msg} className='text-danger text-capitalize'></p>
                                <button type="submit" className="btn btn-lg btn-v1 shadow-lg px-0 w-100 rounded-0 fw-bold">POST NOW</button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='col-md-6'>
                    <img alt='' src={VideoGamesSvg} className='img-fluid' />
                </div>
            </div >
        </>
    )
}

export default NewPost
