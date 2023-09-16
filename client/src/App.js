import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import PrivateRoute from "./middleware/PrivateRoute";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import TrainPage from "./components/TrainPage";
import sample from './bgvideo.mp4';
import './index.css';
import logo from './logo_white.png';

function Home() {
  return (
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
      <header>
        {/* <a href="#" className="brand">
          DropModel
        </a> */}
        <img src={logo} alt="Logo" />
        <div className="menu-btn"></div>
        <div className="navigation">
          <div className="navigation-items">
            <a href=""><Link to="/train">Train</Link></a>
            <a href="">Use Models</a>
            <a href="">Your Results</a>
            <a href=""><Link to="/login">Log In</Link></a>
            <a href=""><Link to="/signup">Sign Up</Link></a>
          </div>
        </div>
      </header>

      <section className="home">
      <video className='videoTag' autoPlay loop muted>
        <source src={sample} type='video/mp4' />
      </video>

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
    </body>
  );
}

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route
          path="train"
          element={
            <PrivateRoute>
              <TrainPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
