import Header from "../Header";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";


const  LogIn = (props) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="h-screen flex flex-col">
            <Header app={props.app}/>

            <div className="relative flex flex-col justify-center h-full overflow-hidden">
                <div className="max-w-[300px] w-full p-4 m-auto rounded-md lg:max-w-xl">
                    <h1 className="text-xl font-semibold text-center text-main font-alksanet">
                        აქაუნთში შესვლა
                    </h1>
                    <form className="mt-6  flex flex-col justify-center items-center">
                        <div className="mb-2 w-full">
                            <label
                                htmlFor="email"
                                className="font-alksanet block text-sm font-semibold text-main"
                            >
                                ემაილი
                            </label>
                            <input
                                type="email"
                                className=" font-bpgarial w-full my-2 duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen"
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label
                                htmlFor="password"
                                className="font-alksanet block text-sm font-semibold text-main"
                            >
                                პაროლი
                            </label>
                            <input
                                type="password"
                                className="font-bpgarial w-full my-2 duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen"
                                onChange={(e) => {setPassword(e.target.value)}}

                            />
                        </div>
                        <div className="mt-6">
                            <button 
                                className="font-alksanet px-4 py-2 tracking-wide text-main transition-colors duration-200 transform bg-green-600 rounded-md"
                                type = "button"
                                onClick={
                                async () => {
                                    const data = await axios.post(props.app.backendURL + "/api/login", {email, password})
                                    console.log(data) 
                                    props.app.cookies.set('jwt', data.data.jwt, { path: '/' })
                                    window.location = '/'
                                }}
                            >
                                    
                                შესვლა
                            </button>
                        </div>
                    </form>
                    
                    <div className="flex flex-row items-center justify-center mt-8">
                        <p className="font-alksanet text-md font-light text-center text-main">
                            არ გაქ აქაუნთი?{" "} 
                        </p>
                        <Link to="/register"><p
                            className="font-alksanet ml-4 font-medium text-monokaigreen hover:underline"
                        >
                            რეგისტრაცია
                        </p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default LogIn;