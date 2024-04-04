import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOutBtn from "./LogoutBtn";

export default function Header() {
  const userStatus = useSelector((state) => state.auth.status);

  const menus = [
    {
      id: 1,
      name: "Home",
      link: "/",
      show: true,
    },
    {
      id: 2,
      name: "Login",
      link: "/login",
      show: !userStatus,
    },
    {
      id: 3,
      name: "Signup",
      link: "/signup",
      show: !userStatus,
    },
    {
      id: 4,
      name: "posts",
      link: "/posts",
      show: userStatus,
    },
    {
      id: 5,
      name: "Add-post",
      link: "/add-post",
      show: userStatus,
    },
  ];

  return (
    <header className="flex justify-between items-center max-w-[90%] mx-auto">
      <div>
        <NavLink to="/">
          <img className="size-20" src="/images/logo.jpg" alt="" />
        </NavLink>
      </div>
      <div>
        <nav>
          <ul className="flex justify-around items-center space-x-10">
            {menus.map(
              (menu) =>
                menu.show && (
                  <li
                    className="py-1.5 px-4 text-gray-600 text-[17px]"
                    key={menu.id}
                  >
                    <NavLink
                      className={() => {
                        return `hover:text-black py-1 ${
                          window.location.pathname === menu.link
                            ? "text-black font-medium border-b-2 border-black"
                            : ""
                        }`;
                      }}
                      to={menu.link}
                    >
                      {menu.name}
                    </NavLink>
                  </li>
                )
            )}
            {userStatus && <LogOutBtn />}
          </ul>
        </nav>
      </div>
    </header>
  );
}
