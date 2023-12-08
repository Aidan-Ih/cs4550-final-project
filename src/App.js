import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Homepage from './Site/Homepage';
import Details from './Site/Details';
import Search from './Site/Search';
import SearchResult from './Site/SearchResults';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Homepage" />} />
          <Route path="Homepage" element={<Homepage/>}/>
          <Route path="Details/:tournamentId" element={<Details/>}/>
          <Route path="Search" element={<Search/>}/>
          <Route path="SearchResult" element={<SearchResult/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
