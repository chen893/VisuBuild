import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// const items =
interface CarouselItem {
  imageUrl: string
  link: string
}

interface CarouselProps {
  items: CarouselItem[]
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const { items } = props
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <a href={item.link}>
              <img src={item.imageUrl} alt="" />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel
