import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import axios from "axios";
import "./Search.css";

const Search = () => {
    const locationHook = useLocation();
    const [data, setData] = useState("");
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const [page, setPage] = useState(locationHook.pathname);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`${serverurl}/search` + window.location.search)
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.log("Error in fetching: ", error.message);
                });
        };
        fetchData();
    }, [page]);

    useEffect(() => {
        const currentpage = locationHook.pathname;
        setPage(currentpage);
    }, [locationHook]);
    return (
        <>
            {data.videos ? (
                <div className="cards">
                    {data.videos.map((item) => (
                        <Card key={item.video_id} data={item} />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Search;
