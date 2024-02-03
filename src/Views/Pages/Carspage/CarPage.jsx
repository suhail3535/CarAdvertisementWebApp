import React, { useEffect, useState } from 'react'
import "../../../Styles/Carspage.css"
import axios from "axios";
import CarsCard from '../../../Component/CarsCard';
const CarPage = () => {
  const [cars, setCars] = useState([])

  const GetCarDetails = async () => {
    try {
      const responce = await axios.get("https://shy-puce-lemming-tux.cyclic.app/cars")
      setCars(responce.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetCarDetails()
  }, [])
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "1.8rem",marginTop:"6rem",fontWeight:"bold" }}>All Available Cars</h1>
      <div className='car_details_wrapper'>

        {cars.map((car, index) => {
          return <CarsCard key={index} {...car} />
        })}

      </div>
    </div>
  )
}

export default CarPage