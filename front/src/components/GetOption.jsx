import axios from 'axios'
import { useState, useRef, useEffect } from 'react'

const GetOption = ({setPloblem}) => {
  const [tag, setTag] = useState("all")
  const [errMessage, setErrMessage] = useState("")
  const minDiffRef = useRef()
  const maxDiffRef = useRef()
  const userIdRef = useRef()
  
  const handleSubmit = () => {
    let minDiff, maxDiff;
    if(minDiffRef.current.value === "") minDiff = "-10000"
    else minDiff = minDiffRef.current.value;
    if(maxDiffRef.current.value === "") maxDiff = "10000"
    else maxDiff = maxDiffRef.current.value;
    if (isNaN(minDiff) || isNaN(maxDiff)) {
      setErrMessage("数値を入力してください")
      return;
    }
    setErrMessage("")
    const userId = userIdRef.current.value
    console.log(userId)
    const url = "https://atcoderdiffsort-api.onrender.com/"
    axios.post(url, {tag:tag, minDiff:minDiff, maxDiff:maxDiff, userId:userId})
    .then((res) => {
      console.log(res)
      if (res.data !== null) setPloblem(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  };

  useEffect(() => {
    handleSubmit();
  });

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  return (
    <div className='p-3 border-b border-gray-400'>
      <select onChange={(e) => handleChange(e)} className="px-0.5 focus:outline-none">
        <option value="all">ALL</option>
        <option value="abc">ABC</option>
        <option value="arc">ARC</option>
        <option value="agc">AGC</option>
      </select>
      <input 
      className='px-2 py-0.5 border border-gray-400 rounded mr-1 ml-0.5 w-20 focus:outline-none'
      type="text"
      ref={minDiffRef}
      placeholder="minDiff"
      />
      <input 
      className='px-2 py-0.5 border border-gray-400 rounded ml-0.5 mr-1 w-20 focus:outline-none'
      type="text"
      ref={maxDiffRef}
      placeholder="maxDiff"
      />
      <input 
      className='px-2 py-0.5 border border-gray-400 rounded ml-0.5 mr-1 w-20 focus:outline-none'
      type="text"
      ref={userIdRef}
      placeholder="userId"
      />
      <button
      className='border border-gray-700 hover:opacity-40 rounded text-gray-700 py-0.5 px-2'
      onClick={handleSubmit}
      >search</button>
      <div className='text-red-600 text-large'>{errMessage}</div>
    </div>
  )
}

export default GetOption
