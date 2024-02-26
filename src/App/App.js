import 'normalize.css'
import './App.css';
import Articles from '../Articles/Articles/Articles';
import Headerbar from '../HeaderBar/Header/HeaderBar';
import Sidebar from '../Sidebar/Sidebar/Sidebar';
import useMediaQuery from '../Utils/Hooks/useMediaQuery';

function App() {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div className="App">
      <Headerbar/>
      <Articles/>
      {!isSmallScreen && <Sidebar/>}
    </div>
  );
}

export default App;
 