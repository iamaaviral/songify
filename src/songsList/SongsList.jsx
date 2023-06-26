import songs from "../constants";
import "./songsList.css";

const SongsList = () => {
  return (
    <div className="songsListContainer">
    <div className="songsListWrapper">
      {songs.map((s) => {
        return (
          <div className="each-song">
            <div className="img-wrapper">
                <img src={s.image} alt="song-img" />
            </div>
            <div className="content-wrapper">
              <h3 className="song-name">{s.name}</h3>
              <h4 className="artist-name"> {s.artist}</h4>
            </div>
  
          </div>
        );
      })}
    </div>
    </div>

  );
};

export default SongsList;
