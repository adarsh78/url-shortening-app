import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [list, setList] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  let obj = {};

  const handleClick = async () => {
    if (!url) {
      console.log("Enter a url please");
      setErrorState(true);
    }
    try {
      const response = await fetch("https://url-shortening-app-770u.onrender.com/shorten", {
      // const response = await fetch("http://localhost:5000/shorten", {
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
      console.log("Original url is: ", url);

      obj.id = new Date().getSeconds() + 1;
      obj.originalUrl = url;
      obj.shortenedUrl = data.result_url;
      console.log(obj);
    } catch (error) {
      console.error("Error:", error);
    }

    if (obj.id && obj.originalUrl && obj.shortenedUrl) {
      list.push(obj);
    }
    console.log(list);
    setUrl("");
  };

  const handleCopyClick = (id) => {
    console.log(id);
    setCopiedId(id);
    list.forEach((item) => {
      if(item.id === id){
        console.log(item.shortenedUrl);
        navigator.clipboard.writeText(item.shortenedUrl);
        setCopiedLink(true);
      }
    })
  
  };

  return (
    <>
      <div className="px-[22px] py-[44px] lg:px-[10rem] lg:py-[3rem]">
        <div className="flex justify-between items-center text-[hsl(257,7%,63%)] font-bold">
          <div className="flex items-center gap-10">
            <img src="./images/logo.svg" alt="logo" />
            <div className="hidden lg:flex gap-8 items-center">
              <span className="text-sm cursor-pointer hover:text-black">
                Features
              </span>
              <span className="text-sm cursor-pointer hover:text-black">
                Pricing
              </span>
              <span className="text-sm cursor-pointer hover:text-black">
                Resources
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-[6px] lg:hidden">
              <div className="hamburger"></div>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
            </div>

            <div className="lg:flex hidden gap-7 items-center text-[hsl(257,7%,63%)] font-bold">
              <span className="text-sm cursor-pointer hover:text-black">
                Login
              </span>
              <span className="text-sm bg-[hsl(180,66%,49%)] py-2 px-4 rounded-full cursor-pointer hover:bg-[hsl(180,37%,75%)] text-white">
                Sign up
              </span>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:flex-row-reverse lg:mt-[4rem] lg:gap-[5rem]">
          <div className="w-[340px] mt-6 lg:w-[900px]">
            <img
              src="./images/illustration-working.svg"
              alt="illustration-working"
            />
          </div>

          <div className="mt-[2.5rem]">
            <h1 className="text-center text-4xl lg:text-[3rem] lg:leading-[3.5rem] lg:text-left font-bold text-[hsl(260,8%,14%)]">
              More than just shorter links
            </h1>
            <p className="text-center text-md lg:text-left font-medium text-[hsl(257,7%,63%)] mt-4">
              Build your brand’s recognition and get detailed insights on how
              your links are performing.
            </p>
            <button className="px-9 py-4 ml-[60px] lg:ml-[0] mt-8 text-[white] font-bold text-xl bg-[hsl(180,66%,49%)] rounded-full cursor-pointer hover:bg-[hsl(180,37%,75%)]">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(0,10%,96%)] mt-[7rem] pb-[14px]">
        <div className="relative bottom-[4.8rem] rounded-md bg-[url('./images/bg-shorten-mobile.svg')] lg:bg-[url('./images/bg-shorten-desktop.svg')] bg-no-repeat bg-contain bg-[left_4rem_bottom_2rem] lg:bg-[left_7rem_bottom_0rem] w-[325px] lg:w-[1070px] mx-auto p-5 lg:p-10 bg-[hsl(257,27%,26%)] flex flex-col lg:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Shorten a link here..."
            className={`w-[100%] p-[14px] rounded-md ${
              errorState ? "border-2 border-[hsl(0,87%,67%)]" : ""
            }`}
            value={url}
            onChange={handleChange}
          />
          {errorState && (
            <p className="absolute lg:top-[6rem] text-[10px] lg:left-10 left-5 text-[hsl(0,87%,67%)] italic lg:text-sm">
              please add a link
            </p>
          )}
          <button
            onClick={handleClick}
            className="w-[100%] lg:w-[200px] bg-[hsl(180,66%,49%)] p-[14px] text-white outline-none border-none rounded-md font-bold cursor-pointer hover:bg-[hsl(180,37%,75%)]"
          >
            Shorten It!
          </button>
        </div>

        {list.map((li) => (
          <div
            key={li.id}
            className="flex flex-col divide-y divide-solid lg:divide-y-0 lg:flex-row items-center bg-white w-[325px] lg:w-[1070px] mx-auto gap-[0.5rem] lg:gap-[4rem] p-4 rounded-md mb-4"
          >
            <p className="truncate text-[hsl(257,27%,26%)] w-[15.7rem] lg:w-full">{li.originalUrl}</p>
            <div className="flex flex-col lg:flex-row items-center gap-5">
              <p className={`${copiedId === li.id ? "bg-[hsl(180,29%,84%)] py-[2px] px-[8px] rounded-sm " : ""}text-[hsl(180,66%,49%)] mt-2 lg:mt-0`}>{li.shortenedUrl}/</p>
              <button 
              onClick={() => handleCopyClick(li.id)}
              className={`${copiedId === li.id ? "bg-[hsl(257,27%,26%)] hover:bg-[hsl(258,62%,78%)]" : "bg-[hsl(180,66%,49%)] hover:bg-[hsl(180,37%,75%)]"} text-white px-5 py-1 w-[100%] rounded-md cursor-pointer`}>
                {copiedId === li.id ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}

        <div className="mt-[6rem]">
          <h2 className="text-center text-2xl lg:text-3xl font-bold text-[hsl(260,8%,14%)]">
            Advanced Statistics
          </h2>
          <p className="text-center lg:w-[30rem] lg:mx-auto text-md font-medium text-[hsl(257,7%,63%)] mt-4">
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:px-[10rem] lg:py-[3rem] gap-[5rem] lg:gap-[2rem] my-[5rem]">
          <div className="card lg:w-[400px] lg:text-left">
            <div className="image-circle lg:left-[15px]">
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

          <div className="card lg:w-[400px] lg:text-left">
            <div className="image-circle lg:left-[15px]">
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

          <div className="card lg:w-[400px] lg:text-left">
            <div className="image-circle lg:left-[15px]">
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

      <div className="bg-[hsl(257,27%,26%)] bg-[url('./images/bg-boost-mobile.svg')] lg:bg-[url('./images/bg-shorten-desktop.svg')] lg:bg-[left_4rem_top_3rem] bg-no-repeat bg-contain text-center flex flex-col gap-5 py-[5rem]">
        <h4 className="text-white text-2xl font-bold lg:text-3xl">
          Boost your links today
        </h4>
        <button className="w-[50%] lg:w-[12%] mx-auto py-3 text-[white] font-bold text-md bg-[hsl(180,66%,49%)] rounded-full cursor-pointer hover:bg-[hsl(180,37%,75%)]">
          Get Started
        </button>
      </div>

      <div className="bg-[hsl(260,8%,14%)] flex flex-col items-center py-[3rem] lg:px-[10rem] lg:py-[3rem] lg:flex-row lg:items-start lg:gap-[4rem]">
        <div className="lg:w-[28%]">
          <img src="./images/logo.svg" alt="logo" className="mb-6 lg:mt-5" />
        </div>

        <div className="flex flex-col gap-2 text-center lg:text-left mb-8 text-[hsl(0,0%,75%)]">
          <h5 className="text-white font-bold text-sm my-4">Features</h5>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">
            Link Shortening
          </p>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Branded Links</p>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Analytics</p>
        </div>

        <div className="flex flex-col gap-2 text-center lg:text-left mb-8 text-[hsl(0,0%,75%)]">
          <h5 className="text-white font-bold text-sm my-4">Resources</h5>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Blog</p>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Developers</p>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Support</p>
        </div>

        <div className="flex flex-col gap-2 text-center lg:text-left mb-8 text-[hsl(0,0%,75%)]">
          <h5 className="text-white font-bold text-sm my-4">Company</h5>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">About</p>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Our Team</p>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Careers</p>
          <p className="text-sm hover:text-[hsl(180,66%,49%)]">Contact</p>
        </div>

        <div className="flex gap-6 items-center mt-3">
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
