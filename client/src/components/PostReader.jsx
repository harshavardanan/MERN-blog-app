import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { ENDPOINT } from "../App";
import { UserContext } from "../UserContext";

const PostReader = () => {
  const params = useParams();
  const [postData, setPostData] = useState("");
  const navigate = useNavigate();
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

  const deletePost = () => {
    var answer = window.confirm("Are you sure to delete post?");
    if (answer) {
      fetch(`${ENDPOINT}/post/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            navigate("/");
          } else {
            console.error("Failed to delete post");
          }
        })
        .catch((err) => {
          console.error("Cannot delete post", err);
        });
    } else {
      return null;
    }
  };

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
          <div class="flex justify-center items-center">
            <div class="card-body p-4">
              <div class="btn-group">
                <Link to={`/edit/${postData._id}`}>
                  <button
                    type="button"
                    class="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
                  >
                    Edit Article
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  class="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 text-purple-700 hover:text-white font-normal py-2 px-4 rounded"
                >
                  Delete Article
                </button>
              </div>
            </div>
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
