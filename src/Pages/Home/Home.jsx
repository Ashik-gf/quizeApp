import React from 'react'
import QuizessBox from '../../Components/QuizessBox/QuizessBox'
import WelcomeHero from '../../Components/WelcomeHero'
import { useAuth } from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'

const Home = () => {
    const { auth } = useAuth();
    const api = useAxios();
    return (
        <div className=' w-full'>
            {
                auth.user && <WelcomeHero />
            }
            <QuizessBox />
        </div>
    )
}

export default Home