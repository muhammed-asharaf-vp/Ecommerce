import React from 'react'
import Navbar from '../Component/Navbar'
import HeroSlider, { CategoryBoxes, FeaturesBar, TopRating } from '../Component/Design/HomeDesign'
import Footer from '../Component/Footer'



function Home() {
  return (
    <div>
    <Navbar/>
    <HeroSlider/>
    <FeaturesBar/>
    <CategoryBoxes />
    </div>
  )
}

export default Home


