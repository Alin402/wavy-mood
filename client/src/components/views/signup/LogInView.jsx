import LogInForm from "./LogInForm";
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const LogInView = ({ isAudioPlay }) => {
    const user = useSelector((state) => state.user);
    if (user.isAuthenticated) {
        return <Navigate to="/main" replace />
    }
    return (
        <div className="landing">
            <div>
                {
                    isAudioPlay ?
                        <img src="img/catvibe.gif" className="casette-img" /> :
                        <img src="img/casette1.png" className="casette-img" />
                }
            </div>
            <div>
                <LogInForm />
            </div>
        </div>
    )
}

export default LogInView;