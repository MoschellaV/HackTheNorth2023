import React from "react";
import { Link } from "react-router-dom";
import logo from "../../DropModel-T.png";
import sample from "../../bgvideo.mp4";
import Navbar from "../Navbar";
import { useUserContext } from "../../context/UserContext";

export default function HomePage() {
    return (
        <>
            <video className="videoTag" autoPlay loop muted>
                <source src={sample} type="video/mp4" />
            </video>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <Navbar />

            <section className="home">
                <div className="content active">
                    <h1>
                        Welcome To
                        <br />
                        <span>DropModel</span>
                    </h1>

                    <p>
                        Transform your data into intelligence with DropModel's cutting-edge platform. Simply upload your
                        dataset, select your prediction variable, and watch as your machine model is created
                        automatically.
                    </p>
                    <Link className="rounded" to="/train">
                        Get Started →
                    </Link>
                </div>

                <div className="media-icons">
                    <a href="">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
            </section>
        </>
    );
}
