import "./MainView.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getNormalUserProfile
} from "../../../actions/profile";
import FollowedArtist from "./FollowedArtist";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const FollowedArtists = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user.user);
    const followedArtists = useSelector((state) => state.profile.profile.followedArtists)

    useEffect(() => {
        if (user.hasProfile) {
            dispatch(getNormalUserProfile((profile) => {}));
        }
    }, [])
    return followedArtists && user.hasProfile && (
        <div className="recently-viewed">
            <h2 className="signup-title">followed artists</h2>
            <div className="followed-artists-container">
                {
                    followedArtists.length !== 0 && followedArtists?.map((artistId, index) => {
                        return (
                            <LazyLoadComponent>
                                <FollowedArtist key={index} artistId={artistId} />
                            </LazyLoadComponent>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FollowedArtists;