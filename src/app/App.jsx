import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react"; 
import './App.scss';

const Home = lazy(() => import("../pages/home/Home"));
const CreateEmployee = lazy(() => import("../pages/createEmployee/CreateEmployee"));
const EmployeeList = lazy(() => import("../pages/employeeList/EmployeeList"));
const Error404 = lazy(() => import("../pages/error/Error404"));
const Header = lazy(() => import("../components/header/Header"));
const Footer = lazy(() => import("../components/footer/Footer"));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Routes>
                    <Route path="/employee-list" element={<Navigate to="/list" />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateEmployee />} />
                    <Route path="/list" element={<EmployeeList />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
                <Footer />
            </Suspense>
        </Router>
    );
}

export default App;