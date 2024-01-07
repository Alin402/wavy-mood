import React from "react";
import "./Navigation.css";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/user";
import ProfileDropDown from "./ProfileNav";
import navlogo from "./logov2_white.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Navigation = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <nav className="navigation">
            {
                user.isAuthenticated ? (
                    <>
                        <NavLink to="/main">
                            <img src={navlogo} className="logo-img-nav" />
                        </NavLink>
                        <div className="nav-auth">
                            <NavLink to="/main" className="nav-item">
                                Home
                            </NavLink>
                            <NavLink className="nav-item" onClick={() => { dispatch(logout(navigate)) }}>
                                Log Out
                            </NavLink>
                            <div>
                                <ProfileDropDown />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink to="/">
                            <img src="img/logov2_white.svg" className="logo-img-nav" />
                        </NavLink>
                        <div className="nav-auth">
                        <NavLink to="/signup" className="nav-item">
                            Sign Up
                        </NavLink>
                        <NavLink to="/login">
                            <button className="btn" style={{ marginLeft: "1rem" }}>
                                Log In
                            </button>
                        </NavLink>
                        </div>
                    </>
                )
            }
        </nav>
    )
}

export default Navigation;