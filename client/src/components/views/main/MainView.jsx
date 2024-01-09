import "./MainView.css";
import React, { useEffect } from "react";
import {useSelector} from "react-redux"
// import Search from "../../search/Search";
// import RecentlyViewed from "./RecentlyViewed";
// import FollowedArtists from "./FollowedArtists";
// import LatestReleased from "./LatestReleased";
// import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

const LandingView = () => {
    const user = useSelector((state) => state.user.user.user);

    return user && (
        <div className="landing-main">
            {/* <Search />
            <div style={{ marginTop: "2rem" }}>
                <LazyLoadComponent>
                    <RecentlyViewed />
                </LazyLoadComponent>
            </div>

            <div style={{ marginTop: "2rem" }}>
                <LazyLoadComponent>
                    {
                        !user.isArtist &&
                        <FollowedArtists />
                    }
                </LazyLoadComponent>
            </div>

            <div style={{ marginTop: "2rem" }}>
                <LazyLoadComponent>
                    <LatestReleased />
                </LazyLoadComponent>
            </div>

            <div style={{ height: "2rem" }}></div> */}
        </div>
    );
}

export default LandingView;