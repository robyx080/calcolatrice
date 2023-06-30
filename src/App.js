import './App.css';
import Calculator from './component/calculator';
import background from './image/background.jpg'

function App() {
  return (
    <div className="App" style={{backgroundImage:`url(${background})`}}>
      <Calculator/>
    </div>
  );
}

export default App;
