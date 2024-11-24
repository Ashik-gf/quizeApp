import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const QuizeesPage = () => {
    const [quizeLists, setQuizeLists] = useState([])
    const [questions, setQuestions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState('');
    const { auth } = useAuth();
    const { quizeId } = useParams();
    const { api } = useAxios();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [result, setResult] = useState({});
    useEffect(() => {
        const fetchQuize = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${quizeId}`);
                setQuizeLists(response.data.data);
                setQuestions(response.data.data.questions)
            } catch (error) {
                console.log(error);
            }
        }
        fetchQuize();
    }, [quizeId])

    const handleNextQuestion = async () => {
        if (currentQuestionIndex === questions.length - 1) {
            // All questions answered, submit attempt
            try {
                const answersObject = {};
                for (let i = 0; i < questions.length; i++) {
                    answersObject[questions[i].id] = selectedOptions; // Replace with actual selected answer for each question
                }
                const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${quizeLists.id}/attempt`, { answers: answersObject });
                // console.log('Quiz attempt submitted successfully:', response);
                setResult(response.data.data)
                // Display success message or handle response data
            } catch (error) {
                console.error('Error submitting quiz attempt:', error);
            }
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };


    const currentQuestions = questions[currentQuestionIndex];
    // find rigth answer
    const handleCheckboxChange = (event) => {
        const option = event.target.value;
        if (event.target.checked) {
            setSelectedOptions(option);
        }
    };

    // console.log(selectedOptions);
    // console.log(quizeLists);
    console.log(result);
    return (
        <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
                {/* <!-- Left Column --> */}
                <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">{quizeLists.title}</h2>
                        <p className="text-gray-600 mb-4">{quizeLists.description}</p>

                        <div className="flex flex-col">
                            <div
                                className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                {`Total number of questions: ${quizeLists?.questions?.length || 0}`}
                            </div>

                            <div
                                className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                {`"Participation :" ${currentQuestionIndex}`}
                            </div>

                            <div
                                className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                                {`"Remaining :" ${quizeLists?.questions?.length - currentQuestionIndex}`}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto flex items-center">
                        <img src={auth?.user?.image} alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover" />
                        <span className="text-black font-semibold">{auth?.user?.full_name}</span>
                    </div>
                </div>

                {/* <!-- Right Column --> */}
                {
                    currentQuestions ?
                        <div className="lg:col-span-2 bg-white">
                            <div className="bg-white p-6 !pb-2 rounded-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-semibold">{currentQuestions?.question}</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {
                                        currentQuestions?.options.map((option, index) => <label key={index} className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                                            <input
                                                type="checkbox"
                                                name="answer"
                                                className="form-radio text-buzzr-purple"
                                                value={option}
                                                checked={selectedOptions === option}
                                                onChange={handleCheckboxChange}
                                            />
                                            <span>{option}</span>
                                        </label>)
                                    }
                                </div>

                            </div>


                            <button
                                onClick={handleNextQuestion}
                                className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8">
                                Next
                            </button>
                        </div> : <div className=' w-full h-full flex justify-center items-center'>
                            <p className=' bg-green-900 px-2 py-1 rounded-2xl font-jaro text-2xl text-green-400'>Thanks for Play</p>
                        </div>
                }

            </div>
        </main>
    )
}

export default QuizeesPage