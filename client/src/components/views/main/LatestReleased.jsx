import "./MainView.css";
import { useEffect, useState } from "react";
import Album from "../../album/album-list/Album";
import { api } from "../../../utils/api";

const LatestReleased = () => {
    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        const getAlbums = async () => {
            try {
                let res = await api.get(`/album/latest`)
                if (res.data?.albums) {
                    setAlbums(res.data.albums)
                }
            } catch (error) {
                console.log(error)
                return null;
            }
        }
        getAlbums();
    }, [])
    return albums && (
        <div className="recently-viewed">
            <h2 className="signup-title">latest releases</h2>
            <div className="album-list">
                {
                    albums.length !== 0 && albums?.map((album, index) => {
                        return <Album key={index} album={album} />
                    })
                }
            </div>
        </div>
    )
}

export default LatestReleased;