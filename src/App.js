import './App.css';
import { GlobalStyles } from './styles/global';
import TypingBox from './Components/TypingBox';
import { GameModeContextProvider } from './Context/GameModes';
var randomWords = require('random-words');

function App() {

  
  return (
    <div className="canvas">
      <GlobalStyles />
      <h1 className='heading' style={{"text-align":"center"}}>Typing Website</h1>       
      <TypingBox />
      <h1 style={{"text-align":"center"}}>Footer</h1>
    </div>
  );
}

export default App;
