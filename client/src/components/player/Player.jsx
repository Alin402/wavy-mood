import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { BsFillPlayBtnFill } from "react-icons/bs";
import { BsPauseBtnFill } from "react-icons/bs";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { BsFillVolumeDownFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
    setCurrentSong
} from "../../actions/songQueue";
import "./Player.css";
import { MdOpenInFull as OpenFullScreenIcon } from "react-icons/md";
import { MdCloseFullscreen as CloseFullScreenIcon } from "react-icons/md";
import { setAlert } from "../../actions/alert";

const PlayIcon = () => 
    <BsFillPlayBtnFill 
        color="#F2EADE"
    />

const PauseIcon = () => 
    <BsPauseBtnFill 
        color="#F2EADE"
    />

const NextIcon = () => 
    <GiNextButton 
        color="#F2EADE"
    />

const PreviousIcon = () => 
    <GiPreviousButton 
        color="#F2EADE"
    />

const VolumeIcon = () => 
    <BsFillVolumeDownFill 
        color="#F2EADE"
    />

const VolumeMuteIcon = () => 
    <BsFillVolumeMuteFill 
        color="#F2EADE"
    />

const Player = ({ pause, play, inFullscreenMode, setInFullscreenMode }) => {
    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.songQueue.currentSong);
    const currentSongUrl = useSelector((state) => state.songQueue.currentSongUrl);
    const songs = useSelector((state) => state.songQueue.songs)

    const playNextSong = () => {
        if (songs.length && currentSong) {
            let currentIndex = songs.indexOf(currentSong);
            if (currentIndex === songs.length - 1) {
                dispatch(setCurrentSong(songs[0]))
                return;
            }
            dispatch(setCurrentSong(songs[currentIndex + 1]))
        }
    }

    const playPreviousSong = () => {
        if (songs.length && currentSong) {
            let currentIndex = songs.indexOf(currentSong);
            if (currentIndex === 0) {
                dispatch(setCurrentSong(songs[songs.length - 1]))
                return;
            }
            dispatch(setCurrentSong(songs[currentIndex - 1]))
        }
    }

    const handleToggleFullScreenMode = () => {
        setInFullscreenMode(!inFullscreenMode);
    }

    return (
        <div className="player">
            <div className="song-info">
                <div className="info-container">
                    <p className="song-title" style={{ fontSize: "2.5em" }}>
                        {currentSong?.name}
                    </p>
                </div>
                <div className="info-container">
                    <p className="song-artist">
                        {currentSong?.artistName}
                    </p>
                </div>
            </div>
            <div className="audio">
                <AudioPlayer
                    autoPlayAfterSrcChange={true}
                    showSkipControls
                    src={currentSongUrl}
                    showFilledProgress
                    style={{ 
                        backgroundColor: inFullscreenMode ? "inherit" : "#1E1D1B",
                        color: "#F2EADE",
                        boxShadow: "none"
                    }}
                    customIcons={{
                        play: <PlayIcon />,
                        pause: <PauseIcon />,
                        forward: <NextIcon />,
                        rewind: <PreviousIcon />,
                        volume: <VolumeIcon />,
                        volumeMute: <VolumeMuteIcon />
                    }}
                    listenInterval={0}
                    onPlay={play}
                    onPause={pause}
                    onClickNext={playNextSong}
                    onClickPrevious={playPreviousSong}
                    onEnded={playNextSong}
                />
            </div>
            <div className="action">
                {
                    inFullscreenMode ?
                    <CloseFullScreenIcon onClick={handleToggleFullScreenMode} size={40} className="open-full-screen-icon" style={{ color: "#ef5aa0" }} /> :
                    <OpenFullScreenIcon onClick={handleToggleFullScreenMode} size={40} className="open-full-screen-icon" />
                }
            </div>
        </div>
    );
}

export default Player;
