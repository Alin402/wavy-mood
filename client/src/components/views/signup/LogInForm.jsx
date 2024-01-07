import { useState } from "react";
import { login } from "../../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { NavLink } from "react-router-dom";

const LogInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = () => {
        dispatch(login(formData.email, formData.password));
    }

    return (
        <div style={{ position: "relative" }}>
            <div className='signup'>
                <h2 className="signup-title">log in</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">email</label>
                    <input className="form-input" id="email" name="email" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">password</label>
                    <input className="form-input" id="password" name="password" type="password" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <button className="btn-submit" onClick={submit}>Log In</button>
                </div>
                <div className="form-group">
                    <h2>don't have an account? 
                    <br /> click <NavLink to="/signup">here</NavLink> to sign up</h2>
                </div>
            </div>
            <div className="signup-shadow-login"></div>
        </div>
    )
}

export default LogInForm;