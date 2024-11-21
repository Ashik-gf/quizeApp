import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {
    const { auth } = useAuth();
    return (
        <>
            {
                auth.user ? (
                    <div className='container'>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </div>
                ) : (
                    <Navigate to={'/login'} />
                )
            }
            {/* <Footer /> */}
        </>

    )
}

export default PrivateRoutes