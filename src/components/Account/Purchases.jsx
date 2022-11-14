import APICall from "../APICall"

const Purchases = ({ purchases }) => {
    const getPassword = async (_id, post_id) => {
        const password = await APICall(`/transaction/getPass/?_id=${_id}&post_id=${post_id}`, 'GET')
        if (password.status) {
            navigator.clipboard.writeText(password.password).then(() => window.alert('Password Copied to Clipboard')).catch(err => console.log(err))
        }
    }
    return (
        <div className="row col h-100">
            {purchases && purchases.map((purchase, idx) => <div className="col-md-6 p-2">
                <div className="text-light border rounded-2 bg-dark p-3" style={{
                    overflowWrap: 'break-word'
                }}>
                    <div className="row">
                        <div className="col-6 fw-bold">Sender ID</div>
                        <div className="col-6">{purchase.sender_id}</div>
                        <div className="col-6 fw-bold">Reciever ID</div>
                        <div className="col-6">{purchase.reciever_id}</div>
                    </div>
                    <div className="d-flex justify-content-center my-2">
                        <button className="btn-v1 btn shadow-lg" onClick={() => getPassword(purchase._id, purchase.post_id)}>Get Password</button>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Purchases