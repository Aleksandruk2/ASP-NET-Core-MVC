import './App.css'
import {Routes, Route} from 'react-router-dom';
import Country from "./pages/Country.tsx";
import Header from "./components/Header";
import Cities from "./pages/Cities.tsx";
import CreateCity from "./pages/CreateCity.tsx";
import CreateCitySuccess from "./pages/CreateCitySuccess.tsx";
import GoogleLoginPage from "./pages/Account/GoogleLoginPage.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Country/>}></Route>
                    <Route path="cities" element={<Cities/>}></Route>
                    <Route path="createCity" element={<CreateCity/>}></Route>
                    <Route path="createCitySuccess" element={<CreateCitySuccess/>}></Route>
                    <Route path="googleLoginPage" element={<GoogleLoginPage/>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App