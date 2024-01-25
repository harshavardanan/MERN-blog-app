import React, { useState } from 'react';
import axios from 'axios';
import Editor from './Editor';

function TextEditor() {
  const [heading, setHeading] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const createNewPost = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.set('title', heading);
    data.set('summary', summary)
    data.set('content', content)
    data.set('image', image)

    const response = await fetch("http://localhost:5000/post", {
      method: 'POST',
      body: data
    })
    console.log(response.json)
  }

  return (
    <form onSubmit={createNewPost}>
      <input placeholder='Heading' value={heading} onChange={ev => setHeading(ev.target.value)}/>
      <input placeholder='Summary' value={summary} onChange={ev => setSummary(ev.target.value)}/>
      <input type="file" onChange={ev => setImage(ev.target.files[0])} />
      <Editor value={content} content={setContent}/>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* {image && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(image)}
          />
        </div>
      )} */}
      <button type='submit' class="bg-pink-400 block w-full rounded py-4 text-white font-bold shadow">Create Article</button>
    </form>
  );
}

export default TextEditor;
