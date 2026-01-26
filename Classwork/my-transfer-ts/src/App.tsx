import './App.css'
import {Routes, Route} from 'react-router-dom';
import Country from "./pages/Country.tsx";
import Cities from "./pages/Cities.tsx";
import CreateCity from "./pages/CreateCity.tsx";
import CreateCitySuccess from "./pages/CreateCitySuccess.tsx";
import LoginPage from "./pages/Account/LoginPage.tsx";
import RegisterPage from "./pages/Account/RegisterPage.tsx";
import ProfilePage from "./pages/Account/ProfilePage/ProfilePage.tsx";
import AdminLayout from "./components/AdminLauout/AdminLayout.tsx";
import MainLayout from "./components/Layout/MainLayout.tsx";
import AppLayout from "./admin/layout/AppLayout.tsx";
import UserProfiles from "./admin/pages/UserProfiles.tsx";
import HomeAdmin from "./admin/pages/Dashboard/Home.tsx";
import Calendar from "./admin/pages/Calendar.tsx";
import Blank from "./admin/pages/Blank.tsx";
import FormElements from "./admin/pages/Forms/FormElements.tsx";
import BasicTables from "./admin/pages/Tables/BasicTables.tsx";
import Alerts from "./admin/pages/UiElements/Alerts.tsx";
import Avatars from "./admin/pages/UiElements/Avatars.tsx";
import Badges from "./admin/pages/UiElements/Badges.tsx";
import Buttons from "./admin/pages/UiElements/Buttons.tsx";
import Images from "./admin/pages/UiElements/Images.tsx";
import Videos from "./admin/pages/UiElements/Videos.tsx";
import LineChart from "./admin/pages/Charts/LineChart.tsx";
import BarChart from "./admin/pages/Charts/BarChart.tsx";
import SignIn from "./admin/pages/AuthPages/SignIn.tsx";
import SignUp from "./admin/pages/AuthPages/SignUp.tsx";
import NotFound from "./admin/pages/OtherPage/NotFound.tsx";
import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute.tsx";
import ProtectedGuestRoute from "./Routes/ProtectedGuestRoute.tsx";
import ProtectedUserRoute from "./Routes/ProtectedUserRoute.tsx";
import ForgotPasswordPage from "./pages/Account/ForgotPasswordPage/ForgotPasswordPage.tsx";
import ForgotPasswordSuccess from "./pages/Account/ForgotPasswordPage/ForgotPasswordSuccess.tsx";
import ResetPasswordPage from "./pages/Account/ResetPasswordPage/ResetPasswordPage.tsx";
import UserSearch from "./pages/Search/UserSearch.tsx";
import Transportations from "./pages/Transportations/Transportations.tsx";
import Cart from "./pages/Cart/Cart.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Country/>}></Route>
                    <Route path="Cities" element={<Cities/>}></Route>
                    <Route path="transportations" element={<Transportations/>}></Route>
                    {/*<Route path="CreateCity" element={<CreateCity/>}></Route>*/}
                    {/*<Route path="CreateCitySuccess" element={<CreateCitySuccess/>}></Route>*/}

                    {/*Захищений маршрут від авторизованих коритсувачів*/}
                    <Route element={<ProtectedGuestRoute/>}>
                        <Route path="Login" element={<LoginPage/>}></Route>
                        <Route path="Register" element={<RegisterPage/>}></Route>

                        {/*Відновлення пароля*/}
                        <Route path="forgot-password" element={<ForgotPasswordPage/>}></Route>
                        <Route path="forgot-password-success" element={<ForgotPasswordSuccess/>}></Route>

                        <Route path="reset-password" element={<ResetPasswordPage/>}></Route>
                    </Route>

                    {/*Захищений маршрут від неавторизованих коритсувачів*/}
                    <Route element={<ProtectedUserRoute/>}>
                        <Route path="Profile" element={<ProfilePage/>}></Route>
                        <Route path="cart" element={<Cart/>}></Route>
                    </Route>

                    {/*Захищений маршрут від неавторизованих коритсувачів і для тих хто не містирь роль - Адмін*/}
                    <Route element={<ProtectedAdminRoute/>}>
                        <Route path="Admin" element={<AdminLayout/>}>
                            <Route path="Countries" element={<Country/>}></Route>
                            <Route path="Cities" element={<Cities/>}></Route>
                            <Route index element={<ProfilePage/>}></Route>
                        </Route>

                        <Route path={"AdminPanel"} element={<AppLayout />}>
                            <Route index element={<HomeAdmin />} />

                            {/* Others Page */}
                            <Route path="profile" element={<UserProfiles />} />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="blank" element={<Blank />} />

                            {/* Forms */}
                            <Route path="form-elements" element={<FormElements />} />

                            {/* Tables */}
                            <Route path="basic-tables" element={<BasicTables />} />

                            {/*My Tables edit*/}
                            <Route path="CreateCity" element={<CreateCity/>}></Route>
                            <Route path="CreateCitySuccess" element={<CreateCitySuccess/>}></Route>

                            {/* Ui Elements */}
                            <Route path="alerts" element={<Alerts />} />
                            <Route path="avatars" element={<Avatars />} />
                            <Route path="badge" element={<Badges />} />
                            <Route path="buttons" element={<Buttons />} />
                            <Route path="images" element={<Images />} />
                            <Route path="videos" element={<Videos />} />

                            {/* Charts */}
                            <Route path="line-chart" element={<LineChart />} />
                            <Route path="bar-chart" element={<BarChart />} />

                            {/*Тестування пошуку користувачів*/}
                            <Route path="user-search" element={<UserSearch/>}></Route>
                        </Route>
                    </Route>

                    {/* Auth Layout */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App