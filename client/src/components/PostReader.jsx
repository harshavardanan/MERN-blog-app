import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const PostReader = () => {
  const params = useParams();
  const [postData, setPostData] = useState("");
  const { id } = params;
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`).then((res) =>
      res.json().then((data) => setPostData(data))
    );
  }, []);
  console.log(postData);
  const { title, summary, image, content, author, createdAt } = postData;

  if (!postData) return <div>Loading...</div>;

  return (
    <div class="container py-12 mx-auto px-4 md:px-12">
      <div>
        <h1 className="text-5xl font-black-900 text-center mx-1 text-left">
          {title}
        </h1>
        <p className="text-base text-center my-3">
          Created by {author.username} at {formatISO9075(new Date(createdAt))}
        </p>
        <div class="flex justify-center items-center h-100 w-100">
          <img
            class="object-cover w-full h-86"
            src={"http://localhost:5000/" + image}
          />
        </div>
        <h2 className="text-2xl my-3">{summary}</h2>
        <div
          className="text-xl font-black-900 justify-center mx-1"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default PostReader;
