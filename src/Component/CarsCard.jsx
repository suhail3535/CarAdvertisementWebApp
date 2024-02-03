import React from 'react'
import "../Styles/Carspage.css"
const CarsCard = ({id,image,name,brand,year,type,price,address}) => {
  return (
      <div className='cars_card_wrapper' >
          <img src={image} alt="" />
          <h1>{name}</h1>
          <h3>Brand:{brand}</h3>
          <p>Model:{year}</p>
          <p>Type:{type}</p>
          <p>Price:{price}</p>
          <p>Location:{address}</p>


    </div>
  )
}

export default CarsCard