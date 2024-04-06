import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOutBtn from "./LogoutBtn";
import { Transition } from "@headlessui/react";

export default function Header() {
  const userStatus = useSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = useState(false);

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
      name: "All-posts",
      link: "/all-posts",
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
    <>
      <header className="flex justify-between items-center max-w-[90%] mx-auto">
        <div>
          <NavLink to="/">
            <img className="size-20" src="/images/logo.jpg" alt="" />
          </NavLink>
        </div>
        <div className="md:block hidden">
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
        <div className="hidden max-md:block">
          <div className="-mr-2 -my-2 md:hidden">
            {!isOpen && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open menu</span>
                {/* Hamburger icon */}
                <svg
                  className="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-500"
            enterFrom="right-72 opacity-0"
            enterTo="right-0 opacity-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="right-0 opacity-100"
            leaveTo="right-72 opacity-0"
          >
            {(ref) => (
              <div
                ref={ref}
                className="fixed inset-y-0 right-0 max-w-xs w-full h-full bg-white transition transform duration-200 ease-in-out sm:pl-5 border-l-[1px] border-gray-200 z-50"
              >
                <div className="h-full flex flex-col space-y-8 py-6 pr-6 pl-8 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close menu</span>
                      {/* Close icon */}
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col space-y-5">
                    {menus.map(
                      (menu) =>
                        menu.show && (
                          <NavLink
                            key={menu.id}
                            to={menu.link}
                            className="text-gray-900 text-lg font-medium hover:text-black"
                          >
                            {menu.name}
                          </NavLink>
                        )
                    )}
                    {userStatus && <LogOutBtn />}
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </header>
    </>
  );
}
