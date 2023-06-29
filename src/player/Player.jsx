import "./player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faRandom,
  faRepeat,
  faStepBackward,
  faStepForward,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSongIndex,
  nextSong,
  playSong,
  prevSong,
  isPause,
  songs,
  setWillShuffle,
  willShuffle,
  setWillLoop,
  willLoop,
  progressBarWidth,
  time,
  volume,
  changeVolume
}) => {
  return (
    <div className="player-wrapper">
      <div className="now-playing">
        <div className="songImage">
          <img
            src={songs[currentSongIndex]?.image}
            alt="song-img"
            width={56}
            height={56}
          />
        </div>
        <div className="artist">
          <div className="artist-song-name">
            {songs[currentSongIndex]?.name}
          </div>
          <div className="artist-name">{songs[currentSongIndex]?.artist}</div>
        </div>
      </div>
      <div className="controls">
        <div className="player-buttons">
          <button
            className={`control-buttons ${willShuffle ? "shuffle" : ""}`}
            onClick={setWillShuffle}
          >
            <FontAwesomeIcon icon={faRandom} />
          </button>
          <button
            className="control-buttons"
            onClick={() => prevSong()}
            disabled={currentSongIndex === 0}
          >
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button className="control-buttons" onClick={playSong}>
            {isPause ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button
            className="control-buttons"
            onClick={() => nextSong()}
            disabled={currentSongIndex === songs.length - 1}
          >
            <FontAwesomeIcon icon={faStepForward} />
          </button>
          <button
            className={`control-buttons ${willLoop ? "loop" : ""}`}
            onClick={setWillLoop}
          >
            <FontAwesomeIcon icon={faRepeat} />
          </button>
        </div>
        <div className="progress-wrapper">
          <span className="time-elapsed">{time.totalTime}</span>
          <div className="player-progress">
            <div
              className="progress-filled"
              style={{ width: `${progressBarWidth}%` }}
            >
              {" "}
            </div>
          </div>
          <span className="song-duration">{time.elapsedTime}</span>
        </div>
      </div>
      <div className="volume-controls-wrapper">
        <FontAwesomeIcon icon={volume ? faVolumeUp : faVolumeMute} className="volume-controls-icon" onClick={() => changeVolume(0)}/>
        <input
          id="vol-control"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
          conChange
          step="1"
          className="volume-controls-level"
        ></input>
      </div>
    </div>
  );
};

export default Player;
