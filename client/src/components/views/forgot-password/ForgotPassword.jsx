import { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import ChangePasswordForm from "./ChangePasswordForm";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(localStorage.getItem("verificationEmail") || "");
    const [enterCodeState, setEnterCodeState] = useState(false);
    const [enterChangePasswordState, setEnterChangePasswordState] = useState(false);

    useEffect(() => {
        localStorage.removeItem("verificationEmail");
    }, [])

    const [code, setCode] = useState("");

    const user = useSelector((state) => state.user);
    if (user.isAuthenticated) {
        return <Navigate to="/main" replace />
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }

    const submit = async () => {
        try {
            const res = await api.post("/users/send-verification-code", { email })
            if (res.status === 200) {
                setEnterCodeState(true);
                localStorage.setItem("verificationEmail", email);
            }
        } catch (err) {
            const errors = err.response?.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
            }
        }
    }

    const submitCode = async () => {
        try {
            const res = await api.post("/users/verify-verification-code", { email, code })
            if (res.status === 200) {
                if (res?.data?.msg === "success") {
                    setEnterCodeState(false);
                    setEnterChangePasswordState(true);
                }
            }
        } catch (err) {
            setCode("");
            const errors = err.response?.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
            }
        }
    }

    return (
        <div className="landing">
            <div className="forgot-password retro-style">
                {
                    enterCodeState ? 
                    <>
                        <div className="form-group">
                            <label className="form-label" htmlFor="code">enter verification code</label>
                            <input style={{ width: "10rem" }} autoFocus value={code} className="form-input" id="code" name="code" onChange={(e) => handleCodeChange(e)}></input>
                        </div>
                        <div className="form-group">
                            <button className="btn-submit" onClick={submitCode}>verify</button>
                        </div>
                    </> :
                    <>
                        {
                            enterChangePasswordState ?
                            <ChangePasswordForm email={email} /> :
                            <>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">email to send verification code to</label>
                                    <input autoFocus className="form-input" id="email" name="email" onChange={(e) => handleEmailChange(e)}></input>
                                </div>
                                <div className="form-group">
                                    <button onClick={submit} className="btn-submit">send</button>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default ForgotPassword;