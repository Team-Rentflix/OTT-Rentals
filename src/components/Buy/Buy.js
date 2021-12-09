import React, { useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import VideoGamesSvg from '../Images/VideoGames.svg'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router'

const Buy = () => {

    const platformList = ['Netflix', 'Amazon Prime', 'Hotstar']
    const AmountRef = useRef();
    const OTTRef = useRef();

    const search = useLocation().search;
    let ott = new URLSearchParams(search).get('ott');

    const UpdateAmount = (e) => {
        AmountRef.current.value = parseInt(e) * 15;
    }

    useEffect(() => {
        const UpdateChanges = () => {
            OTTRef.current.value = ott ? ott : null;
        }
        UpdateChanges();
    }, [])

    const BuyFunc = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
    }

    return (
        <>
            <Helmet>
                <title>Rent Now</title>
            </Helmet>
            <div className='row'>
                <div className='col-md-6 pe-md-4 p-4'>
                    <Form onSubmit={(e) => { BuyFunc(e) }}>
                        <div className='row py-3'>
                            <div className='col-md-4 m-0 p-2'>
                                <div className="form-floating">
                                    <select name="platform" ref={OTTRef} className="form-select">
                                        {platformList.map((val, index) => <option value={val.replace(/ /g, "")} key={val + index}>{val}</option>)}
                                    </select>
                                    <label>OTT Platform</label>
                                </div>
                            </div>
                            <div className="col-md-8 m-0 p-2">
                                <div className='form-floating'>
                                    <select className="form-select" id='subscription-type' name="subscription-type">
                                        <option value="booknow">Book Now</option>
                                        <option value="prebook">Pre-Book</option>
                                    </select>
                                    <label>Subsciption Type</label>
                                </div>
                            </div>
                            <div className="col-md-4 m-0 p-1">
                                <div className="row mx-auto">
                                    <div className="col m-0 p-1">
                                        <div className="form-floating">
                                            <input onChange={e => UpdateAmount(e.target.value)} name="time" id='time_period' type="number" min="0" className="form-control" placeholder="Time Period" />
                                            <label>Time Period</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 m-0 p-1">
                                <div className="row mx-auto">
                                    <div className="col m-0 p-1">
                                        <div className='form-floating'>
                                            <input type='date' className='form-control' />
                                            <label>Starting Date</label>
                                        </div>
                                    </div>

                                    <div className="col m-0 p-1">
                                        <div className="form-floating">
                                            <input ref={AmountRef} name="amount" type="number" min="0" className="form-control" placeholder="amount" />
                                            <label>Amount</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 m-0 p-2">
                                <span className="d-block" id="result-box">
                                </span>
                                <button type="submit" className="btn btn-lg btn-danger text-light shadow-lg px-0 w-100 rounded-3 fw-bold">RENT NOW</button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='col-md-6'>
                    <img alt='' src={VideoGamesSvg} className='img-fluid' />
                </div>
            </div>
        </>
    )
}

export default Buy
