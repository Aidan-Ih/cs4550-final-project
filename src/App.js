import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Site from './Site';
import Profile from './Site/Profile';
import ProfileEditor from './Site/Profile/profileEditor';
import Follow from './Site/Profile/follow';
import Signin from './Site/Profile/signin';
import Signup from './Site/Profile/signup';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Site" />} />
          <Route path="Site" element={<Site />} />
          <Route path="SignUp" element={<Signup />} />
          <Route path="SignIn" element={<Signin />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<ProfileEditor />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="profile/followers" element={<Follow />} />
          <Route path="profile/following" element={<Follow />} />
          <Route path="profile/:id/followers" element={<Follow />} />
          <Route path="profile/:id/following" element={<Follow />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
