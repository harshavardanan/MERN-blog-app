import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { ENDPOINT } from "../App";
import { UserContext } from "../UserContext";

const PostReader = () => {
  const params = useParams();
  const [postData, setPostData] = useState("");
  //const [isCurrUser, setCurrUser] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { id } = params;
  useEffect(() => {
    fetch(`${ENDPOINT}/post/${id}`).then((res) =>
      res
        .json()
        .then((data) => setPostData(data))
        .catch((err) => console.error("Error fetching data:", err))
    );
  }, [id, postData]);
  console.log(postData);

  const { title, summary, image, content, author, createdAt } = postData;

  const deletePost = () => {};

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
        {userInfo.id === author._id && (
          <div>
            <Link to={`/edit/${postData._id}`}>
              <button>Edit Post</button>
            </Link>
            <button onClick={deletePost}>Delete</button>
          </div>
        )}
        <div class="flex justify-center items-center h-100 w-100">
          <img class="object-cover w-full h-86" src={`${ENDPOINT}/${image}`} />
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
