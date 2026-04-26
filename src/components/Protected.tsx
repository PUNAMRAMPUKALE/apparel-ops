import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({children,roles}:any){
 const user = useSelector((s:any)=>s.auth.user);

 if(!user) return <Navigate to="/login" replace />;

 if(roles && !roles.includes(user.role)){
   return <Navigate to="/" replace />;
 }

 return children;
}
