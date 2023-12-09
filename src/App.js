import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Homepage from './Site/Homepage';
import Details from './Site/Details';
import Search from './Site/Search';
import SearchResult from './Site/SearchResults';
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
          <Route path="/" element={<Navigate to="Homepage" />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="SignUp" element={<Signup />} />
          <Route path="SignIn" element={<Signin />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<ProfileEditor />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="profile/followers" element={<Follow />} />
          <Route path="profile/following" element={<Follow />} />
          <Route path="profile/:id/followers" element={<Follow />} />
          <Route path="profile/:id/following" element={<Follow />} />
          <Route path="Details/:tournamentId" element={<Details/>}/>
          <Route path="Search" element={<Search/>}/>
          <Route path="SearchResult" element={<SearchResult/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
