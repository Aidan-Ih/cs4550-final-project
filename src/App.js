import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Site from './Site';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Site" />} />
          <Route path="Site" element={<Site/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
