import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Watch.css";
import axios from "axios";
import Videoplayer from "./Videoplayer";
import Cardloading from "./Cardloading";

const Watch = (params) => {
    const [data, setData] = useState("");
    const [isliked, setisliked] = useState(false);
    const [isdisliked, setIsdisliked] = useState(false);
    const [watchdata, setwatchdata] = useState({});
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const user = params.user;
    const [issubed, setissubed] = useState(false);
    const [channel_id, setChannel_id] = useState(null);
    const [video_id, setVideo_id] = useState(null);
    const [user_chl_id, setUser_chl_id] = useState(null);
    const [video_resolution, setVideo_resolution] = useState(0);
    const [qualityoptions, setQualityoptions] = useState([480, 720, 1080]);
    const [video_url, setVideo_url] = useState("");
    const [audio_url, setAudio_url] = useState("");

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }

    const addSubscriber = async () => {
        const requestData = {
            user_chl_id,
            channel_id,
        };

        const response = await axios.post(
            `${serverurl}/addtosubs`,
            requestData
        );
        console.log("Response Data:", response.data);
        setissubed(true);
    };

    const unsub = async () => {
        const requestData = {
            user_chl_id,
            channel_id,
        };

        const response = await axios.post(
            `${serverurl}/removefromsubs`,
            requestData
        );
        console.log("Response Data:", response.data);

        setissubed(false);
    };

    const addlike = async () => {
        const requestData = {
            user_id: user_chl_id,
            video_id,
        };

        const response = await axios.post(
            `${serverurl}/addtoliked`,
            requestData
        );
        console.log("Response Data:", response.data);
        setisliked(true);
    };

    const removelike = async () => {
        const requestData = {
            user_id: user_chl_id,
            video_id,
        };

        const response = await axios.post(
            `${serverurl}/removefromliked`,
            requestData
        );
        console.log("Response Data:", response.data);

        setisliked(false);
    };

    useEffect(() => {
        const issubscribed = async () => {
            const response = await axios.get(
                `${serverurl}/issub?user_id=${user_chl_id}&channel_id=${channel_id}`
            );
            setissubed(response.data.sub);
        };

        const isliked = async () => {
            const response = await axios.get(
                `${serverurl}/isliked?user_id=${user_chl_id}&video_id=${video_id}`
            );
            setisliked(response.data.liked);
        };

        if (user_chl_id && channel_id) {
            isliked();
            issubscribed();
        }
    }, [user_chl_id, channel_id, video_id]);

    const [i, seti] = useState(true);
    useEffect(() => {
        if (i === true) {
            const fetchstreamURL = async () => {
                await axios
                    .get(
                        `https://flaskapp-production-9eb3.up.railway.app/get_video_url${window.location.search}`
                    )
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => {
                        console.log("Error in fetching: ", error.message);
                    });
            };
            fetchstreamURL();
            seti(false);
        }
    }, [i]);

    useEffect(() => {
        const fetchwatchdata = async () => {
            await axios
                .get(`${serverurl}/watch` + window.location.search)
                .then((response) => {
                    setwatchdata(response.data.data[0]);
                })
                .catch((error) => {
                    console.log("Error in fetching: ", error.message);
                });
        };
        fetchwatchdata();
    }, [user]);

    useEffect(() => {
        setUser_chl_id(user.channel_id);
        setChannel_id(watchdata.channel_id);
        setVideo_id(watchdata.video_id);
    }, [user, watchdata]);

    useEffect(() => {
        if (data.video_quality_options) {
            setAudio_url(data.best_audio_url);
            const videoOptions = data.video_quality_options;
            for (let i = 0; i < videoOptions.length; i++) {
                if (videoOptions[i].resolution === video_resolution) {
                    setVideo_url(videoOptions[i].url);
                    setAudio_url(data.best_audio_url);
                } else if (video_resolution === 0) {
                    setVideo_url(data.best_video_url);
                    setAudio_url(data.best_audio_url);
                }
            }
            setQualityoptions(
                data.video_quality_options.length > 0
                    ? data.video_quality_options.map(
                          (option) => option.resolution
                      )
                    : ["Auto"]
            );
        }
    }, [data, video_resolution]);

    const handleQualityChange = (option) => {
        setVideo_resolution(parseInt(option));
    };

    return (
        <>
            {watchdata.title ? (
                <div className="watchpage">
                    <div className="vplayer">
                        <div className="video-player">
                            <Videoplayer
                                streamUrl={video_url}
                                audioUrl={audio_url}
                                type="video"
                                muted={false}
                                handleQualityChange={handleQualityChange}
                                qualityoptions={qualityoptions}
                                video_resolution={video_resolution}
                            />
                        </div>

                        <div className="video_info">
                            <p className="title">{watchdata.title}</p>
                            <div className="box">
                                <div className="boxpart1">
                                    <Link
                                        to={`/channel?channel_id=${watchdata.channel_id}`}
                                    >
                                        <img
                                            className="channelicon"
                                            src={watchdata.channel_icon}
                                            alt="channel"
                                        />
                                    </Link>

                                    <div className="namensubs">
                                        <p>
                                            <Link
                                                to={`/channel?channel_id=${watchdata.channel_id}`}
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <b>{watchdata.channel_name}</b>
                                            </Link>
                                            <br></br>
                                            {formatNumber(
                                                watchdata.subscribers
                                            )}{" "}
                                            subscribers
                                        </p>
                                        <p></p>
                                    </div>
                                    <button
                                        className={
                                            issubed
                                                ? "subscribe ed"
                                                : "subscribe"
                                        }
                                        onClick={() => {
                                            issubed ? unsub() : addSubscriber();
                                        }}
                                    >
                                        {issubed ? "Subscribed" : "Subscribe"}
                                    </button>
                                </div>
                                <div className="boxpart2">
                                    <button
                                        className="like_btn"
                                        onClick={() => {
                                            if (isliked) {
                                                removelike();
                                            } else {
                                                addlike();
                                                if (isdisliked) {
                                                    setIsdisliked(false);
                                                }
                                            }
                                        }}
                                    >
                                        {isliked ? (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/739/739231.png"
                                                alt="liked"
                                            />
                                        ) : (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                                                alt="like"
                                            />
                                        )}
                                        {formatNumber(watchdata.likes)}
                                    </button>
                                    <button
                                        className="dislike_btn"
                                        onClick={() => {
                                            if (isdisliked) {
                                                setIsdisliked(false);
                                            } else {
                                                setIsdisliked(true);
                                                if (isliked) {
                                                    removelike();
                                                }
                                            }
                                        }}
                                    >
                                        {isdisliked ? (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/880/880613.png"
                                                alt="disliked"
                                            />
                                        ) : (
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/126/126504.png"
                                                alt="dislike"
                                            />
                                        )}
                                    </button>
                                    <button className="share_btn">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/2958/2958783.png"
                                            alt="share"
                                        />
                                        Share
                                    </button>
                                    <button className="download_btn">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/9131/9131795.png"
                                            alt="download"
                                        />
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="description">
                            <p>{watchdata.video_description}</p>
                        </div>
                    </div>
                    <div className="relatedvideos"></div>
                </div>
            ) : (
                <Cardloading page="watch" />
            )}
        </>
    );
};

export default Watch;
