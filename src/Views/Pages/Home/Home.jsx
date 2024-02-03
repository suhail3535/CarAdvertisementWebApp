import React from 'react'

import Gallery from '../Gallery/Gallery'
import Contact from '../Contact/Contact'
import CarPage from '../Carspage/CarPage'
import Header from '../../../Component/Header'




const Home = () => {
  return (
    <div>
      <Header />
      <CarPage />

      <Gallery />
      <Contact />


    </div>
  )
}

export default Home