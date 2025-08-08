import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Appbar from './Appbar';
import Courses from './Courses';
import Course from './Course';
import AddCourse from './AddCourse';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}>
      <RecoilRoot>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/" element={<Navigate to="/courses" />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/addcourse" element={<AddCourse />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
