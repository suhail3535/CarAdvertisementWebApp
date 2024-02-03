import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "../Images/wolks.png";
import { links } from "../data";
import "../Styles/Navbar.css";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Tooltip } from '@chakra-ui/react'


let isAuth = JSON.parse(localStorage.getItem("isAuth")) || false;

const Navbar = () => {
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate()

    const handlelogoutUser = () => {
        window.localStorage.clear();
        localStorage.removeItem('isAuth');
        localStorage.removeItem('loggedInUser');
        navigate("/");
        window.location.reload();
    };

    return (

        <div className="nav_container">
            <div className="logo_div">
                <Link to="/" className="logo">
                    <img src={logo} alt="logo" />

                </Link>

            </div>

            <div className={`nav_links ${isShow ? "show_nav" : "hide_nav"}`}>
                {links.map(({ name, path }, index) => {
                    return (
                        <button key={index}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    isActive ? "active-nav" : ""
                                }>
                                {name}
                            </NavLink>
                        </button>
                    );
                })}
            </div>


            <div className="dropdown-menu">
                <button className="hover-account">
                    <Tooltip
                        hasArrow

                        bg="gray.300"
                        color="black">
                        <FaUserCircle />
                    </Tooltip>
                    {isAuth === true ? localStorage.getItem("loggedInUser") : ""}
                </button>
                {isAuth === false ? (
                    <ul className="all-log">
                        <li className="log">
                            <Link
                                to="/login"
                                smooth={true}
                                offset={-100}
                                duration={500}>
                                Log in

                            </Link>
                        </li>
                        <li className="log">
                            <Link
                                to="/register"
                                smooth={true}
                                offset={-100}
                                duration={500}>
                                Register Here

                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul onClick={handlelogoutUser} className="all-log">
                        <li className="log">Logout</li>
                    </ul>
                )}
            </div>

            <button className="nav_toggle_btn" onClick={() => setIsShow(!isShow)}>
                {isShow ? <MdOutlineClose /> : <FaBars />}
            </button>
        </div>

    );
};

export default Navbar;
