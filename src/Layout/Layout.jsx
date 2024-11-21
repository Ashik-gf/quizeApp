import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Home from '../Pages/Home/Home'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    )
}

export default Layout