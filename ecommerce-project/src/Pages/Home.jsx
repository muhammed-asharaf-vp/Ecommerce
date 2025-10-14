import HeroSlider, { CategoryBoxes, FeaturesBar, InstagramFeed, NewArrivals, Newsletter } from '../Component/Design/HomeDesign'
import Navbar from '../Component/Navbar'

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Navbar />
        <HeroSlider />
        <FeaturesBar />
        <CategoryBoxes />
        <NewArrivals />
        <Newsletter />
        <InstagramFeed />
      </main>
    </div>
  )
}