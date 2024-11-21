import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import ResultPages from '../Pages/Home/ResultPage/ResultPages'
import Login from '../Pages/Login/Login'
import Registaions from '../Pages/Registations/Registaions'
import PrivateRoutes from '../Routes/PrivateRoutes'
import QuizeesPage from '../Pages/QuizeesPage'

const RoutersLayout = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<ResultPages />} path='/result' />
                    <Route element={<QuizeesPage />} path='/quize/:quizeId' />
                </Route>
                <Route element={<Layout />} path='/' />
                <Route element={<Login />} path='/login' />
                <Route element={<Registaions />} path='/registations' />
            </Routes>
        </>
    )
}

export default RoutersLayout