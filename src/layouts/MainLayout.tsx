import {
  NavLink,
  Outlet,
  useNavigate
} from "react-router-dom";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { logout } from "../features/auth/authSlice";

export default function MainLayout() {
  const user = useSelector((s:any)=>s.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = user?.role || "Viewer";

  const menuBase =
    "block px-4 py-3 rounded-2xl text-xl font-medium transition-all";

  const activeMenu =
    "bg-gradient-to-r from-amber-700 to-orange-500 text-white shadow-lg";

  const idleMenu =
    "text-white hover:bg-white/10";

  const menus = [
    {
      label:"Dashboard",
      path:"/",
      roles:["Admin"]
    },
    {
      label:"Orders",
      path:"/orders",
      roles:["Admin","Staff","Viewer"]
    },
    {
      label:"Suppliers",
      path:"/suppliers",
      roles:["Admin"]
    },
    {
      label:"Reports",
      path:"/reports",
      roles:["Admin"]
    },
    {
      label:"Settings",
      path:"/settings",
      roles:["Admin"]
    }
  ];

  const visible = menus.filter((m:any)=>
    m.roles.includes(role)
  );

  return(
    <div className="flex min-h-screen">

      <aside className="sidebar w-72 p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-bold mb-8 text-white">
            Velocity Ops
          </h1>

          <div className="p-5 rounded-3xl bg-white text-black mb-8">
            <p className="font-bold text-xl">
              {user?.name}
            </p>

            <p className="text-slate-500">
              {role}
            </p>
          </div>

          <nav className="space-y-3">

            {visible.map((m:any)=>(
              <NavLink
                key={m.path}
                to={m.path}
                end={m.path === "/"}
                className={({isActive})=>
                  `${menuBase} ${
                    isActive
                      ? activeMenu
                      : idleMenu
                  }`
                }
              >
                {m.label}
              </NavLink>
            ))}

          </nav>

        </div>

        <button
          onClick={()=>{
            dispatch(logout());
            navigate("/login");
          }}
          className="btn-primary w-full py-4 text-xl"
        >
          Logout
        </button>

      </aside>

      <main className="flex-1 p-10 bg-[#F7F4EF]">
        <Outlet />
      </main>

    </div>
  );
}