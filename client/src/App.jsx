import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Explore from "./pages/user/Explore";
import Search from "./pages/user/Search";
import CreateCourse from "./pages/user/instructor/CreateCourse";
import Login from "./pages/Login";
import MyCourses from "./pages/user/instructor/MyCourses";
import Navbar from "./components/Navbar/Navbar";
import AddAdmin from "./pages/admin/AddAdmin";
import AddInstructor from "./pages/admin/AddInstructor";
import AddCorporateTrainee from "./pages/admin/AddCorporateTrainee";
import { useState } from "react";
import CourseDetails from "./pages/course/CourseDetails";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import UserTypes from "./constants/UserTypes.json";
import ViewInstructorProfile from "./pages/user/ViewInstructorProfile";
import ForgetPassword from "./pages/user/ForgetPassword";
import ChangePassword from "./pages/user/ChangePassword";
import Container from "react-bootstrap/Container";
import MyProfile from "./pages/user/instructor/MyProfile";
import ResetPassword from "./pages/user/ResetPassword";
ReactSession.setStoreType("sessionStorage");

function App() {
  const [country, setCountry] = useState(ReactSession.get("country") ?? "EG");
  const [searchResults, setSearchResults] = useState([]);
  const [userType, setUserType] = useState(ReactSession.get("userType") ?? "");
  ReactSession.set("country", country);
  ReactSession.set("userType", userType);
  return (
    <>
      {ReactSession.get("userType") === UserTypes.admin ? (
        <AdminNavbar
          setSearchResults={setSearchResults}
          setCountry={setCountry}
        />
      ) : (
        <Navbar setSearchResults={setSearchResults} setCountry={setCountry} />
      )}
      <Container id="body">
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/myCourses" element={<MyCourses />} />
          <Route
            path="/search"
            element={
              <Search
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
            }
          />
          <Route path="/courses" element={<CourseDetails />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/AddInstructor" element={<AddInstructor />} />
          <Route
            path="/AddCorporateTrainee"
            element={<AddCorporateTrainee />}
          />
          <Route path="/CreateCourse" element={<CreateCourse />} />
          <Route path="/login" element={<Login setUserType={setUserType} />} />
          <Route
            path="/viewInstructorProfile/:instructorID"
            element={<ViewInstructorProfile />}
          />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route
            path="/resetPassword/:userID/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
