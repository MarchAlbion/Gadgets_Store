import { useSelector } from 'react-redux';
import { selectPhones, selectTablets, selectAccessories } from '../redux';
import { Product } from '../types/Product';

const useProductsByType = (type: string): Product[] => {
  const phones = useSelector(selectPhones);
  const tablets = useSelector(selectTablets);
  const accessories = useSelector(selectAccessories);

  switch (type.toLowerCase()) {
    case 'phones':
      return phones;
    case 'tablets':
      return tablets;
    case 'accessories':
      return accessories;
    default:
      return [];
  }
};

export default useProductsByType;
