import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CarAdds from '../Views/Pages/CarAdd/CarAdds.jsx'
import Gallery from '../Views/Pages/Gallery/Gallery.jsx'
import Contact from '../Views/Pages/Contact/Contact.jsx'
import NotFound from '../Views/Pages/NotFound/NotFound.jsx'
import Home from '../Views/Pages/Home/Home.jsx'
import Register from '../Views/Pages/UserPage/Register.jsx'
import Login from '../Views/Pages/UserPage/Login.jsx'
import CarPage from '../Views/Pages/Carspage/CarPage.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Admin from '../Views/Pages/Admin/Admin.jsx'
const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<CarPage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/postAdds" element={
                    <PrivateRoute>
                        <CarAdds />
                    </PrivateRoute>
                }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />

            </Routes>





        </div>
    )
}

export default MainRoutes