import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext.js";
import { Link } from "react-router-dom";
import "./Header.css";
import "./themes.css";

const Header = (params) => {
    const locationHook = useLocation();
    const [query, setQuery] = useState("");
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [page, setPage] = useState(locationHook.pathname);
    const user = params.user;
    const [isprofilemenu, setIsprofilemenu] = useState(false);
    const [profilemenuhover, setProfilemenuhover] = useState(false);

    const toggleDropdown = () => {
        setIsprofilemenu(!isprofilemenu);
    };

    useEffect(() => {
        if (!profilemenuhover) {
            const timer = setTimeout(() => {
                setIsprofilemenu(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isprofilemenu, profilemenuhover]);

    useEffect(() => {
        const currentpage = locationHook.pathname;
        setPage(currentpage);
    }, [locationHook]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query !== "") window.location.href = "/search?query=" + query;
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className="head">
            <div className="iconntitle">
                <button
                    className="toggle-menu"
                    onClick={() => {
                        params.onClick(
                            page === "/login" || page === "/watch"
                                ? "toggle2"
                                : "toggle1"
                        );
                    }}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
                        alt="toggle-menu"
                    />
                </button>
                <Link to="/" className="youtube-btn">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1384/1384060.png"
                        alt="youtube"
                    />
                    <p>YouTube</p>
                </Link>
            </div>
            <div className="search">
                <form
                    onSubmit={(e) => {
                        handleSearch(e);
                    }}
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="search"
                    />
                    <Link to={query !== "" ? "/search?query=" + query : null}>
                        <button type="submit" className="searchbutton">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/2811/2811806.png"
                                alt="search"
                            />
                        </button>
                    </Link>
                </form>
            </div>
            <div className="profile">
                <div className="login-profile">
                    {params.user !== "Guest" ? (
                        <>
                            <img
                                className="create"
                                src="https://cdn-icons-png.flaticon.com/128/4189/4189286.png"
                                alt="Create"
                            />
                            <img
                                className="notifications"
                                src="https://cdn-icons-png.flaticon.com/128/2645/2645890.png"
                                alt="Notifications"
                            />
                            <img
                                className="profilepic"
                                src={user.channel_icon}
                                alt="Profile"
                                onClick={toggleDropdown}
                            />
                            {isprofilemenu && (
                                <div
                                    className="dropdown-menu"
                                    onMouseEnter={() =>
                                        setProfilemenuhover(true)
                                    }
                                    onMouseLeave={() =>
                                        setProfilemenuhover(false)
                                    }
                                >
                                    <div className="profile-box">
                                        <img
                                            className="profile-box-img"
                                            src={user.channel_icon}
                                            alt="profile"
                                        ></img>
                                        <div>
                                            <p className="profile-box-text">
                                                {user.username}
                                            </p>
                                            <p className="profile-box-text">
                                                {user.custom_url}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/me"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="dropdown-menu-item">
                                            <img
                                                className="dropdown-menu-item-img"
                                                src="https://cdn-icons-png.flaticon.com/128/456/456212.png"
                                                alt="Logout"
                                            />
                                            <p className="dropdown-menu-item-text">
                                                View profile
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/yourchannel"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="dropdown-menu-item">
                                            <img
                                                className="dropdown-menu-item-img"
                                                src="https://cdn-icons-png.flaticon.com/128/2989/2989849.png"
                                                alt="YourChannel"
                                            />
                                            <p className="dropdown-menu-item-text">
                                                Your channel
                                            </p>
                                        </div>
                                    </Link>
                                    <div
                                        className="dropdown-menu-item"
                                        onClick={toggleTheme}
                                    >
                                        <img
                                            className="dropdown-menu-item-img"
                                            src="https://cdn-icons-png.flaticon.com/128/12377/12377255.png"
                                            alt="Toogle Theme"
                                        />
                                        <p className="dropdown-menu-item-text">
                                            Appearance:{" "}
                                            {theme === "light"
                                                ? "Light"
                                                : "Dark"}
                                        </p>
                                    </div>
                                    <div className="dropdown-menu-item">
                                        <img
                                            className="dropdown-menu-item-img"
                                            src="https://cdn-icons-png.flaticon.com/128/2838/2838912.png"
                                            alt="Location"
                                        />
                                        <p className="dropdown-menu-item-text">
                                            Location: {user.location}
                                        </p>
                                    </div>
                                    <Link
                                        to="/settings"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="dropdown-menu-item">
                                            <img
                                                className="dropdown-menu-item-img"
                                                src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png"
                                                alt="Settings"
                                            />
                                            <p className="dropdown-menu-item-text">
                                                Settings
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/login?type=logout"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="dropdown-menu-item">
                                            <img
                                                className="dropdown-menu-item-img"
                                                src="https://cdn-icons-png.flaticon.com/128/12377/12377255.png"
                                                alt="Logout"
                                            />
                                            <p className="dropdown-menu-item-text">
                                                Logout
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="header-guest-menu">
                            <img
                                className="toogle-theme"
                                src="https://cdn-icons-png.flaticon.com/128/12377/12377255.png"
                                alt="Toogle Theme"
                                onClick={toggleTheme}
                            />
                            <Link
                                to="/login"
                                style={{ textDecoration: "none" }}
                            >
                                <button className="sign_in">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
                                        alt="user"
                                    />
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
