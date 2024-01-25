import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setUserInfo} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    const login = async(ev) => {
        ev.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
          method:'POST',
          body:JSON.stringify({username, password}),
          headers:{'Content-Type':"application/json"},
          credentials: 'include',
        })
        if(response.ok){
          response.json().then(userInfo => {
            setUserInfo(userInfo)
            setRedirect(true)
          })
        }else{
          alert("Invalid credentials")
        }
    }
    if(redirect) { return<Navigate to={"/"}/>}  
    return (<div class="bg-purple-600 min-h-screen flex items-center text-lg">
      <form onSubmit={login} class="p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
          <h1 class="text-center text-gray-400 font-bold text-2xl uppercase mb-10">Login</h1>
        <div class="shadow">
          <div class="flex items-center bg-purple-400 rounded-t-lg border-purple-500 border-b">
            <label for="name" class="w-20 text-right mr-8 p-4  text-purple-200">Username</label>
            <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} placeholder="Put in your username" class="flex-1 p-4 pl-0 bg-transparent placeholder-purple-300  outline-none text-white overflow-ellipsis overflow-hidden" />
          </div>
          <div class="flex items-center bg-purple-400  rounded-b-lg border-purple-500 mb-10">
            <label for="twitter" class="w-20 text-right p-4 mr-8 text-purple-200">Password</label>
            <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="Password" class="flex-1 p-4 pl-0 bg-transparent placeholder-purple-300 outline-none text-white overflow-ellipsis overflow-hidden" />
          </div>
        </div>
        <button type='submit' class="bg-pink-400 block w-full rounded py-4 text-white font-bold shadow">Login</button>

      </form>
    </div>)
}

export default Login