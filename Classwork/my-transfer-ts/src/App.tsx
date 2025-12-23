import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import Header from "./components/Header";
import Cities from "./pages/Cities.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path="cities" element={<Cities/>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App