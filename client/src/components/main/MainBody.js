import { RiImage2Fill } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { BsFire } from 'react-icons/bs';
import { ImArrowUp } from 'react-icons/im';
import MoonLoader from "react-spinners/MoonLoader";

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import Post from '../Post';
import axios from "axios"


const MainBody = (props) => {
    const [postsJson, setPostsJson] = useState([])
    const [sortBy, setSortBy] = useState(0)

    async function fetchData() {
        const res = await axios.get(props.app.backendURL + "/api/posts/");
        if(Array.isArray(res.data)){
          setPostsJson(res.data)
        }else{
          setPostsJson([])
        }
    };

    async function searchPost(e) {
      const data = {
        text: e.target.value
      }

      if(data.text === ""){
        fetchData();
      }else{
        axios.post(props.app.backendURL + "/api/posts/search", data).then(res => 
          {setPostsJson(res.data)}).catch((e) => {
              console.log(e.message)
          });
      }

    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div className="flex justify-center items-center w-full text-main font-alksanet p-1">
        <div className="max-w-[550px] w-full">
            {(props.app.user.isUser) 
            ?
              <div className="bg-zinc-900 h-14 flex justify-between items-center p-2 my-4 border-[1px] border-zinc-700 rounded-md">
                <Link to={"/user?id=" + props.app.user.id}><img className="w-10 h-10 rounded-lg mr-4" src={props.app.backendURL + props.app.user.img} alt="user"/></Link>
                <Link to="/post/create" className='flex items-center w-full h-full'>
                  <button className="duration-200 hover:border-monokaigreen h-full w-full rounded-md border-[1px] border-zinc-600 flex justify-start items-center p-4">შექმენი პოსტი</button>
                  <RiImage2Fill className='text-3xl mx-2 text-zinc-300 duration-200 hover:text-monokaigreen'/>
                </Link>
              </div>
            : 
              <></>
            }

            <div className="bg-zinc-900 h-14 flex justify-between items-center py-3 px-2  my-4 border-[1px] border-zinc-700 rounded-md">
               {/*
              <div className='flex items-center justify-center'>
               
                <div onClick={() => setSortBy(0)} className={'p-2 rounded-xl flex items-center justify-around m-1 duration-200' + ((sortBy === 0) ? " bg-zinc-800" : " hover:bg-zinc-800")}>
                  <BsFire className='text-2xl'/>
                </div>
                <div onClick={() => setSortBy(1)} className={'p-2 rounded-xl flex items-center justify-around m-1 duration-200' + ((sortBy === 1) ? " bg-zinc-800" : " hover:bg-zinc-800")}>
                  <BiTimeFive className='text-2xl'/>
                </div>
                <div onClick={() => setSortBy(2)} className={'p-2 rounded-xl flex items-center justify-around m-1 duration-200' + ((sortBy === 2) ? " bg-zinc-800" : " hover:bg-zinc-800")}>
                  <ImArrowUp className='text-2xl'/>
                </div>
                
              </div>
              */}
              <form className="flex justify-center items-center w-full h-5">   
                  <div className="relative w-full h-full flex justify-center items-center">
                      <input onChange={searchPost} type="text" id="font-bpgarial simple-search" className="font-bpgarial duration-200 hover:border-green-700 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen" placeholder="ძებნა" required/>
                  </div>
              </form>
            </div>
            

            {postsJson.map((post, i) => {
              return  <Post id={post.id} app={props.app} img={post.img} description={post.description} title={post.title} upVotes={post.upVotes}  userID={post.userID} uploadTime={post.uploadTime} key={i}/>
            })}
            {(postsJson.length === 0) ? <div className='flex justify-center items-center w-full my-4'><MoonLoader color="#A9DC76" /></div> : <></>}

        </div>
      </div>
    );
  }
  
  export default MainBody;
  