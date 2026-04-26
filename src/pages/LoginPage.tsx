// 5. src/pages/LoginPage.tsx

import {
  useState,
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((s:any)=>s.auth.user);

  const [email,setEmail] =
    useState("admin@apparel.com");

  const [password,setPassword] =
    useState("1234");

  const [error,setError] =
    useState("");

  useEffect(()=>{
    if(user){
      if(user.role === "Admin"){
        navigate("/");
      }else{
        navigate("/orders");
      }
    }
  },[user,navigate]);

  const submit = ()=>{
    setError("");

    dispatch(login({
      email,
      password
    }));

    setTimeout(()=>{
      const saved =
        localStorage.getItem("user");

      if(!saved){
        setError("Invalid email or password");
      }
    },100);
  };

  return(
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">

      <div className="bg-white p-10 rounded-3xl w-[430px] shadow-2xl">

        <h1 className="text-4xl font-bold mb-2">
          Velocity Ops
        </h1>

        <p className="text-slate-500 mb-8">
          Sign in to continue
        </p>

        <input
          className="w-full border p-4 rounded-2xl mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full border p-4 rounded-2xl mb-4"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          onClick={submit}
          className="w-full btn-primary py-4"
        >
          Login
        </button>

        {error && (
          <p className="text-red-600 mt-4">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}