import "./player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faRandom,
  faRepeat,
  faStepBackward,
  faStepForward,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import songs from "../constants";

const Player = () => {
  return (
    <div className="player-wrapper">
      <div className="now-playing">
        <div className="songImage">
          {" "}
          <img src={songs[0].image} alt="song-img" width={56} height={56} />
        </div>
        <div className="artist">
          <div className="artist-song-name">{songs[0].name}</div>
          <div className="artist-name">{songs[0].artist}</div>
        </div>
      </div>
      <div className="controls">
        <div className="player-buttons">
          <button className="control-buttons">
            <FontAwesomeIcon icon={faRandom} />
          </button>
          <button className="control-buttons">
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button className="control-buttons">
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="control-buttons">
            <FontAwesomeIcon icon={faStepForward} />
          </button>
          <button className="control-buttons">
            <FontAwesomeIcon icon={faRepeat} />
          </button>
        </div>
        <div className="progress-wrapper">
          <span class="time-elapsed">1:00 </span>
          <div class="player-progress">
            <div id="progress-filled"> </div>
          </div>
          <span class="song-duration">2:00</span>
        </div>
      </div>
      <div className="volume-controls">
        <FontAwesomeIcon icon={faVolumeUp} />
        <input
          id="vol-control"
          type="range"
          min="0"
          max="100"
          value="100"
          step="1"
          class="hidden"
        ></input>
      </div>
    </div>
  );
};

export default Player;
