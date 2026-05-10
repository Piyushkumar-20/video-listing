/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest",
          { method: "GET", headers: { accept: "application/json" } },
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const result = await response.json();
        setPlaylist(result.data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, []);

  return (
    <div className="container">
      <h1> Playlist Listing Interface </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {playlist.map((videoObj) => {
            const { items } = videoObj;
            const { snippet, statistics, id } = items;

            return (
              <div key={id} className="playlist-card">
                <img
                  src={snippet.thumbnails?.medium?.url}
                  alt={snippet.title}
                  width="200"
                />
                <h3>{snippet.title}</h3>
                <p>Channel: {snippet.channelTitle}</p>
                <p>Views: {parseInt(statistics.viewCount).toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default App;
