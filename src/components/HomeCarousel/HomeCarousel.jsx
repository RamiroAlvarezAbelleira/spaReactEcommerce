import Carousel from 'react-bootstrap/Carousel';
import slider1 from '../../assets/images/slide-test1.jpg'
import slider2 from '../../assets/images/slide-test2.jpg'
import slider3 from '../../assets/images/slide-test.jpg'

function HomeCarousel() {
  return (
    <Carousel className='mx-0 px-0'>
      <Carousel.Item className='mx-0 px-0'>
        <img
          className="d-block w-100"
          src={slider1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className='mx-0 px-0'>
        <img
          className="d-block w-100"
          src={slider2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item className='mx-0 px-0'>
        <img
          className="d-block w-100"
          src={slider3}
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;