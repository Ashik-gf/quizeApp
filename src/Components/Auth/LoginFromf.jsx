import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Field from '../../Common/Field';
import { useAuth } from '../../hooks/useAuth';

const LoginFromf = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();
    const submitForm = async (formData) => {
        try {
            // const user = { ...formData };
            // make an API call;
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`, formData)
            // will return token and logedin user Informations;
            if (response.data.status === 'success') {
                const { user, tokens } = response.data.data;
                if (tokens) {
                    const accessToken = tokens.accessToken;
                    const refreshToken = tokens.refreshToken;
                    setAuth({ user, accessToken, refreshToken })
                    navigate("/")
                }
            }

        } catch (error) {
            console.log(error);
            setError('root.random', {
                type: 'random',
                message: `User with email ${formData.email} is not found`
            })
        }

    }
    return (
        <form className=''
            onSubmit={handleSubmit(submitForm)}
        >
            <div className="mb-4">

                <Field label="Enter your username or email address" error={errors.email}>
                    <input
                        type="email"
                        name='email'
                        id="email"
                        defaultValue="saad@learnwithsumit.com"
                        {...register("email", { required: "Email ID is Required" })}
                        className={`w-full px-4 py-3 rounded-lg border ${!!errors.email ? "border-red-500" : "border-gray-200"
                            }`}
                        placeholder="Username Email address" />
                </Field>
            </div>
            <div className="mb-4">

                <Field label="Enter your PassWord" error={errors.email}>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        defaultValue={'password123'}
                        {...register("password", { required: "password is Required" })}
                        className={`w-full px-4 py-3 rounded-lg border ${!!errors.password ? "border-red-500" : "border-gray-200"
                            }`}
                        placeholder="Enter your PassWord" />
                </Field>
            </div>

            <div className="mb-6 flex gap-2 items-center">
                {/* <input type="checkbox" id="admin" className="px-4 py-3 rounded-lg border border-gray-300" />
                <label for="admin" className="block ">Login as Admin</label> */}
                <Field className='flex flex-row-reverse justify-start gap-4' label="Admin" error={errors.admin}>
                    <input
                        type="checkbox"
                        id="admin"
                        name='admin'
                        {
                        ...register('admin')
                        }
                        className={`w-full px-4 py-3 rounded-lg border block `}
                    />
                </Field>
            </div>
            <p className=' py-2 text-red-500'>{errors?.root?.random?.message}</p>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg mb-4">Sign in</button>
        </form>
    )
}

export default LoginFromf