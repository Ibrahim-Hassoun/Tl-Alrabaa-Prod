import React from 'react'
import Hero from '../../layouts/Hero/Hero'
import ProductSection from '../../components/ProductSection/ProductSection'
import TobaccoFilters from '../../components/ProductSection/TobaccoFilters'
import ShishaIntro from '../../components/ShishaIntro/ShishaIntro'
import ShishaFilters from '../../components/ProductSection/ShishaFilters'
import Footer from '../../layouts/Footer/Footer'

const Home = () => {
  return (
    <>
        <Hero/>
        <ProductSection
        id="tobacco"
        title="TOBACCO"
        category="tobacco"
        renderSidebar={({ filters, setFilters }) => (
            <TobaccoFilters filters={filters} setFilters={setFilters} />
        )}
        />
        <ShishaIntro/>
        <ProductSection
        id="shisha"
        title="SHISHA"
        category="shisha"
        renderSidebar={({ filters, setFilters }) => (
            <ShishaFilters filters={filters} setFilters={setFilters} />
        )}
        />
        <Footer/>
    </>
  )
}

export default Home