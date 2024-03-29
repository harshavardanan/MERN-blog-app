import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ENDPOINT } from "../App";
//import { useHistory } from "react-router-dom";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  //const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    await fetch(`${ENDPOINT}/profile`, {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${ENDPOINT}/logout`, {
      credentials: "include",
      method: "POST",
    }).then(setUserInfo(null));
    navigate("/");
  }

  const username = userInfo?.username;

  return (
    <nav
      class="
          flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg bg-black "
    >
      <div class="hidden w-full md:flex md:items-center md:w-auto">
        <ul
          class="
              pt-4
              text-white
              md:flex
              md:justify-between 
              md:pt-0"
        >
          <li>
            <Link to={"/"}>
              <button class="md:p-4 py-2 block hover:text-purple-400 text-white-500">
                Home
              </button>
            </Link>
          </li>

          {username && (
            <>
              <li>
                <Link to={"/write"}>
                  <button class="md:p-4 py-2 block hover:text-purple-400 text-white-500">
                    Write
                  </button>
                </Link>
              </li>
              <li>
                <button
                  class="md:p-4 py-2 block hover:text-purple-400 text-white-500"
                  onClick={logout}
                >
                  Logout( {username} )
                </button>
              </li>
            </>
          )}
          {!username && (
            <>
              <li>
                <Link
                  to={"/login"}
                  class="md:p-4 py-2 block hover:text-purple-400 text-white-500"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  class="md:p-4 py-2 block hover:text-purple-400 text-white-500"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
