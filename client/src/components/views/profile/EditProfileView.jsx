import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import EditNormalProfile from "./normal-user/EditNormalProfile";
import EditArtistProfile from "./artist/EditArtistProfile";

const EditProfileView = () => {
    const user = useSelector((state) => state.user.user.user);

    return (
        user && <div className="landing-profile">
            {
                user.isArtist ?
                <EditArtistProfile user={user} /> :
                <EditNormalProfile user={user} />
            }
        </div>
    );
}

export default EditProfileView;