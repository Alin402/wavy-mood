import { useEffect } from "react";
import Alert from "./Alert";
import "./Alert.css";
import { useSelector } from "react-redux";

const AlertList = () => {
    let alerts = useSelector(state => state.alert);
    return alerts?.length && (
        <div className="alert-list">
            {
            alerts.map((alert, index) => {
                return (
                    <Alert
                        ID={alert.ID}
                        key={index}
                        msg={alert.msg}
                        type={alert.type}
                    />
                )
            })
        }
        </div>
    )
}

export default AlertList;