import React from 'react';
import { Link } from 'react-router-dom';



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
        </>
    )
}

export default PrivateHome
