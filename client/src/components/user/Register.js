import Header from "../Header";
import { Link } from "react-router-dom";
import useWindowDimensions from '../../js/useWindowDimensions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const  Register = (props) => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const [errors, setErrors] = useState(null)

    const [user_name, setUser_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [re_password, setRe_password] = useState("")
    


    function onSignUp(){
        let user = {
            name: user_name,
            email: email,
            password: password,
            re_password: re_password
        }
        console.log(user)
        axios.post(props.app.backendURL + "/api/register", user)
        .then(() => {navigate('/login');})
        .catch(function (error) {
            if (error.response) {
                let errorText = ""
                
                if(error.response.data.user_name){
                    errorText = "name: " + error.response.data.user_name
                }else if(error.response.data.email){
                    errorText = "email: " + error.response.data.email
                }else if(error.response.data.password){
                    errorText = "password: " + error.response.data.password
                }else if(error.response.data.re_password){
                    errorText = "re_password: " + error.response.data.re_password
                }else if(error.response.data.non_field_errors){
                    errorText = "non_field_errors: " + error.response.data.non_field_errors
                }
                
                setErrors(errorText);
            }
          });;
    }

    return (
        <div className="flex flex-col h-screen">
            <Header app={props.app}/>
            <div className="relative flex flex-col justify-center h-full overflow-hidden">
                <div className="w-full p-6 m-auto rounded-md lg:max-w-xl">
                    <h1 className="font-alksanet text-xl font-semibold text-center text-main">
                    რეგისტრაცია
                    </h1>

                    {
                        (errors === null) ? 
                        <></>:
                        <p className="font-alksanet text-xl text-center text-zinc-400 m-4 ">{errors}</p>
                    
                    }

                    <form className="mt-6 flex flex-col justify-center items-center w-full">
                        <div className={"flex justify-center items-center" + ((width >= 600) ? " flex-row" : " flex-col")}>
                            <div className="flex flex-col justify-center items-center mx-6 w-full">
                                <div className="mb-2 w-full">
                                    <label
                                        htmlFor="name"
                                        className="font-alksanet block text-sm font-semibold text-main"
                                    >
                                        სახელი
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full my-2 duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen"
                                        name="name"
                                        onChange={(e) => {setUser_name(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        htmlFor="email"
                                        className="font-alksanet block text-sm font-semibold text-main"
                                    >
                                        ემაილი
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full my-2 duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen"
                                        onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center mx-6 w-full">
                                <div className="mb-2 w-full">
                                    <label
                                        htmlFor="password"
                                        className="font-alksanet block text-sm font-semibold text-main"
                                    >
                                        პაროლი
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full my-2 duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen"
                                        onChange={(e) => {setPassword(e.target.value)}}
                                    
                                    />
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        htmlFor="re_password"
                                        className="font-alksanet block text-sm font-semibold text-main"
                                    >
                                        გაიმეორე პაროლი
                                    </label>
                                    <input
                                        type="password"
                                        name="re_password"
                                        className="w-full my-2 duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen"
                                        onChange={(e) => {setRe_password(e.target.value)}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button 
                                type = "button"
                                onClick={() => {onSignUp()}}
                                className="font-alksanet px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md">
                                რეგისტრაცია
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-row items-center justify-center mt-4">
                        <p className="font-alksanet text-md font-light text-center text-main">
                        გაქ აქაუნთი?{" "}
                        </p>

                        <Link to="/login"><p
                            className="font-alksanet ml-4 font-medium text-monokaigreen hover:underline">
                            შესვლა
                        </p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Register;