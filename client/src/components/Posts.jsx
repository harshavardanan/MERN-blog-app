import React from 'react'
import img from '../assets/swag_cat.jpg'

const Posts = () => {
  return (
    <div className='flex '>
        <div>
            <img src="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top" alt="" srcset="" className="object-cover h-48 w-96 ..."/>
        </div>
      <div>
        <h2 className='decoration-double'>Image of a Cat</h2>
      <h3>Created by Harshavardanan @12-12-12</h3>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, natus explicabo reiciendis quas quaerat doloremque id porro laudantium, officiis quo assumenda fuga? Vitae fugit, repudiandae doloremque odit optio impedit libero.</p>
      </div>
    </div>
  )
}

export default Posts
