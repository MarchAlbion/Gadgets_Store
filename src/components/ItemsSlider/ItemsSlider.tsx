// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import './ItemsSlider.scss';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ProductCard } from '../ProductCard/ProductCard';
import { FC } from 'react';
import { Product } from '../../pages/Cart/type/ProductType';

interface ItemsSliderProps {
  prevButtonClass: string;
  nextButtonClass: string;
  arrayToMap: Product[];
  withDiscount: boolean | undefined;
}

export const ItemsSlider: FC<ItemsSliderProps> = ({
  prevButtonClass,
  nextButtonClass,
  arrayToMap,
  withDiscount,
}) => {
  return (
    <div className="itemsSlider-wrapper">
      <Swiper
        slidesPerView={4}
        slidesPerGroup={1}
        spaceBetween={14}
        loop={true}
        navigation={{
          prevEl: `.${prevButtonClass}`,
          nextEl: `.${nextButtonClass}`,
        }}
        modules={[Autoplay, Navigation]}
      >
        {arrayToMap?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="productCard_wrapper">
              <ProductCard product={item} IsDiscount={withDiscount} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
