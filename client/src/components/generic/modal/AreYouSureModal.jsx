import Modal from "./Modal";

const AreYouSureModal = ({ color, open, setOpen, message, action }) => {
    return (
        <Modal
            color={color}
            open={open}
            setOpen={setOpen}
        >
            <div>
                <h2>{message}</h2>
            </div>
            <div style={{ marginTop: "2rem", display: "flex" }}>
                <button className="btn-submit" onClick={action}>Yes</button>
                <button className="btn-submit" style={{ marginLeft: "1rem" }} onClick={() => setOpen(false)}>No</button>
            </div>
        </Modal>
    )
}

export default AreYouSureModal;