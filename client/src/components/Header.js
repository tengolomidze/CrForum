import { BsFillBellFill } from 'react-icons/bs';
import { Link } from "react-router-dom";



const Header = (props) => {
    const path = window.location.pathname
    return (
      <div className="bg-zinc-900 h-12 text-main flex justify-between items-center px-4 border-b-[1px] border-zinc-700">
        <Link to="/" className='flex justify-center items-center'><p className="text-2xl font-bold text-center">
            <span className="text-monokaigreen">Cr</span>
            <span>Forum</span>
        </p></Link>
        {/*
        <form className="flex justify-center items-center w-96 h-8">   
            <div className="relative w-full h-full flex justify-center items-center">
                <input type="text" id="simple-search" className="h-ful bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen" placeholder="Search" required/>
            </div>
        </form>
        */}

        <div className=" flex items-center justify-center h-full">
            {(props.app.user.isUser) 
            ?
                <>
                    <Link to={"/user?id=" + props.app.user.id} className='flex justify-center items-center'>
                        <img className="w-8 h-8 rounded-lg mx-2 object-cover" src={props.app.backendURL + props.app.user.img} alt="user"/>
                        <div className="flex justify-between items-start flex-col font-alksanet ">
                            <p className="text-sm font-medium">{props.app.user.name}</p>
                            {/*<p className="text-xs font-medium">Lvl: {Math.floor(props.app.user.XP / 100)}</p>*/}
                        </div>
                    </Link>

                    {/*<div>
                        <div className='bg-red-600 w-4 h-4 rounded-full flex justify-center items-center absolute translate-x-12'>
                            <p className='text-center text-xs'>9+</p>
                        </div>
                        <BsFillBellFill className='text-xl ml-8 mr-2'/>
                    </div>*/}
                </>
            :
                <>
                    {(path !== "/login") ? <Link to="/login"><button className='bg-green-600 px-2 py-1 rounded-lg font-alksanet mx-1 text-sm'>შესვლა</button></Link> : <></>}
                    {(path !== "/register") ? <Link to="/register"><button className='bg-green-600 px-2 py-1 rounded-lg font-alksanet mx-1 text-sm'>რეგისტრაცია</button></Link> : <></>}
                </>
            }
            

        </div>

      </div>
    );
  }
  
  export default Header;
  