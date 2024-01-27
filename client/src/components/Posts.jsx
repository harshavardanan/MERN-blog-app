import React, { useState } from "react";
import { formatISO9075 } from "date-fns";

const Posts = ({ title, summary, image, author, createdAt }) => {
  const source = image.split("\\");
  const imageId = source[source.length - 1];
  const { username } = author;
  const toShow = summary.substring(0, 120) + "...";
  const date = new Date();
  // Sat Jan 27 2024 11:56:57 GMT+0530 (India Standard Time)
  console.log(date);
  var heading = "";
  if (title.length > 60) {
    heading = title.substring(0, 60) + "...";
  } else {
    heading = title;
  }
  let abc = `"src={"http://localhost:5000/uploads/"+imageId}"`;

  return (
    <>
      <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          class="object-cover h-48 w-full"
          src={"http://localhost:5000/uploads/" + imageId}
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{heading}</div>
          <p class="text-gray-700 text-base">{toShow}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {username}
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {formatISO9075(new Date(createdAt))}
          </span>
        </div>
      </div>
    </>
  );
};

export default Posts;
