import Header from "../Header";
import {  useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LuDoorOpen } from 'react-icons/lu';


const User = (props) => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const ID = params.get("id")
    const [user, setUser] = useState(null)


    useEffect(() => {
        async function fetchData() {
            if(ID === null){
                if(props.app.user.id !== undefined){
                    window.location = '/user?id=' + props.app.user.id
                }
            }else{
                const res = await axios.get(props.app.backendURL + "/api/user/" + ID);
                setUser(res.data)
            }

            
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <Header app={props.app}/>
            <div className="flex items-center justify-center mt-8 text-main">
                <div className="max-w-[600px] w-full p-3">
                    <div className="flex items-center justify-center mt-8 w-full">
                        {user !== null 
                        ? 
                            <>
                                <img className="w-32 h-32 rounded-xl mr-5" src={props.app.backendURL + user.img} alt="user"/> 
                                
                                <div className="flex items-start justify-center font-alksanet flex-col w-min">
                                    <p className="text-4xl">{user.name}</p>
                                    {user.is_staff ? <div className='px-2 py-1 rounded-md bg-red-700 text-lg'>
                                        ადმინი
                                    </div> : <></>}
                                </div>
                            </>
                        :<></>}
                    </div>
                    {user !== null ?
                    props.app.user.isUser 
                        ? user.id ===  props.app.user.id
                            ? 
                                <div className="flex items-center justify-center mt-8 w-full"> 
                                    <button onClick={() => {window.location = "/user/edit"}} className=' font-alksanet bg-green-600  px-2 py-1 rounded-lg mx-2 duration-200 hover:bg-green-700'>რედაქტირება</button>
                                    <button onClick={() => {props.app.cookies.remove("jwt"); window.location = "/"}} className=' font-alksanet bg-red-600  p-1 rounded-lg mx-2 duration-200 hover:bg-red-800'><LuDoorOpen className="text-2xl"/></button>
                                </div>
                            :<></> 
                        : <></>
                    : <></>}

                    <div className="w-full flex items-center justify-start flex-col mt-10 font-alksanet">
                        <p className="text-2xl text-zinc-400 ml-4 m-2">პოსტები:</p>
                        {/*postsJson.map((post, i) => {
                            return  <Post img={post.img} description={post.description} title={post.title} upVotes={post.upVotes} comments={post.comments} user={post.user} uploadTime={post.uploadTime} key={i}/>
                        })*/}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default User;
