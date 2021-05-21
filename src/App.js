import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [APIData, setAPIData] = useState({}); // Holds the information acquired from the HTTP request.
  const [requestSucceeded, setRequestSucceeded] = useState(false); // True if request succeeded; False if it failed.
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=vg6XTR2UYdh7TyS0NnolZeCeJd3mlQdeH6Leb6sW"; // Nasa APOD url with API key.

  /**
   * Performs an HTTP request to NASA's APOD API using Axios.
   */
  useEffect(() => {
    axios
      .get(url) // .get() returns a Promise, so we can use .then() and .catch().
      .then((response) => {
        setRequestSucceeded(true);
        setAPIData({
          title: response.data.title, // Title of the image.
          imageSrc: response.data.url, // Source for the image.
          explanation: response.data.explanation, // Description of the image.
          date: response.data.date, // Date the image was posted.
          // Image credit; assigned to "Unknown" if not included.
          copyright:
            response.data.copyright === undefined
              ? "Unknown"
              : response.data.copyright,
        });
      })
      .catch((error) => {
        setRequestSucceeded(false); // Since there was an error, set this state to false.
        console.log("Request Failed: ", error);
      });
  }, []);

  if (!requestSucceeded) {
    // Content to display if the request failed.
    return (
      <div className='container'>
        <h1 className='title'>NASA's Astronomy Picture of the Day!</h1>
        <h2>No picture was posted today. Check back tomorrow!</h2>
      </div>
    );
  } else {
    // Main content.
    return (
      <div className='container'>
        <h1 className='title'>NASA's Astronomy Picture of the Day!</h1>
        <h2 className='header'>{APIData.title}</h2>
        <div id='description'>
          <img
            src={APIData.imageSrc}
            alt={"APOD"}
            height={600}
            width={600}
            align={"left"}
          />
          <div className='paragraph'>
            <p>{APIData.explanation}</p>
            <p>
              <i>Posted {APIData.date}</i>
            </p>
            <p>
              <b>
                <i>Copyright {APIData.copyright}</i>
              </b>
            </p>
          </div>
        </div>
        <hr className='separator' />
      </div>
    );
  }
}
