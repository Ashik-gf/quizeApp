import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
const QuizessBox = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { api } = useAxios()
    useEffect(() => {
        const fetchQuize = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes`);
                setQuizzes(response.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchQuize();
    }, [])
    return (
        <main className="bg-white p-6 rounded-md h-full">
            <section>
                <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>
                {/* <!-- Cards --> */}
                {
                    quizzes.map((quizze) => (<div key={quizze.id}

                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link to={`${quizze.is_attempted ? `/result/${quizze.id}` : `/quize/${quizze.id}`}`}
                            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer">
                            <div
                                className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                                {/* <h1 className=" text-5xl font-jaro" >{quizze.title}</h1>
                                <p className="mt-2 text-lg">{quizze.description}</p> */}
                            </div>
                            <div
                                className={`${quizze.is_attempted ? '' : "hidden"} absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white  place-items-center`}>
                                <div className=' text-center'>
                                    <h1 className="text-3xl font-bold">Already Participated</h1>
                                    <p className="text-center">Click to view your leaderboard</p>

                                </div>
                            </div>
                            <img src={quizze.thumbnail} alt="JavaScript Hoisting"
                                className="w-full h-full object-cover rounded mb-4" />
                        </Link>
                    </div>)
                    )
                }

            </section>
        </main>
    )
}

export default QuizessBox