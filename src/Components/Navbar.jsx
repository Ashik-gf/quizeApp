import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuth } from '../hooks/useAuth';
const Navbar = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth()
    const handelLogout = () => {
        setAuth({})
        navigate('/login')
    }
    return (
        <header className="flex justify-between items-center mb-12 px-4 font-jaro">
            <img src={logo} className="h-7" />
            <div>

                <Link
                    className={`${auth.user && 'hidden'}`}
                    to={'/login'}>
                    <button className="px-4 py-2 rounded hover:bg-black hover:text-white transition-colors" >
                        {/* style="font-family: Jaro" */}
                        Login
                    </button>
                </Link>


                <button
                    onClick={handelLogout}
                    className="px-4 py-2 rounded hover:bg-black hover:text-white transition-colors" >
                    {/* style="font-family: Jaro" */}
                    Logout
                </button>

            </div>
        </header>
    )
}

export default Navbar