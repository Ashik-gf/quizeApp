import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import ResultPages from '../Pages/Home/ResultPage/ResultPages'
import Login from '../Pages/Login/Login'
import QuizeesPage from '../Pages/QuizeesPage'
import Registaions from '../Pages/Registations/Registaions'
import PrivateRoutes from '../Routes/PrivateRoutes'

const RoutersLayout = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<ResultPages />} path='/result/:quizeId' />
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