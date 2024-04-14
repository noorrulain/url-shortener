import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
// console.log(apiUrl);

function App() {
  const [url, setUrl] = useState("");
  const [short_url, setShortUrl] = useState(0);
  const myRef = useRef(0);

  useEffect(() => {
    myRef.current.style.display = "none";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(url);
    if (url) {
      await axios
        .post(
          `${apiUrl}/add`,
          { url },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          myRef.current.innerHTML = `Your short URL is: `;
          setShortUrl(res.data);
          console.log(res);
        })
        .catch((err) => {
          myRef.current.innerText = "Enter valid URL.";
        });
    } else {
      myRef.current.innerText = "Enter valid URL.";
    }
    myRef.current.style.display = "block";
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <div className="container">
        <h1>URL Shortener Service</h1>
        <p>
          Make your looooong URLs short, accessible and easily shareable with
          other people.
        </p>
        <form className="form" action="post" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your URL here"
            value={url}
            onChange={handleChange}
            name="url"
          />
          <button type="submit">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      </div>
      <div className="url-container">
        <p ref={myRef}>Your short URL is: </p>
        {short_url > 0 && (
          <a target="_blank" href={`${apiUrl}/url/${short_url}`}>
            {`${apiUrl}` + "/url/" + `${short_url}`}
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
