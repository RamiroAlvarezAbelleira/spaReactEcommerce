import Carousel from 'react-bootstrap/Carousel';
import slider1 from '../../assets/images/slider-1.jpg'
import slider2 from '../../assets/images/slider-2.jpg'

function HomeCarousel() {
  return (
    <Carousel className='mx-0 px-0'>
      <Carousel.Item className='mx-0 px-0'>
        <img
          className="d-block w-100"
          src={slider1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='mx-0 px-0'>
        <img
          className="d-block w-100"
          src={slider2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;