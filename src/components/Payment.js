import React, { useContext } from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import { AuthContext } from './Auth'
import APICall from './APICall'

const Payment = ({ amount, user_id,post_id }) => {

    const { currentUser } = useContext(AuthContext)

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
            key: 'rzp_test_lCStAJm50TlXds',
            amount: amount * 100,
            theme: {
                color: '#C50707',
            },
            handler: async function (response) {
                // console.log(response);
                const data = await APICall('/transaction/transaction-success','POST',{
                    sender_id : localStorage.user_id,
                    reciever_id : user_id,
                    post_id: post_id,
                    razorpay_payment_id: response.razorpay_payment_id
                })
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <button disabled={!currentUser || user_id === localStorage.user_id} onClick={displayRazorpay} className='btn fs-5 px-0'><BsBagCheckFill className='text-light'/><span className='small px-1 fst-italic text-light'>Buy Now</span></button>
    )
}

export default Payment