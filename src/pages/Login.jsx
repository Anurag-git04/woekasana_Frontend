import React, { useContext, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import WorkContext from '../context/WorkContext';

const Login = () => {
    const [isLogin,setLogin] = useState(true)
    const [passvis,setvis] = useState(false)
    const [username,setName] = useState('')
    const [email,setEmail] = useState('')
    const [passwrod,setPassword] = useState('') 
    const navigate = useNavigate()

    const {setLogged} = useContext(WorkContext)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(isLogin){
            const obj = {
                email:email,
                password:passwrod
            }
            const res = await fetch('https://workasana-backend-ecru.vercel.app/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            })
            const data = await res.json()
            if(res.ok){
                localStorage.setItem('token',data.token)
                alert('Login Successfully')
                setLogged(true)
                navigate('/DashBoard')
            }
            if(res.status == 400){
                alert('Invalid email or password')
            }
        }else{
            const obj = {
                name:username,
                email:email,
                password:passwrod
            }
            const res = await fetch('https://workasana-backend-ecru.vercel.app/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            })
            const data = await res.json()
            if(res.ok){
                alert('Account created Successfully')
                setEmail('')
                setPassword('')
                setLogin(true)
            }else{
                alert('Your Account Already exsist')
            }
        }
    }
  return (
    <div>
        {/* <Header/> */}
        <form onSubmit={handleSubmit} className='loginIn'>
            <div className="logo">workasana</div>
            <div className="title">{isLogin ? 'Login' : 'Sign In'} to your account</div>
            <div className="subtitle">Please enter your details.</div>
            <div className='details'>
                {
                    !isLogin && (
                        <div className='input-group'>
                            <label htmlFor="">Name: </label>
                            <input value={username} type="text" onChange={(e)=>setName(e.target.value)} />
                        </div>
                    )
                }
                <div className='input-group'>
                    <label htmlFor="">Email: </label>
                    <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className='input-group password-wrapper'>
                    <label htmlFor="">Password: </label>
                    <input type={passvis ? 'text' : 'password'} value={passwrod} onChange={(e)=> setPassword(e.target.value)} />
                    {
                        passvis? <IoEyeOutline className='password-toggle' onClick={(e)=> setvis(!passvis)}/> : <IoEyeOffOutline className='password-toggle'  onClick={(e)=> setvis(!passvis)} />
                    }
                </div>
            </div>
            <button type='submit' className='loginBtn'>{isLogin? 'Login' : "Signin" }</button> 
            <p className='para' onClick={()=> setLogin(!isLogin)}>{
                isLogin? (<>Don't have account?</>):(<>Already have account?</>)
            }</p>     
        </form>
    </div>
  )
}

export default Login