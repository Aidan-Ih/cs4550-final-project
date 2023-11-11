import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Site from './Site';
import Profile from './Site/Profile';
import ProfileEditor from './Site/Profile/profileEditor';
import store from './Site/store';
import { Provider } from "react-redux";
import Follow from './Site/Profile/follow';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Site" />} />
            <Route path="Site" element={<Site />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit-profile" element={<ProfileEditor />} />
            <Route path="profile/:pid" element={<Profile />} />
            <Route path="profile/:pid/followers" element={<Follow />}/>
            <Route path="profile/:pid/following" element={<Follow />}/>
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
