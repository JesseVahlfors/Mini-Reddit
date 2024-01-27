import './App.css';
import Articles from '../Articles/Articles/Articles';
import Headerbar from '../HeaderBar/Header/HeaderBar';
import { getTimeDifferenceString } from '../Utils/Funcs/time';
const created_utc = 1705999676.0
const now = new Date().getTime() / 1000; // Current timestamp in seconds
const timestampOneDayAgo = now - 86400; // 1 day ago
const timestampOneWeekAgo = now - 604800; // 1 week ago
const timestampOneMonthAgo = now - 2629743; // Approximately 1 month (30.44 days) ago
const timestampOneYearAgo = now - 31556952; // 1 year ago
const timestampThreeMonthsAgo = now - (3 * 30 * 24 * 60 * 60); // 3 months ago

function App() {
  console.log(getTimeDifferenceString(created_utc))
  console.log(getTimeDifferenceString(created_utc))
console.log(getTimeDifferenceString(timestampOneDayAgo))
console.log(getTimeDifferenceString(timestampOneWeekAgo))
console.log(getTimeDifferenceString(timestampOneMonthAgo))
console.log(getTimeDifferenceString(timestampOneYearAgo))
console.log(getTimeDifferenceString(timestampThreeMonthsAgo))

  return (
    <div className="App">
      <Headerbar/>
      <Articles/>
    </div>
  );
}

export default App;
