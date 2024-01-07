import SignUpForm from "./SignUpForm";
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const SignUpView = ({ isAudioPlay }) => {
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
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUpView;