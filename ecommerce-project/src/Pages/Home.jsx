import React from 'react'
import Footer from '../Component/Footer'
import Navbar from '../Component/Navbar'
import HeroSlider, { CategoryBoxes, FeaturesBar, TopRating } from '../Component/Design/HomeDesign'



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


