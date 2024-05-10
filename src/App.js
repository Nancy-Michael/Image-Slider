
import './App.css';
import ImageSlider from './ImageSlider';

function App() {
  return (
    <div className="App">
      <ImageSlider url={"https://picsum.photos/v2/list"}
        limit={"5"}
        page={'1'} />
    </div>
  );
}

export default App;
