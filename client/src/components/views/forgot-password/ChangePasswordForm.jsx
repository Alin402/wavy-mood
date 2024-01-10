import { useState } from "react";
import "./ForgotPassword.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";

const ChangePasswordForm = ({ email }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    }

    const submit = async () => {
        if (newPassword === confirmNewPassword) {
            try {
                const res = await api.post("/users/change-password", { email, newPassword })
                if (res.status === 200) {
                    if (res?.data?.msg === "success") {
                        dispatch(setAlert({ msg: "Password changed", type: 'success' }))
                        navigate("/login");
                        localStorage.removeItem("verificationEmail");
                    }
                }
            } catch (err) {
                const errors = err.response?.data.errors;
    
                if (errors) {
                    errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
                }
            }
        } else {
            dispatch(setAlert({ msg: "The passwords do not match", type: 'error' }))
        }
    }

    return (
        <div>
            <div className="form-group">
                <label className="form-label" htmlFor="password">new password</label>
                <input onChange={(e) => handlePasswordChange(e)} className="form-input" id="password" name="password" type="password"></input>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">confirm new password</label>
                <input onChange={(e) => handleConfirmPasswordChange(e)} className="form-input" id="confirmPassword" name="confirmPassword" type="password"></input>
            </div>
            <button className="btn-submit" onClick={submit}>change</button>
        </div>
    )
}

export default ChangePasswordForm;