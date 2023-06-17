import { AiOutlineCloudUpload } from 'react-icons/ai';
import { EditorState } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';

import Header from "../Header";
import MyEditor from "./MyEditor";

import { useState } from "react";
import axios from 'axios';

const CreatePost = (props) => {
    const [title, setTitle] = useState("")
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [img, setImg] = useState(null)

    const upload = async () => {
        /*const post = {
            title: title,
            description: stateToHTML(editorState.getCurrentContent()),
            img: img,
            userID: 0
        }*/

        let data = new FormData()
        if(img != null){
            data.append("img", img);
        }  

        data.append("title", title);
        data.append("description", stateToHTML(editorState.getCurrentContent()));
        data.append("jwt", props.app.cookies.get("jwt"))


        let res = await axios.post(props.app.backendURL + "/api/posts/create", data)

        if (res.data.errmsg === undefined  || res.data.errmsg === null){
            window.location = '/'
        }
    }

    return (
        <div>
            <Header app={props.app}/>
            <div className="flex items-center justify-center w-full text-main  mt-8 mb-2 p-2">
                <div className="max-w-[600px] w-full">
                    <div className="w-full h-12 border-b-[1px] border-zinc-700 p-6 flex items-center justify-between font-alksanet">
                        <p>შექმენი პოსტი</p>
                        <button className='bg-green-600  px-2 py-0.5 rounded-lg duration-200 hover:bg-green-700' onClick={upload}>ატვირთვა</button>
                    </div>

                    <div className="w-full bg-zinc-900 rounded-md mt-8 p-3">
                        <input onChange={(e) => {setTitle(e.target.value)}} type="text" id="simple-search" className="mb-4 font-alksanet bg-transparent h-ful border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-monokaigreen focus:monokaigreen block w-full p-2.5   dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-monokaigreen dark:focus:border-monokaigreen" placeholder="სათაური" required/>
                        <MyEditor editorState={editorState} setEditorState={setEditorState} />
                        {img === null 
                        ? 
                        <div className="flex items-center justify-center w-full mt-4">
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <AiOutlineCloudUpload className='text-5xl'/>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                </div>
                                <input accept="image/*" id="dropzone-file" type="file" className="hidden" onChange={
                                    (e) => {
                                        if(e.target.files.length > 0){
                                            setImg(e.target.files[0])
                                        }else{
                                            setImg(null)
                                        }
                                    }}/>
                            </label>
                        </div> 
                        :
                        <>
                            <button onClick={() => setImg(null)} className='bg-red-600  px-2 py-0.5 rounded-lg mt-4 font-alksanet duration-200 hover:bg-red-800'>წაშალე ფოტო</button>
                            <img src={URL.createObjectURL(img)} alt='upload' className='w-full mt-4'/>
                        </>
                        }
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CreatePost;
