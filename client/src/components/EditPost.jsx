import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Editor from "./Editor";
import { ENDPOINT } from "../App";

const EditPost = () => {
  const params = useParams();
  const { id } = params;
  const [heading, setHeading] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${ENDPOINT}/post/${id}`).then((res) =>
      res.json().then((post) => {
        setHeading(post.title);
        setSummary(post.summary);
        setContent(post.content);
      })
    );
  }, []);
  const editPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", heading);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (image?.[0]) {
      data.set("image", image?.[0]);
    }
    console.log("data", data);
    const response = await fetch(`${ENDPOINT}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex">
        <form onSubmit={editPost}>
          <label
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="application-link"
          >
            Heading
          </label>
          <input
            class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
            id="application-link"
            type="text"
            placeholder="Heading...."
            value={heading}
            onChange={(ev) => setHeading(ev.target.value)}
          ></input>
          <label
            class="uppercase tracking-wide text-black text-xs font-bold mb-2"
            for="application-link"
          >
            Summary
          </label>
          <input
            class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
            id="application-link"
            type="text"
            placeholder="Heading...."
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
          ></input>
          <input
            class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded mb-4"
            type="file"
            onChange={(ev) => setImage(ev.target.files)}
          />
          <Editor value={content} content={setContent} />
          {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}

          <button
            type="submit"
            class="bg-pink-400 block w-full rounded py-4 text-white font-bold shadow my-4"
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
