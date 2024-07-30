import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Link, parsePath } from "react-router-dom";
import "./History.css";

const History = (params) => {
    const [data, setData] = useState([]);
    const [user_chl_id, setUser_chl_id] = useState(null);
    const [hoveredCards, setHoveredCards] = useState({}); // State to manage hovered cards
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const [updateonDelete, setUpdateonDelete] = useState(0);

    const compareTimestamps = (timestamp) => {
        const currentTime = new Date();
        const givenTime = new Date(timestamp);
        const differenceInMillis = currentTime - givenTime;

        const differenceInHours = differenceInMillis / (1000 * 60 * 60);
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
        if (differenceInHours < 24) return "today";
        if (differenceInHours >= 24 && differenceInHours < 48)
            return "yesterday";
        if (differenceInDays >= 2 && differenceInDays < 7) return "week";
        if (differenceInDays >= 7 && differenceInDays < 30) return "thismonth";
        return "moremonth";
    };

    useEffect(() => {
        setUser_chl_id(params.user.channel_id);
    }, [params.user]);

    useEffect(() => {
        const fetchHistoryData = async () => {
            if (user_chl_id) {
                try {
                    const response = await axios.get(
                        `${serverurl}/history?user_id=${user_chl_id}`
                    );
                    setData(response.data.videos);
                } catch (error) {
                    console.log("Error in fetching: ", error.message);
                }
            }
        };
        fetchHistoryData();
    }, [user_chl_id, serverurl, updateonDelete]);

    const handleRemoveHistory = async (video_id) => {
        const requestData = {
            user_id: user_chl_id,
            video_id,
        };

        const response = await axios.post(
            `${serverurl}/removefromhistory`,
            requestData
        );
        console.log("Response Data:", response.data);
        setUpdateonDelete((prev) => prev + 1);
    };

    const handleMouseEnter = (videoId) => {
        setHoveredCards((prevHoveredCards) => ({
            ...prevHoveredCards,
            [videoId]: true,
        }));
    };

    const handleMouseLeave = (videoId) => {
        setHoveredCards((prevHoveredCards) => ({
            ...prevHoveredCards,
            [videoId]: false,
        }));
    };

    const renderCardsByTime = (timeCategory) => {
        if (!Array.isArray(data) || data.length === 0) return [];
        return data
            .filter(
                (item) => compareTimestamps(item.watched_time) === timeCategory
            )
            .map((item) => (
                <div
                    key={item.video_id} // Ensure each card has a unique key
                    className="history-card"
                    onMouseEnter={() => handleMouseEnter(item.video_id)}
                    onMouseLeave={() => handleMouseLeave(item.video_id)}
                >
                    <div
                        className={`remove-history ${
                            hoveredCards[item.video_id] ? "show" : ""
                        }`}
                        onClick={() => {
                            handleRemoveHistory(item.video_id);
                        }}
                    >
                        <img
                            alt="remove-history"
                            src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
                        />
                        <span>Remove History</span>
                    </div>
                    <Card key={item.video_id} data={item} />
                </div>
            ));
    };

    const categories = [
        { title: "Today", category: "today" },
        { title: "Yesterday", category: "yesterday" },
        { title: "This Week", category: "week" },
        { title: "This Month", category: "thismonth" },
        { title: "Older", category: "moremonth" },
    ];

    return (
        <>
            {params.user !== "Guest" ? (
                <>
                    <div className="history-outerbox">
                        <h1>Watch History</h1>
                        {data && params.active === "true" ? (
                            categories.map(({ title, category }) => {
                                const cards = renderCardsByTime(category);
                                return cards.length > 0 ? (
                                    <div key={category}>
                                        <h2>{title}</h2>
                                        <div className="historycards">
                                            {cards}
                                        </div>
                                    </div>
                                ) : null;
                            })
                        ) : params.active === "false" ? (
                            <h3>
                                History Disabled. Enable it in General settings.
                            </h3>
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            ) : (
                <div className="guestuser">
                    <img
                        className="bigicon"
                        src="https://cdn-icons-png.flaticon.com/128/3503/3503786.png"
                        alt="subscriptions"
                    />
                    <h2>Keep track of what you watch</h2>
                    <h3>Watch history isn't viewable when signed out.</h3>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <button className="sign_in">
                            <img
                                className="guesticon"
                                src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
                                alt="user"
                            />
                            Sign In
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default History;
