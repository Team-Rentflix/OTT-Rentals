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
    return (
        <>
            <div className='row'>
                {PlatformList.map(val => <Link to={`/rent-now?ott=${val.ott}`} key={val.ott} className='col-md-4'>
                    <img className='img-fluid w-100 h-100 home-platform-img' alt={val.ott} src={val.icon} />
                </Link>)}
            </div>
        </>
    )
}

export default PrivateHome
