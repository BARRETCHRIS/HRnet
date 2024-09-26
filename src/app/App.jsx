import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

import Home from "../pages/home/Home";
import CreateEmployee from "../pages/createEmployee/CreateEmployee";
import EmployeeList from "../pages/employeeList/EmployeeList";
import Error404 from "../pages/error/Error404";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import './App.scss';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Redirections : Redirect old or alternative paths to the updated paths */}
                <Route path="/employee-list" element={<Navigate to="/list" />} />

                {/* Routes normales : Define the routes for the application */}
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateEmployee />} />
                <Route path="/list" element={<EmployeeList />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </Router>
    )
  
}

export default App
