import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Homepage from './Site/Homepage';
import Details from './Site/Details';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Homepage" />} />
          <Route path="Homepage" element={<Homepage/>}/>
          <Route path="Details/:tournamentId" element={<Details/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
