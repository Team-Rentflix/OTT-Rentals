import React from 'react';

import AmazonPrimeICON from '../Images/AmazonPrimeICON.jpeg'
import HotstarICON from '../Images/HotstarICON.jpeg'
import NetflixICON from '../Images/NetflixICON.png'
import { Link } from 'react-router-dom';



const PlatformList = [
    {
        icon: AmazonPrimeICON,
        ott: 'AmazonPrime'
    },
    {
        icon: HotstarICON,
        ott: 'Hotstar'
    },
    {
        icon: NetflixICON,
        ott: 'Netflix'
    }
]


const PrivateHome = () => {
    const [time, setTime] = React.useState('');


    React.useEffect(() => {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            setTime('Morning')
        } else if (curHr < 18) {
            setTime('Afternoon')
        } else {
            setTime('Evening')
        }
    }, [])
    return (
        <>
            <h1 className='text-light mb-5'>Hi, {localStorage.username}! Good {time}.</h1>
            <div className='d-flex align-items-center justify-content-between'>
                {PlatformList.map(val => <Link to={`/rent-now?ott=${val.ott}`} key={val.ott} className=''>
                    <img className='img-fluid home-platform-img' alt={val.ott} src={val.icon} />
                </Link>)}
            </div>
        </>
    )
}

export default PrivateHome
