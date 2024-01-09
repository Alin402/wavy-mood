import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import NormalProfile from "./normal-user/NormalProfile";
import ArtistProfile from "./artist/ArtistProfile";

const ProfileView = () => {
    const user = useSelector((state) => state.user.user.user);

    return (
        user && <div className="landing-profile">
            {
                user.isArtist ?
                <ArtistProfile user={user} /> :
                <NormalProfile user={user} />
            }
        </div>
    );
}

export default ProfileView;