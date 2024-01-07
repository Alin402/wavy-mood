import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const LandingView = ({ isAudioPlay }) => {
    const user = useSelector((state) => state.user);
    if (user.isAuthenticated) {
        return <Navigate to="/main" replace />
    }
    return (
        <div className="landing">
            {
                isAudioPlay ?
                    <img src="img/catvibe.gif" className="casette-img" /> :
                    <img src="img/casette1.png" className="casette-img" />
            }
            <div className="middle-header">
            <img src="img/logov2.svg" className="logo-img" />
            <h2 className="middle-header-text" style={{ marginTop: "2rem" }}>
                a retro themed music <br />
                streaming service.
            </h2>
            <Link to="/signup" style={{ textDecoration: "none" }}>
                <button className="btn-action" style={{ marginTop: "4rem" }}>
                    Sign Up Now
                </button>
            </Link>
            </div>
        </div>
    );
}

export default LandingView;