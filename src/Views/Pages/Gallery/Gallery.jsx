import React from 'react'
import "../../../Styles/Gallery.css"
import { gallery } from '../../../data'
const Gallery = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: "bold", marginTop: "6rem" }}>Photos Gallery</h1>
      <div className='photo_gallery_container'>

        {gallery.map((car,index) => {
          return <div key={index}>
            <img src={car.image} alt="car_photo" />
          </div>
        })}


      </div>
    </div>
  )
}

export default Gallery


