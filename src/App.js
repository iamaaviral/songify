import './App.css';
import Player from './player/Player';
import SongsList from './songsList/SongsList';

function App() {
  return (
    <div className="App">
      <SongsList />
      <Player />
    </div>
  );
}

export default App;
