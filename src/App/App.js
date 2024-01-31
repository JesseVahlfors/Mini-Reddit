import './App.css';
import Articles from '../Articles/Articles/Articles';
import Headerbar from '../HeaderBar/Header/HeaderBar';
import Sidebar from '../Sidebar/Sidebar/Sidebar';

function App() {

  return (
    <div className="App">
      <Headerbar/>
      <Articles/>
      <Sidebar/>
    </div>
  );
}

export default App;
 