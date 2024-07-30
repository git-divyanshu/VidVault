import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

import "./Settings.css";

const Settings = (params) => {
    const [settings_index, setSettings_index] = useState(0);
    const [editEmail, setEditEmail] = useState(false);
    const [iswatchlater, setIswatchlater] = useState("true");
    const [islikedvideos, setIslikedvideos] = useState("true");
    const [ishistory, setIshistory] = useState("true");
    const [isShorts, setIsShorts] = useState("true");
    const { theme, toggleTheme } = useContext(ThemeContext);
    const user = params.user;

    const userDetails = [
        { label: "Name", value: user.username },
        { label: "Email", value: user.email },
        { label: "Username", value: user.user_id },
        { label: "DOB", value: user.DOB },
        { label: "Password", value: "Change Password" },
    ];
    const channelDetails = [
        { label: "Channel name", value: user.channel_name },
        { label: "Channel description", value: user.short_desc },
        { label: "Custom Url", value: user.custom_url },
        { label: "Location", value: user.location },
        { label: "Total Views", value: user.total_views },
        { label: "Subscribers", value: user.subscribers },
        { label: "Channel Icon", value: user.channel_icon },
        { label: "Channel Banner", value: user.channel_banner },
        { label: "Channel Keywords", value: user.keywords },
    ];

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        setIshistory(params.ishistory);
        setIswatchlater(params.iswatchlater);
        setIslikedvideos(params.islikedvideos);
        setIsShorts(params.isShorts);
    }, [
        params.iswatchlater,
        params.islikedvideos,
        params.ishistory,
        params.isShorts,
    ]);

    return (
        <div className="settings-page">
            <div className="settings-menu">
                <h2>Settings</h2>
                <div className="menu-item" onClick={() => setSettings_index(0)}>
                    <h3>Account</h3>
                </div>
                <div className="menu-item" onClick={() => setSettings_index(1)}>
                    <h3>General settings</h3>
                </div>
                <div className="menu-item" onClick={() => setSettings_index(2)}>
                    <h3>Profile settings</h3>
                </div>
                <div className="menu-item" onClick={() => setSettings_index(3)}>
                    <h3>Channel settings</h3>
                </div>
                <div className="menu-item" onClick={() => setSettings_index(4)}>
                    <h3>Advanced settings</h3>
                </div>
            </div>
            <div className="settings">
                {settings_index === 0 ? (
                    <div className="settings-div account">
                        <div className="setting-div-heading-box parts">
                            <h4>Account</h4>
                            <h1>
                                Choose how you appear and what you see on
                                YouTube
                            </h1>
                            <p className="parts-para">
                                Signed in as {user.email}
                            </p>
                        </div>
                        <div className="your-account parts">
                            <h2 className="parts-heading">
                                Your YouTube channel
                            </h2>
                            <p className="parts-para">
                                This is your public presence on YouTube. You
                                need a channel to upload your own videos,
                                comment on videos, or create playlists.
                            </p>
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">
                                        Your channel
                                    </h3>
                                </div>
                                <div className="dual-part2">
                                    <div className="dual-outer">
                                        <div className="dual-part1">
                                            <img
                                                alt="profile"
                                                className="dual-profile-img"
                                                src={user.channel_icon}
                                            />
                                        </div>
                                        <div className="dual-part2">
                                            <p className="dual-text">
                                                {user.channel_name}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/yourchannel"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <p className="parts-links">
                                            Navigate to your channel
                                        </p>
                                    </Link>
                                    <p
                                        onClick={() => {
                                            setSettings_index(2);
                                        }}
                                        className="parts-links"
                                    >
                                        Edit your profile or channel
                                    </p>
                                    <p
                                        onClick={() => {
                                            setSettings_index(4);
                                        }}
                                        className="parts-links"
                                    >
                                        View advanced settings
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : settings_index === 1 ? (
                    <div className="settings-div general">
                        <div className="setting-div-heading-box parts">
                            <h4>General settings</h4>
                            <h1>Customize your YouTube experience</h1>
                            <p className="parts-para">
                                Welcome to your personalized YouTube. Tailor
                                your theme and playback settings. Choose your
                                language, manage privacy, and explore playback
                                options for the perfect viewing experience.
                            </p>
                        </div>
                        <div className="themes parts">
                            <h2 className="parts-heading">Themes</h2>
                            <p className="parts-para">Choose your theme</p>
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">Theme</h3>
                                </div>
                                <div className="dual-part2">
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            if (theme !== "light") {
                                                toggleTheme();
                                            }
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                theme === "light" ? "tick" : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Light
                                    </p>
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            if (theme !== "dark") {
                                                toggleTheme();
                                            }
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                theme === "dark" ? "tick" : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Dark
                                    </p>
                                </div>
                            </div>
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">Shorts</h3>
                                </div>
                                <div className="dual-part2">
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "shorts",
                                                "true"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                isShorts === "true"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Enable
                                    </p>
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "shorts",
                                                "false"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                isShorts === "false"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Disable
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="privacy parts">
                            <h2 className="parts-heading">Privacy</h2>
                            <p className="parts-para">
                                Manage your privacy settings
                            </p>
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">History</h3>
                                </div>
                                <div className="dual-part2">
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "history",
                                                "true"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                ishistory === "true"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Enable
                                    </p>
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "history",
                                                "false"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                ishistory === "false"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Disable
                                    </p>
                                </div>
                            </div>
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">
                                        Watch Later
                                    </h3>
                                </div>
                                <div className="dual-part2">
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "watchlater",
                                                "true"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                iswatchlater === "true"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Enable
                                    </p>
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "watchlater",
                                                "false"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                iswatchlater === "false"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Disable
                                    </p>
                                </div>
                            </div>
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">
                                        Likes and Dislikes
                                    </h3>
                                </div>
                                <div className="dual-part2">
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "likedvideos",
                                                "true"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                islikedvideos === "true"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Enable
                                    </p>
                                    <p
                                        className="dual-text dual-btn"
                                        onClick={() => {
                                            params.handleSettings(
                                                "likedvideos",
                                                "false"
                                            );
                                        }}
                                    >
                                        <img
                                            className={`option-img-tick ${
                                                islikedvideos === "false"
                                                    ? "tick"
                                                    : ""
                                            }`}
                                            src="https://cdn-icons-png.flaticon.com/128/3388/3388530.png"
                                            alt="tick"
                                        />{" "}
                                        Disable
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : settings_index === 2 ? (
                    <div className="settings-div profileset">
                        <div className="setting-div-heading-box parts">
                            <h4>Profile settings</h4>
                            <h1>Manage your profile settings</h1>
                            <p className="parts-para">
                                Signed in as {user.email}
                            </p>
                        </div>
                        <div className="profile-settings parts">
                            {userDetails.map((detail, index) => (
                                <div className="dual-outer" key={index}>
                                    <div className="dual-part1">
                                        <h3 className="dual-headings">
                                            {detail.label}
                                        </h3>
                                    </div>
                                    <div className="dual-part2 dual-edit">
                                        <p className="dual-text">
                                            <button className="dual-edit-btn">
                                                Edit
                                            </button>
                                            {detail.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : settings_index === 3 ? (
                    <div className="settings-div channel">
                        <div className="setting-div-heading-box parts">
                            <h4>Channel settings</h4>
                            <h1>Manage your channel settings</h1>
                            <p className="parts-para">
                                Signed in as {user.email}
                            </p>
                        </div>
                        <div className="channel-settings parts">
                            {channelDetails.map((detail, index) => (
                                <div className="dual-outer" key={index}>
                                    <div className="dual-part1">
                                        <h3 className="dual-headings">
                                            {detail.label}
                                        </h3>
                                    </div>
                                    <div className="dual-part2 dual-edit">
                                        <p className="dual-text">
                                            <button className="dual-edit-btn">
                                                Edit
                                            </button>
                                            {detail.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : settings_index === 4 ? (
                    <div className="settings-div advanced">
                        <div className="setting-div-heading-box parts">
                            <h4>Advanced settings</h4>
                            <h1>Set up YouTube exactly how you want it</h1>
                            <p className="parts-para">
                                Signed in as {user.email}
                            </p>
                        </div>
                        <div className="advanced parts">
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">
                                        Channel id
                                    </h3>
                                </div>
                                <div className="dual-part2">
                                    <p className="dual-text">
                                        {user.channel_id}
                                    </p>
                                </div>
                            </div>
                            <div className="dual-outer">
                                <div className="dual-part1">
                                    <h3 className="dual-headings">User id</h3>
                                </div>
                                <div className="dual-part2">
                                    <p className="dual-text">{user.user_id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Settings;
