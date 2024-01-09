import { useState, useEffect } from "react";
import "./App.css";
import Player from "./components/player/Player";
import LandingView from "./components/views/landing/LandingView";
import MainView from "./components/views/main/MainView";
import SignUpView from "./components/views/signup/SignUpView";
import AlbumView from "./components/views/album/AlbumView";
import LogInView from "./components/views/signup/LogInView"
import EditProfileView from "./components/views/profile/EditProfileView";
import Navigation from "./components/navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/ProtectedRoute";
import AlertList from "./components/alerts/AlertList";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/user";
import ProfileView from "./components/views/profile/ProfileView";
import { LOGOUT } from "./actions/types";
import setAuthToken from "./utils/setAuthToken";
import Create from "./components/generic/create/Create";
import { MdOutlineQueueMusic as PlaylistIcon } from "react-icons/md";
import { MdLibraryMusic as AlbumIcon } from "react-icons/md";
import { IoMusicalNotes as SongIcon } from "react-icons/io5";
import Modal from "./components/generic/modal/Modal";
import AddAlbumForm from "./components/album/add-album/AddAlbumForm";
import SongUpload from "./components/songs/song-upload/SongUpload";
import CreatePlaylistForm from "./components/playlist/CreatePlaylistForm";
import ArtistView from "./components/views/artist/ArtistView";
import PlaylistView from "./components/views/playlist/PlaylistView";
import { api } from "./utils/api";
import { setAlert } from "./actions/alert";
import {
  ALBUM_ERROR
} from "./actions/types";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const location = useLocation();

  const [openCreate, setOpenCreate] = useState(false);
  const [openAlbumModal, setOpenAlbumModal] = useState(false);
  const [openSongModal, setOpenSongModal] = useState(false);
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [inFullscreenMode, setInFullscreenMode] = useState(false);

  const [album, setAlbum] = useState({});
  const currentSong = useSelector((state) => state.songQueue.currentSong);


  const getAlbum = async (albumId) => {
    if (albumId) {
        try {
            const res = await api.get(`/album/one/${albumId}`)
            if (res.data?.album) {
                setAlbum(res.data.album);
            }
        } catch (err) {
            const errors = err.response?.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
            }

            dispatch({
                type: ALBUM_ERROR
            });
        }
    }
}

useEffect(() => {
  getAlbum(currentSong.albumId);
}, [currentSong])

  useEffect(() => {
    if (currentSong) {
      getAlbum(currentSong.albumId);
    }
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    
    dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch({ type: LOGOUT });
    });
  }, [])

  const [isAudioPlay, setIsAudioPlay] = useState(false);

  const pauseAudio = () => {
    setIsAudioPlay(false);
  }

  const playAudio = () => {
    setIsAudioPlay(true);
  }

  return (
    <div className="main">
      <div className="top">
        <Navigation />
      </div>

      <div className='middle'>
        <Routes>
          <Route path="/" element={<LandingView isAudioPlay={isAudioPlay} />} />
          <Route path="/signup" element={<SignUpView isAudioPlay={isAudioPlay} />} />
          <Route path="/login" element={<LogInView isAudioPlay={isAudioPlay} />} />
          <Route
            path="profile"
            element={<PrivateRoute component={ProfileView} />}
          />
          <Route
            path="profile/edit"
            element={<PrivateRoute component={EditProfileView} />}
          />
          <Route
            path="main"
            element={<PrivateRoute component={MainView} />}
          />
          <Route
            path="/album/:albumId"
            element={<PrivateRoute component={AlbumView} />}
          />
          <Route
            path="/artist/:artistId"
            element={<PrivateRoute component={ArtistView} />}
          />
          <Route
            path="/playlist/:playlistId"
            element={<PrivateRoute component={PlaylistView} />}
          />
        </Routes>
      </div>
      <div className={`bottom ${inFullscreenMode && "blur-background fullscreen-bottom"}`}>
        {
          album && inFullscreenMode &&
          <div className="fullscreen-album">
            <LazyLoadImage effect="opacity" className="fullscreen-album-cover" src={album.coverPhotoUrl} />
            <div className="song-info-fullscreen">
              <div style={{ overflow: "hidden" }}>
                <div className="">
                    <p className="song-title" style={{ fontSize: "2.5em" }}>
                        {currentSong?.name}
                    </p>
                </div>
                <div className="">
                  <Link to={`/artist/${album.profileId}`} style={{ color: "black" }}>
                    <p className="song-artist song-artist-fullscreen">
                        {currentSong?.artistName}
                    </p>
                  </Link>
                </div>
              </div>
              <div className="">
                <Link to={`/album/${currentSong.albumId}`} style={{ textDecoration: "none" }}>
                  <p className="song-artist song-artist-fullscreen" style={{ fontSize: "2.5em" }}>
                    {album.name}
                  </p>
                </Link>
              </div>
            </div>
          </div>  
        }
        <Player
          pause={pauseAudio}
          play={playAudio}
          inFullscreenMode={inFullscreenMode}
          setInFullscreenMode={setInFullscreenMode}
        />
      </div>
      {
        user?.isAuthenticated &&
        <>
          <Create
            open={openCreate}
            setOpen={setOpenCreate}
          >
          <div className="add-album-container">
              {
                user?.user?.user?.isArtist ?
                <>
                  <AlbumIcon 
                    onClick={() => { setOpenAlbumModal(true); setOpenCreate(false)} } 
                    className="add-album-icons" 
                    size={40} 
                  />
                  <SongIcon 
                    onClick={() => { setOpenSongModal(true); setOpenCreate(false)} } 
                    className="add-album-icons" 
                    size={40} 
                  />
                </> :
                <PlaylistIcon 
                  onClick={() => { setOpenPlaylistModal(true); setOpenCreate(false)} } 
                  className="add-album-icons" 
                  size={40} 
                />
              }
            </div>
          </Create>

          <Modal
            color={"#ef5aa0"}
            open={openAlbumModal}
            setOpen={setOpenAlbumModal}
          >
            <AddAlbumForm
              setOpenAlbumModal={setOpenAlbumModal}
            />
          </Modal>

          <Modal
            color={"#ef5aa0"}
            open={openSongModal}
            setOpen={setOpenSongModal}
          >
            <h2 className="signup-title">upload song</h2>
            <SongUpload 
              setOpenModal={setOpenSongModal}
            />
          </Modal>

          <Modal
            color={"#1E1D1B"}
            open={openPlaylistModal}
            setOpen={setOpenPlaylistModal}
          >
            <h2 className="signup-title">add playlist</h2>
            <CreatePlaylistForm
              setOpenModal={setOpenPlaylistModal}
            />
          </Modal>
        </>
      }
      <AlertList />
    </div>
  )
}

export default App;
