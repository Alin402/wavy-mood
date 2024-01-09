import "./MainView.css";
import { useState, useEffect } from "react";
import Album from "../../album/album-list/Album";

const RecentlyViewed = () => {
    const [albumList] = useState(
        JSON.parse(localStorage.getItem("recentlyViewed"))
    );
    return (
        <div className="recently-viewed">
            <h2 className="signup-title">recently viewed</h2>
            <div className="album-list">
                {
                    albumList?.length === 0 ?
                    <p>No recently viewed albums...</p> :
                    albumList?.map((album, index) => {
                        return <Album key={index} album={album} />
                    })
                }
            </div>
        </div>
    )
}

export default RecentlyViewed;