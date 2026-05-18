import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import CategoryBar from '../components/CategoryBar'
import AutoCarousel from '../components/AutoCarousel'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState("For You");
    const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
    {/* <Navbar/> */}
    <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    {/* <CategoryBar/> */}
    <CategoryBar 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />
    <AutoCarousel/>
    {/* <ProductGrid/> */}
    <ProductGrid selectedCategory={selectedCategory}
                 setSelectedCategory={setSelectedCategory}
                 searchQuery={searchQuery}
                 setSearchQuery={setSearchQuery}
          />
          <Footer/>
    </>
  )
}
