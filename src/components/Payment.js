import React from 'react'
import { BsBagCheckFill } from 'react-icons/bs'

const Payment = ({amount}) => {
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    const displayRazorpay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const options = {
            key : 'rzp_test_lCStAJm50TlXds',
            amount : amount * 100,
            theme: {
                color: "#5EA8DD",
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <button onClick={displayRazorpay} className='btn fs-5 px-0'><BsBagCheckFill /><span className='small px-1 fst-italic'>Buy Now</span></button>
    )
}

export default Payment