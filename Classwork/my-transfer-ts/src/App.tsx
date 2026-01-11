import './App.css'
import {Routes, Route} from 'react-router-dom';
import Country from "./pages/Country.tsx";
import Header from "./components/Header";
import Cities from "./pages/Cities.tsx";
import CreateCity from "./pages/CreateCity.tsx";
import CreateCitySuccess from "./pages/CreateCitySuccess.tsx";
import LoginPage from "./pages/Account/LoginPage.tsx";
import RegisterPage from "./pages/Account/RegisterPage.tsx";
import ProfilePage from "./pages/Account/ProfilePage/ProfilePage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Country/>}></Route>
                    <Route path="Cities" element={<Cities/>}></Route>
                    <Route path="CreateCity" element={<CreateCity/>}></Route>
                    <Route path="CreateCitySuccess" element={<CreateCitySuccess/>}></Route>
                    <Route path="Login" element={<LoginPage/>}></Route>
                    <Route path="Register" element={<RegisterPage/>}></Route>
                    <Route path="Profile" element={<ProfilePage/>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App