import Swiper from "./Swiper";
import './App.css';
import {
  movies as videos
} from './data/videos'

function App() {
  return (
      <Swiper videos={videos}></Swiper>
  );
}

export default App;
