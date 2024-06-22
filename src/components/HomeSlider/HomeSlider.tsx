// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import banner from '../../assets/banner.png';
// import bannerMobile from '../../assets/banner_phone.png';
// import bannerTablet from '../../assets/banner_tablet.png';

import banner1 from '../../assets/banner/banner_01.png';
import banner2 from '../../assets/banner/banner_02.png';
import banner3 from '../../assets/banner/banner_03.png';
import banner4 from '../../assets/banner/banner_04.png';
import bannerMobile1 from '../../assets/banner/banner_phone_01.png';
import bannerMobile2 from '../../assets/banner/banner_phone_02.png';
import bannerMobile3 from '../../assets/banner/banner_phone_03.png';
import bannerMobile4 from '../../assets/banner/banner_phone_04.png';
import bannerTablet1 from '../../assets/banner/banner_tablet_01.png';
import bannerTablet2 from '../../assets/banner/banner_tablet_02.png';
import bannerTablet3 from '../../assets/banner/banner_tablet_03.png';
import bannerTablet4 from '../../assets/banner/banner_tablet_04.png';

import { ReactComponent as ArrowLeft } from '../../assets/icons/ArrowLeft.svg';

// eslint-disable-next-line max-len
import { ReactComponent as ArrowRigth } from '../../assets/icons/ArrowRight.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.scss';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

const getBannerSource = (windowWidth: number, slideIndex: number) => {
  if (windowWidth <= 639) {
    switch (slideIndex) {
      case 1:
        return bannerMobile1;
      case 2:
        return bannerMobile2;
      case 3:
        return bannerMobile3;
      case 4:
        return bannerMobile4;
      default:
        return bannerMobile1;
    }
  } else if (windowWidth <= 1199) {
    switch (slideIndex) {
      case 1:
        return bannerTablet1;
      case 2:
        return bannerTablet2;
      case 3:
        return bannerTablet3;
      case 4:
        return bannerTablet4;
      default:
        return bannerTablet1;
    }
  } else {
    switch (slideIndex) {
      case 1:
        return banner1;
      case 2:
        return banner2;
      case 3:
        return banner3;
      case 4:
        return banner4;
      default:
        return banner1;
    }
  }
};

export function HomeSlider() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <div className="main-banner">
        <div className="sw-button-prev button-nav">
          <ArrowLeft />
        </div>

        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
          }}
          navigation={{
            prevEl: '.sw-button-prev',
            nextEl: '.sw-button-next',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="image-slider"
              src={getBannerSource(windowWidth, 1)}
              alt="Banner"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="image-slider"
              src={getBannerSource(windowWidth, 2)}
              alt="Banner"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="image-slider"
              src={getBannerSource(windowWidth, 3)}
              alt="Banner"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="image-slider"
              src={getBannerSource(windowWidth, 4)}
              alt="Banner"
            />
          </SwiperSlide>
        </Swiper>
        <div className="sw-button-next button-nav">
          <ArrowRigth />
        </div>
      </div>
      <div className="swiper-pagination" />
    </>
  );
}
