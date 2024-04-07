import { useState } from "react";
import axios from "axios";
//import "dotenv/config";

//const apiUrl = "http://localhost:3000";

function App() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(url);
    await axios
      .post(
        "http://localhost:3000/add",
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
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
  );
}

export default App;
