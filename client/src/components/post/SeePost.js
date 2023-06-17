import Header from "../Header";
import { AiOutlineSend } from 'react-icons/ai';

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from "react-router-dom";

import Post from '../Post';
import axios from "axios"
import Comment from "./Comment";

const SeePost = (props) => {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")


    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const ID = params.get("id")

    async function fetchComments() {
        const res = await axios.get(props.app.backendURL + "/api/comments/" + ID);
        setComments(res.data)
    };
    
    async function addComment() {
        axios.post(props.app.backendURL + "/api/comments/add", {text: comment, jwt: props.app.cookies.get("jwt"), postID: ID }).then(res => 
            {
                fetchComments()
            }).catch((e) => {
                console.log(e.message)
            });
    };

    

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(props.app.backendURL + "/api/posts/" + ID);
            setPost(res.data)
        };
        
        fetchData();
        fetchComments();
    }, []);

    return (
        <div>
            <Header app={props.app}/>
            <div className="flex justify-center items-center w-full text-main font-alksanet p-1">
                <div className="max-w-[550px] w-full">
                    {post !== null ? <Post id={post.id} app={props.app} img={post.img} description={post.description} title={post.title} upVotes={post.upVotes}  userID={post.userID} uploadTime={post.uploadTime}/> : <></>}
                    {props.app.user.isUser 
                        ?
                            <div className="py-2 px-1 w-full my-5 flex justify-center items-center bg-zinc-900 border-[1px] border-zinc-700 rounded-md">
                                <Link to={"/user?id=" + props.app.user.id}><img className="w-10 h-10 rounded-lg mr-8 ml-2" src={props.app.backendURL + props.app.user.img} alt="user"/></Link>
                                <input onChange={(e)=>{setComment(e.target.value)}} type="text" id="simple-search" className=" font-bpgarial duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen" placeholder="დაწერე კომენტარი" required/>
                                <button onClick={() => {addComment()}} className=' font-alksanet bg-green-600  p-2 rounded-lg mx-2 duration-200 hover:bg-green-700'><AiOutlineSend className="text-2xl"/></button>
                            </div>
                        : <></>
                    }

                    <div className="py-2 px-1 w-full my-5 flex justify-center flex-col items-center bg-zinc-900 border-[1px] border-zinc-700 rounded-md">
                        {comments.map((comment, i) => {
                            return <Comment key={i} id={comment.id} userID={comment.userID} text={comment.text} created_at={comment.text} app={props.app}/>
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
  }
  
  export default SeePost;
  