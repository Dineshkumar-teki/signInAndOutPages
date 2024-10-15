import React, { useState } from "react";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <div className="text-xl font-semibold">App Name</div>
      <div className="flex items-center space-x-4">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-question-mark-silhouette_23-2150940534.jpg?size=626&ext=jpg&uid=R136712360&ga=GA1.1.1914382452.1716092979&semt=ais_hybrid"
          alt="User"
          className="rounded-full w-10 h-10 cursor-pointer border"
          onClick={() => {
            setShowSideBar(!showSideBar);
          }}
        />
      </div>
      {showSideBar && (
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-black border-black absolute top-[80px] right-[10px] text-gray-200 p-5 rounded-lg ">
          <ul>
            <li className="mb-4">
              <button className="block p-2 rounded hover:bg-gray-700 w-full text-left">
                Dashboard
              </button>
            </li>
            <li className="mb-4">
              <button className="block p-2 rounded hover:bg-gray-700 w-full text-left">
                Profile
              </button>
            </li>
            <li className="mb-4">
              <button className="block p-2 rounded hover:bg-gray-700 w-full text-left">
                Settings
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => {
                  cookie.remove("jwtToken");
                  navigate("/sign-in");
                }}
                className="block p-2 rounded hover:bg-gray-700 w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>
      )}
    </header>
  );
};

export default Header;
