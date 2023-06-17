import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import { BiComment } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { SlPencil } from 'react-icons/sl';

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Comment = (props) => {
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

  const [user, setUser] = useState(null)

  useEffect(() => {
      async function fetchData() {
          const res2 = await axios.get(props.app.backendURL + "/api/user/" + props.userID);
          setUser(res2.data)
      };
      
      fetchData();
  }, []);

  return (
    <div className='my-0.5 w-full flex justify-start items-start rounded-md'>
        <div className='w-full h-full flex items-center justify-start flex-col px-3 py-2'>
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
              <p className='text-xs ml-5'>{calcTimeDiff(new Date(props.created_at))}</p>
          </div>

          <div className='w-full  flex items-center justify-start mt-1 pl-7'>
              <p className='text-md font-bpgarial'>{props.text}</p>
          </div>

        </div>
    </div>
  );
}

export default Comment;
