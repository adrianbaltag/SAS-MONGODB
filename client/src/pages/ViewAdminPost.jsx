import React from "react";
import Navbar from "../components/Navbar";
import BtnPost from "../components/BtnPost";
import left from '../assets/images/left.jpg';
import right from '../assets/images/right.jpg';
import front from '../assets/images/front.jpg';
import back from '../assets/images/back.jpg';

import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

//admin/?left
function ViewAdminPost() {
    const DUMMY_POSTS = [
        {
            id: "left",
            location: 'location1',
            description: 'description1',
        },
        {
            id: "right",
            location: 'location2',
            description: 'description2'
        },
        {
            id: "front",
            location: 'location3',
            description: 'description3'
        },
        {
            id: "back",
            location: 'location4',
            description: 'description4'
        },
    ];

    const [postObject, setPostObject] = useState(null);
    const [id, setId] = useState(null)
    const [searchParams] = useSearchParams();
    const updateSomething = () => {
        setId(searchParams.get("id"))
        setPostObject(DUMMY_POSTS.find((obj) => obj.id == id))

    }

    const memoizedValue = useMemo(() => updateSomething(searchParams.get("id")), [searchParams]);
    const prevMemoizedValue = useRef(null);
    //single post
    useEffect(() => {

        if (memoizedValue !== prevMemoizedValue) {
            updateSomething();
        }
        prevMemoizedValue.current = memoizedValue;
    }, [memoizedValue]);


    return (
        <>
            <Navbar />
            <h1 style={{ margin: "0 auto" }}>Recommended post</h1>
            <div
                className="wrapper"
                style={{
                    border: "1px solid white",
                    width: "60%",
                    height: "40em",
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    alignItems: "center",
                    marginTop: "5em",
                }}
            >
                <div
                    className="card"
                    style={{
                        border: "1px solid red",
                        height: "20em",
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "3em",
                        margin: "0 auto",
                        marginTop: "5em",
                    }}
                >
                    <div className="container-img">

                    </div>
                    <h3 style={{ color: "black" }}>
                        {postObject && postObject.location}
                    </h3>
                    <h5 style={{ color: "black" }}>
                        {postObject && postObject.description}
                    </h5>

                </div>

            </div>

        </>
    );
}

export default ViewAdminPost;
