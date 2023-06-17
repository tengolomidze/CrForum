import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiComment } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { SlPencil } from 'react-icons/sl';

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Post = (props) => {

  const calcTimeDiff = (time) => {
    let msec = Date.now() - time;
    if(Math.floor(msec / 1000 / 60 / 60 / 24 / 30) > 0){
      return Math.floor(msec / 1000 / 60 / 60 / 24 / 30) + " თვის წინ"
    }else if(Math.floor(msec / 1000 / 60 / 60 / 24) > 0){
      return Math.floor(msec / 1000 / 60 / 60 / 24) + " დღის წინ"
    }else if(Math.floor(msec / 1000 / 60 / 60) > 0){
      return Math.floor(msec / 1000 / 60 / 60) + " საათის წინ"
    }else if(Math.floor(msec / 1000 / 60) > 0){
      return Math.floor(msec / 1000 / 60) + " წუთის წინ"
    }else {
      return "ახლახანს"
    }
  }

  const [votes, setVotes] = useState([])
  const [voted, setVoted] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
      async function fetchData() {
          const res = await axios.get(props.app.backendURL + "/api/votes/" + props.id);
          setVotes(res.data.votes)

          const res2 = await axios.get(props.app.backendURL + "/api/user/" + props.userID);
          setUser(res2.data)

          axios.post(props.app.backendURL + "/api/votes/see", {postID: props.id, jwt: props.app.cookies.get("jwt")}).then(res => 
          {
            setVoted(res.data.vote)
          }).catch((e) => {
            console.log(e.message)
          });
      };
      
      fetchData();
  }, []);

    useEffect(() => {
      async function fetchData2() {
        const res = await axios.get(props.app.backendURL + "/api/votes/" + props.id);
        setVotes(res.data.votes)
      }

      async function fetchData() {
          if(voted !== null){
              axios.post(props.app.backendURL + "/api/votes/add", {postID: props.id, jwt: props.app.cookies.get("jwt"), voted: voted}).then(res => 
              {
                fetchData2()
              }).catch((e) => {
                console.log(e.message)
              });
          }
      };

      
      
      fetchData();
  }, [voted]);

  return (
    <div className='my-5 flex justify-start items-start bg-zinc-900 border-[1px] border-zinc-700 rounded-md pt-2'>
        <div className='w-12 flex items-center justify-start flex-col rounded-md py-3 pl-2'>
          <ImArrowUp onClick={() => {if(props.app.user.isUser){if(voted === 1){setVoted(0)}else{setVoted(1)}}else{window.location="/login"}}} className={'text-xl ' + ((voted === 1) ? "text-monokaigreen" : "text-zinc-400")}/>
          <p>{votes}</p>
          <ImArrowDown onClick={() => {if(props.app.user.isUser){if(voted === -1){setVoted(0)}else{setVoted(-1)}}else{window.location="/login"}}} className={'text-xl ' + ((voted === -1) ? "text-monokaigreen" : "text-zinc-400")}/>
        </div>

        <div className='w-full h-full flex items-center justify-start flex-col p-2'>
          <div className='w-full  flex items-center justify-start'>
              {user !== null 
              ? 
                <Link to={"/user?id=" + user.id} className='flex items-center justify-start'>
                  <img className="w-5 h-5 rounded-lg mr-2" src={props.app.backendURL + user.img} alt="user"/>
                  <p className='text-xs'>{user.name}</p>
                  {user.is_staff ? <div className='px-1 py-0.5 rounded-md bg-red-700 text-xs mx-4'>
                    ადმინი
                  </div> : <></>}
                </Link>
              :
                <></>
              }
              <p className='text-xs ml-5'>{calcTimeDiff(new Date(props.uploadTime))}</p>
          </div>

          <div className='w-full  flex items-center justify-start my-1'>
              <p className='text-xl'>{props.title}</p>
          </div>

          <div className='w-full flex items-start justify-start flex-col font-bpgarial text-sm text-zinc-400 ' dangerouslySetInnerHTML={{__html: props.description}}>
          </div>
          {(props.img != null) ? <img className="w-full rounded-xl mt-2" src={props.app.backendURL + props.img} alt="user"/> : <></>}
          
          <div className='flex items-center justify-around mt-2 w-full text-zinc-400'>
            <div className='flex items-center justify-center w-full  p-1 rounded-md duration-200 hover:bg-zinc-800'>
              <Link to={"/post?id=" + props.id} className='flex items-center justify-center w-full '>
                <BiComment className='text-xl mr-2'/>
                <p className='text-xs'>კომენტარები</p>
              </Link>
            </div>
            {/*
            <div className='flex items-center justify-center w-full  p-1 rounded-md duration-200 hover:bg-zinc-800'>
              <BsBookmark className='text-xl mr-2'/>
              <p className='text-xs'>შენახვა</p>
            </div>
            
            <div className='flex items-center justify-center w-full  p-1 rounded-md duration-200 hover:bg-zinc-800'>
              <SlPencil className='text-xl mr-2'/>
              <p className='text-xs'>რედაქტირება</p>
            </div>*/
            }
          </div>
        </div>
    </div>
  );
}

export default Post;
