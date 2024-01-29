import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import { ENDPOINT } from "../App";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    fetch(`${ENDPOINT}/post`).then((res) => {
      res.json().then((data) => {
        setPosts(data);
      });
    });
  }, [posts]);

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
