import { useState } from "react";
import { register } from "../../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import { REGISTER_FAIL } from "../../../actions/types";

const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        isArtist: false
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.type === "checkbox") {
            setFormData({ ...formData, isArtist: !formData.isArtist });
        }
    }

    const submit = () => {
        if (formData.password === formData.confirmPassword) {
            dispatch(register(formData, navigate));
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await api.post('/users/google', { code: credentialResponse.credential });
            if (res?.data?.cred) {
                setFormData({
                    ...formData,
                    email: res.data.cred.email,
                    name: res.data.cred.name
                })
            }
          } catch (err) {
            const errors = err.response.data.errors;
        
            if (errors) {
              errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
            }
        
            dispatch({
              type: REGISTER_FAIL
            });
          }
    }

    return (
        <div style={{ position: "relative" }}>
            <div className='signup'>
                <h2 className="signup-title">sign up</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">email</label>
                    <input value={formData.email} className="form-input" id="email" name="email" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">full name</label>
                    <input value={formData.name} className="form-input" id="name" name="name" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">password</label>
                    <input value={formData.password} className="form-input" id="password" name="password" type="password" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">confirm password</label>
                    <input value={formData.confirmPassword} className="form-input" id="confirmPassword" name="confirmPassword" type="password" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group-checkbox">
                    <div className="checkbox-wrapper-2">
                        <input value={formData.isArtist} className="sc-gJwTLC ikxBAC" id="isArtist" name="isArtist" type="checkbox" onChange={(e) => handleInputChange(e)} checked={formData.isArtist}></input>
                    </div>
                    <label className="form-label" htmlFor="isArtist" style={{ marginLeft: ".5rem" }}>Are you an arist?</label>
                </div>
                <div className="form-group" style={{ display: "flex" }}>
                    <button className="btn-submit" onClick={submit}>Sign Up</button>
                    <div style={{ marginTop: ".5rem" }}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => handleGoogleSuccess(credentialResponse )}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <h2>already have an account? 
                    <br /> click <NavLink to="/login">here</NavLink> to log in</h2>
                </div>
            </div>
            <div className="signup-shadow"></div>
        </div>
    )
}

export default SignUpForm;