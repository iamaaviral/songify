import { useEffect, useRef, useState } from "react";
import "./App.css";
import songs from "./constants";

import Player from "./player/Player";
import SongsList from "./songsList/SongsList";
import { randomExcluded } from "./utilities/generateRandomIndex";
import { generateTimeFormat } from "./utilities/generateTimeFormat";

function App() {
  const [allSongs] = useState(songs);

  const audioRef = useRef()

  const [currentSongIndex, setCurrentSongIndex] = useState(2);
  const [isPause, setIsPause] = useState(false);
  const [willLoop, setWillLoop] = useState(false);
  const [willShuffle, setWillShuffle] = useState(false);
  const [time, setTime] = useState({
    totalTime: 0,
    elapsedTime: 0
  })
  const [volume, setVolume] = useState(100);

  const [progressBarWidth, setProgressBarWidth] = useState(0)

  useEffect(() => {
    if (isPause) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPause]);

  useEffect(() => {
    updateProgressBar();
    setProgressBarWidth(0)
  }, [currentSongIndex])


  const updateProgressBar = () => {
    audioRef.current.addEventListener('loadedmetadata', () => {
      for(let i =0; i<audioRef.current.duration; i++) {
        setTimeout(() => {
          updateProgressBarPercentage()
        }, 1000*i)
        setTimeout(() => {
          updateCurrentTime();
          },1000 *i);
      }
    });
  }

  const updateCurrentTime = () => {
    let elapsedTime = Math.floor(audioRef.current.currentTime);
    let totalTime = Math.floor(audioRef.current.duration);
    setTime({
      elapsedTime: generateTimeFormat(elapsedTime),
      totalTime: generateTimeFormat(totalTime)
    })
  }

  const updateProgressBarPercentage = () => {
    let ct =audioRef.current.currentTime;
    let td =audioRef.current.duration;
    let percentage = (ct/td)*100;
    setProgressBarWidth(percentage)
  }

  const nextSong = (index = 1 ) => {
    if(willShuffle) {
      shuffleIndex()
    } else {
      const newIndex = currentSongIndex + index
      setCurrentSongIndex(newIndex);
    }
  };

  const prevSong = (index = 1) => {
    if(willShuffle) {
      shuffleIndex()
    } else {
    const newIndex = currentSongIndex - index
    setCurrentSongIndex(newIndex);
    }
  };

  const playSong = () => {
    setIsPause(!isPause);
  };

  const shuffleSong = () => {
    setWillShuffle((prevShuffle) => !prevShuffle)
  }

  const loopSong = () => {
    setWillLoop((prevLoop) => !prevLoop)
  }

  const shuffleIndex = () => {
    const nextSongIndex = randomExcluded(1,allSongs.length, currentSongIndex)
    setCurrentSongIndex(nextSongIndex)
  }

  const handleSongEnded = () => {
    if(willShuffle) {
      shuffleIndex()
    } else if(currentSongIndex < allSongs.length) {
      // play the nextSong song
      const nextSongIndex = currentSongIndex + 1
      setCurrentSongIndex(nextSongIndex)
    } else if(willLoop && currentSongIndex < allSongs.length) {
      setCurrentSongIndex(0)
    } else {
      setIsPause(false);
      audioRef.currentTime = 0
    }
  }

  const changeVolume = (value) => {
    audioRef.current.volume = (value / 100)
    setVolume(value)
  }

  return (
    <div className="App">
      <audio
        controls
        src={allSongs[currentSongIndex]?.fileName}
        autoPlay={true}
        onEnded={handleSongEnded}
        ref={audioRef}
      />
      <SongsList songs={allSongs} setCurrentSongIndex={setCurrentSongIndex}/>
      <Player
        currentSongIndex={currentSongIndex}
        nextSong={nextSong}
        prevSong={prevSong}
        playSong={playSong}
        isPause={isPause}
        songs={allSongs}
        setWillShuffle={shuffleSong}
        willShuffle={willShuffle}
        willLoop={willLoop}
        setWillLoop={loopSong}
        progressBarWidth={progressBarWidth}
        time={time}
        volume={volume}
        changeVolume={changeVolume}
      />
    </div>
  );
}

export default App;
