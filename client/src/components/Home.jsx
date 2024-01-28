import React, { useEffect, useState } from "react";
import Posts from "./Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post").then((res) => {
      res.json().then((data) => {
        setPosts(data);
      });
    });
  }, []);

  return (
    <>
      <div class="container py-12 mx-auto px-4 md:px-12">
        <div class="grid grid-cols-3 gap-4">
          {posts.map((data) => (
            <div key={data._id}>
              <Posts {...data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
