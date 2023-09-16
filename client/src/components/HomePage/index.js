import React from "react";
import { Link } from "react-router-dom";
import logo from "../../DropModel-T.png";
import sample from "../../bgvideo.mp4";
import Navbar from "../Navbar";

export default function HomePage() {
    return (
        <>
            <video className='videoTag' autoPlay loop muted>
            <source src={sample} type='video/mp4' />
            </video>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <Navbar />
            {/* <header className="flex flex-row transparent fixed justify-between w-screen"> */}
            {/* <a href="#" className="brand">
                DropModel
            </a> */}
            {/* <div className="flex flex-row justify-center items-center">
                <img src={logo} alt="Logo" className="w-14 opacity-100" />
                <div className="flex flex-row font-semibold pl-3 text-2xl">
                <a>Drop</a>
                <p>Model</p>
                </div>
    
            </div> */}
            {/* <div className="navigation">
                <div className="navigation-items">
                <a href=""><Link to="/train">Train</Link></a>
                <a href="">Use Models</a>
                <a href="">Your Results</a>
                <a href=""><Link to="/login">Log In</Link></a>
                <a href=""><Link to="/signup">Sign Up</Link></a>
                </div>
            </div>
            </header> */}
    
            <section className="home">
    
            <div className="content active">
                <h1>
                Welcome To
                <br />
                <span><keyword className = "keyword">Drop</keyword>Model</span>
                </h1>
                <p>Transform your data into intelligence with DropModel's cutting-edge platform. 
                Simply upload your dataset, select your prediction variable, and watch as your machine model is created automatically. 
                </p>
                <Link className = "rounded" to="/train">Get Started →</Link>
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
    )
}
