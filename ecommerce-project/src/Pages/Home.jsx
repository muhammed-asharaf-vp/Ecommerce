import React from 'react'
import Navbar from '../Component/Navbar'
import HeroSlider, { CategoryBoxes, FeaturesBar,  } from '../Component/Design/HomeDesign'




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


