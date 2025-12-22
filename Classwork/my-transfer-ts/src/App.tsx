import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Home/>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App