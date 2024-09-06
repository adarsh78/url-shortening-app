import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {

// const [url, setUrl] = useState("");

// const handleChange = (e) => {
//   setUrl(e.target.value);
// }

// const shortenUrl = async (longURL) => {
//   try {
//     const response = await fetch(`https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({ url: longURL }).toString(),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log("Shortened URL is: ", data);
//     return data;
//   } catch (error) {
//     console.error("Error in fetching data: ", error);
//     return null;
//   }
// };

const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      console.log("Shortened URL:", data.result_url);
    } catch (error) {
      console.error("Error:", error);
    }
  };


// const handleClick = async () => {
//  const shortenedURL = await shortenUrl(url);
//   console.log("url is: ", url);
//   if(shortenedURL) {
//     console.log("Shortened url is: ", shortenedURL );
//   }
// }




  return (
    <>
      <div className="px-[22px] py-[44px]">
        <div className="flex justify-between items-center">
          <img src="./images/logo.svg" alt="logo" />
          <div>
            <div className="flex flex-col gap-[6px]">
              <div className="hamburger"></div>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
            </div>
          </div>
        </div>

        <div className="w-[340px] mt-6">
          <img
            src="./images/illustration-working.svg"
            alt="illustration-working"
          />
        </div>

        <div className="mt-[2.5rem]">
          <h1 className="text-center text-4xl font-bold text-[hsl(260,8%,14%)]">
            More than just shorter links
          </h1>
          <p className="text-center text-md font-medium text-[hsl(257,7%,63%)] mt-4">
            Build your brand’s recognition and get detailed insights on how your
            links are performing.
          </p>
          <button className="px-9 py-4 ml-[60px] mt-8 text-[white] font-bold text-xl bg-[hsl(180,66%,49%)] rounded-full">
            Get Started
          </button>
        </div>
      </div>

      <div className="bg-[hsl(0,10%,96%)] mt-[7rem] pb-[14px]">
        <div className="relative bottom-[4.8rem] rounded-md w-[325px] mx-auto p-5 bg-shorten-mobile bg-[hsl(257,27%,26%)] flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Shorten a link here..."
            className="w-[100%] p-[14px] rounded-md"
            value={url}
            onChange={handleChange}
          />
          <button 
          onClick={handleClick}  
          className="w-[100%] bg-[hsl(180,66%,49%)] p-[14px] text-white outline-none border-none rounded-md font-bold ">
            Shorten It!
          </button>
        </div>

        <div>
          <h2 className="text-center text-2xl font-bold text-[hsl(260,8%,14%)]">
            Advanced Statistics
          </h2>
          <p className="text-center text-md font-medium text-[hsl(257,7%,63%)] mt-4">
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
        </div>

        <div className="flex flex-col gap-[5rem] my-[5rem]">
          <div className="card">
            <div className="image-circle">
              <img
                src="./images/icon-brand-recognition.svg"
                alt="icon-brand-recognition"
              />
            </div>
            <h3 className="text-[hsl(260,8%,14%)] text-xl font-bold">
              Brand Recognition
            </h3>
            <p className="text-[hsl(257,7%,63%)] text-sm leading-6 mt-3">
              Boost your brand recognition with each click. Generic links don’t
              mean a thing. Branded links help instil confidence in your
              content.
            </p>
          </div>

          <div className="card">
            <div className="image-circle">
              <img
                src="./images/icon-detailed-records.svg"
                alt="icon-detailed-records"
              />
            </div>
            <h3 className="text-[hsl(260,8%,14%)] text-xl font-bold">
              Detailed Records
            </h3>
            <p className="text-[hsl(257,7%,63%)] text-sm leading-6 mt-3">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>

          <div className="card">
            <div className="image-circle">
              <img
                src="./images/icon-fully-customizable.svg"
                alt="icon-fully-customizable"
              />
            </div>
            <h3 className="text-[hsl(260,8%,14%)] text-xl font-bold">
              Fully Customizable
            </h3>
            <p className="text-[hsl(257,7%,63%)] text-sm leading-6 mt-3">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(257,27%,26%)] boost-image text-center flex flex-col gap-5 py-[5rem]">
        <h4 className="text-white text-2xl font-bold">Boost your links today</h4>
        <button className="w-[50%] mx-auto py-3 text-[white] font-bold text-md bg-[hsl(180,66%,49%)] rounded-full">Get Started</button>
      </div>

      <div className="bg-[hsl(260,8%,14%)] flex flex-col items-center py-[4rem]">
        <img src="./images/logo.svg" alt="logo" />

        <div>
          <h5>Features</h5>
          <p>Link Shortening</p>
          <p>Branded Links</p>
          <p>Analytics</p>
        </div>

        <div>
          <h5>Resources</h5>
          <p>Blog</p>
          <p>Developers</p>
          <p>Support</p>
        </div>

        <div>
          <h5>Company</h5>
          <p>About</p>
          <p>Our Team</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>

        <div>
          <img src="./images/icon-facebook.svg" alt="icon-facebook" />
          <img src="./images/icon-twitter.svg" alt="icon-twitter" />
          <img src="./images/icon-pinterest.svg" alt="icon-pinterest" />
          <img src="./images/icon-instagram.svg" alt="icon-instagram" />
        </div>

      </div>
    </>
  );
};

export default App;
