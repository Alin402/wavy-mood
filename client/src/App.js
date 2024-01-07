import { useState, useEffect } from "react";
import "./App.css";
import LandingView from "./components/views/landing/LandingView";
import SignUpView from "./components/views/signup/SignUpView";
import LogInView from "./components/views/signup/LogInView"
import Navigation from "./components/navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import AlertList from "./components/alerts/AlertList";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/user";
import { LOGOUT } from "./actions/types";
import setAuthToken from "./utils/setAuthToken";
import { MdOutlineQueueMusic as PlaylistIcon } from "react-icons/md";
import { MdLibraryMusic as AlbumIcon } from "react-icons/md";
import { IoMusicalNotes as SongIcon } from "react-icons/io5";
import { api } from "./utils/api";
import { setAlert } from "./actions/alert";
import {
  ALBUM_ERROR
} from "./actions/types";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

  useEffect(() => {
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
        </Routes>
      </div>
      <div className={`bottom ${inFullscreenMode && "blur-background fullscreen-bottom"}`}>
      </div>
      <AlertList />
    </div>
  )
}

export default App;
