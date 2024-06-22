/* eslint-disable max-len */
import { useEffect, useState } from 'react';
// import iconLeft from '../../assets/icons/ArrowLeft.svg';
import { ReactComponent as IconFavourite } from '../../assets/icons/Favourites.svg';
import { ReactComponent as IconFavouriteActive } from '../../assets/icons/Favourites Filled.svg';
import styles from './ItemDetailsPage.module.scss';
import classNames from 'classnames';
import { Button } from '../../UI';
import { ProductParams } from '../../components/ProductCard/ProductParams/ProductParams';
import { makeColorDarker } from '../../utils/makeColorDarker';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './ProductGallery.scss';
import { SingleParam } from '../../components/ProductCard/ProductParams/SingleParam/SingleParam';
import getHexFromColorName from '../../utils/LiteralColorToHex';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ProductDetail } from '../../types/ProductDetail';
import { FullPrice } from '../../components/ProductCard/PriceWithoutDiscount/FullPrice';
import { BreadcrumbsComponent } from '../../UI/Breadcrumbs/Breadcrumbs';
import { Breadcrumb } from '../../types/Breadcrumb';
import { PATHS } from '../../constants';
import { SliderSection } from '../../components';
import { Product } from '../../types/Product';
import { useSelector } from 'react-redux';
import {
  addToCart,
  addToFavorites,
  removeFromCart,
  removeFromFavorites,
  selectAccessories,
  selectAllProducts,
  selectCart,
  selectPhones,
  selectTablets,
  selectfavorites,
} from '../../redux';
import { getLimitedCategoryProduct } from '../../services/filteForSliders';
import { createCustomProductId } from '../../utils/createCustomProductId';
import { getCategoryApiEndpoint } from '../../utils/getCategoryApiEndpoint';
import { BackButton } from '../../UI/Backbutton/BackButton';
import { useTranslation } from 'react-i18next';
import { getColorWithoutSpaces } from '../../utils/getColorWithoutSpaces';
import { getCategorName } from '../../utils/getCategorName';
import Loader from '../../components/Loader/Loader';
import pageNotFound from '../../assets/product_not_found.png';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { motion } from 'framer-motion';

type Orientation = 'bottom' | 'left';

const defaultProduct: ProductDetail = {
  id: '',
  category: '',
  namespaceId: '',
  name: '',
  capacityAvailable: ['38mm', '42mm'],
  capacity: '',
  priceRegular: 0,
  priceDiscount: 0,
  colorsAvailable: ['black'],
  color: 'black',
  images: [''],
  description: [
    {
      title: '',
      text: '',
    },
  ],
  screen: '',
  resolution: '',
  processor: '',
  ram: '',
  cell: [''],
  camera: '',
  zoom: '',
};
const defaultProducts = [defaultProduct];

export const ItemDetailsPage = () => {
  const [productVariations, setProductVariations] =
    useState<ProductDetail[]>(defaultProducts);
  const [product, setProduct] = useState<ProductDetail>(defaultProduct);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [color, setColor] = useState(product.color);
  const [capacity, setCapacity] = useState(product.capacity);
  const [orientation, setOrientation] = useState<Orientation>('bottom');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  // const navigate = useNavigate();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const URL = getCategoryApiEndpoint(pathname, '/react_phone-catalog/api/');

  /* create products for slider */

  const phones = useSelector(selectPhones);
  const tablets = useSelector(selectTablets);
  const accessories = useSelector(selectAccessories);
  const cart = useSelector(selectCart);
  const favourites = useSelector(selectfavorites);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productVariations]);

  useEffect(() => {
    setOtherProducts(() =>
      getLimitedCategoryProduct(pathname, 8, {
        phones,
        tablets,
        accessories,
      }),
    );
  }, [pathname, phones, tablets, accessories]);

  /* Create product ID */

  const allProducts = useSelector(selectAllProducts);
  const newCustomProductId = createCustomProductId(allProducts, product, 8, 5);

  /* find product */

  const { phoneID, tabletID, accessoriesID } = useParams<{
    phoneID?: string;
    tabletID?: string;
    accessoriesID?: string;
  }>();

  const categoryPath = getCategorName(phoneID, tabletID, accessoriesID);

  useEffect(() => {
    setLoader(true);
    fetch(URL)
      .then(res => res.json())
      .then((data: ProductDetail[]) => {
        const foundProduct = data.find(
          prod =>
            prod.id === phoneID ||
            prod.id === tabletID ||
            prod.id === accessoriesID,
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setColor(foundProduct.color);
          setCapacity(foundProduct.capacity);

          const collectionProducts = data.filter(
            item => item.namespaceId === foundProduct.namespaceId,
          );

          setProductVariations(collectionProducts);
        }

        setLoader(false);
      })
      .catch(() => setError(true));
  }, [URL, phoneID, tabletID, accessoriesID]);

  const handleChangeOptions = (newColor = color, newCapacity = capacity) => {
    const foundProduct = productVariations.find(
      item => item.color === newColor && item.capacity === newCapacity,
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setColor(foundProduct.color);
      setCapacity(foundProduct.capacity);

      const newUrl = `${categoryPath}/${foundProduct.id}`;

      navigate(newUrl);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const size = window.innerWidth;

      if (size > 750) {
        setOrientation('left');
      } else {
        setOrientation('bottom');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* make images for gallery */

  const productImage = (): { original: string; thumbnail: string }[] => {
    return product.images.map(image => ({
      original: image,
      thumbnail: image,
      originalHeight: 450,
      thumbnailHeght: 100,
    }));
  };

  const images = productImage();

  /* breadcrumbs */

  const generateBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [];

    if (product.category === 'phones') {
      breadcrumbs.push({ label: 'Phones', path: PATHS.PHONES.LIST });
      breadcrumbs.push({
        label: product.name,
        path: PATHS.PHONES.DETAILS.replace(':phoneID', product.id),
      });
    } else if (product.category === 'tablets') {
      breadcrumbs.push({ label: 'Tablets', path: PATHS.TABLETS.LIST });
      breadcrumbs.push({
        label: product.name,
        path: PATHS.TABLETS.DETAILS.replace(':tabletID', product.id),
      });
    } else if (product.category === 'accessories') {
      breadcrumbs.push({ label: 'Accessories', path: PATHS.ACCESSORIES.LIST });
      breadcrumbs.push({
        label: product.name,
        path: PATHS.ACCESSORIES.DETAILS.replace(':accessoriesID', product.id),
      });
    }

    return breadcrumbs;
  };

  const breadcrumbsData = generateBreadcrumbs();

  /* Add to card, add to favourites */

  const dispatch = useAppDispatch();

  const isInCart = cart.some(
    itemInCart => itemInCart.cartItemId === product?.id,
  );
  const isInFavorites = favourites.includes(product.id);

  const handleToggleToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart({ cartItemId: product.id, quantity: 1 }));
    }
  };

  const handleToggleToFavorites = () => {
    if (isInFavorites) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
  };

  const galleryAnimation = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.3 },
  };

  return (
    <>
      <div className={styles.page__container}>
        <div className={styles.breadcrumbs}>
          <BreadcrumbsComponent breadcrumbs={breadcrumbsData} />
        </div>
        <BackButton />
        {error ? (
          <div className={styles.error}>
            <h2>Product not found :(</h2>
            <img src={pageNotFound} alt="product not found" />
          </div>
        ) : (
          <div className={styles.product}>
            <h3 className={styles.title}>{product.name}</h3>
            <div className={styles.product}>
              <motion.div
                className={styles.product__gallery}
                {...galleryAnimation}
              >
                {loader ? (
                  <div className={styles.loader}>
                    <Loader />
                  </div>
                ) : (
                  <ImageGallery
                    items={images}
                    showNav={false}
                    thumbnailPosition={orientation}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    lazyLoad={true}
                  />
                )}
              </motion.div>
              <div className={styles.product__settings}>
                <div className={styles.colors}>
                  <div className={styles.colors__wrapper}>
                    <p>{t('detailProduct.availableColors')}</p>
                    <div className={styles.product__id}>
                      {t('detailProduct.id')}: {newCustomProductId}
                    </div>
                  </div>
                  <ul className={styles.colors__list}>
                    {product.colorsAvailable.map(colorFromServer => {
                      const validColor = getColorWithoutSpaces(colorFromServer);
                      const hexColor = getHexFromColorName(validColor);
                      const darkerColor = makeColorDarker(hexColor, 10);

                      return (
                        <li
                          key={colorFromServer}
                          className={classNames(styles.colors__outer, {
                            [styles.colors__outer_active]:
                              color === colorFromServer,
                          })}
                        >
                          <span
                            title={colorFromServer}
                            className={styles.colors__inner}
                            style={{ backgroundColor: darkerColor }}
                            onClick={() => {
                              handleChangeOptions(colorFromServer);
                            }}
                          ></span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.capacity}>
                  <p>{t('detailProduct.selectCapacity')}</p>
                  <ul className={styles.capacity__list}>
                    {product.capacityAvailable.map(capacityFromServer => {
                      return (
                        <li key={capacityFromServer}>
                          <span
                            className={classNames(styles.capacity__item, {
                              [styles.capacity__item_active]:
                                capacity === capacityFromServer,
                            })}
                            onClick={() => {
                              handleChangeOptions(
                                undefined,
                                capacityFromServer,
                              );
                            }}
                          >
                            {capacityFromServer}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={styles.divider}></div>

                <div className={styles.price}>
                  <div className={styles.price__discount}>
                    ${product.priceDiscount}
                  </div>
                  <div className={styles.price__regular}>
                    <FullPrice fullPrice={product.priceRegular} />
                  </div>
                </div>

                <div className={styles.buttons}>
                  <div className={styles.buttons__addToCard}>
                    <Button
                      type="primary"
                      size={{ height: 48 }}
                      state={isInCart ? 'selected' : 'disabled'}
                      onClick={() => handleToggleToCart()}
                    >
                      {isInCart
                        ? t('productCard.added')
                        : t('productCard.addToCart')}
                    </Button>
                  </div>
                  <div className={styles.buttons__addToFavourites}>
                    <Button
                      type="icon"
                      state={isInFavorites ? 'selected' : 'disabled'}
                      size={{ height: 48 }}
                      onClick={() => handleToggleToFavorites()}
                    >
                      {isInFavorites ? (
                        <IconFavouriteActive />
                      ) : (
                        <IconFavourite
                          className={styles.buttons__addToFavourites__icon}
                        />
                      )}
                    </Button>
                  </div>
                </div>

                <div className={styles.params}>
                  <ProductParams>
                    <SingleParam
                      name={t('productCard.screen')}
                      param={product.screen}
                    />
                    <SingleParam
                      name={t('techSpech.resolution')}
                      param={product.resolution}
                    />
                    <SingleParam
                      name={t('techSpech.processor')}
                      param={product.processor}
                    />
                    <SingleParam
                      name={t('productCard.RAM')}
                      param={product.ram}
                    />
                  </ProductParams>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.about}>
          <h4 className={styles.about__title}>{t('detailProduct.about')}</h4>
          <div className={styles.divider}></div>
          {!error && (
            <div className={styles.description}>
              {product.description.map(description => (
                <div
                  className={styles.description__item}
                  key={description.title}
                >
                  <h5 className={styles.description__title}>
                    {description.title}
                  </h5>
                  <p className={styles.description__body}>{description.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.tech}>
          <h4 className={styles.tech__title}>{t('detailProduct.techSpecs')}</h4>
          <div className={styles.divider}></div>

          {!error && (
            <div className={styles.params}>
              <ProductParams techSpecs={true}>
                <SingleParam
                  name={t('productCard.screen')}
                  param={product.screen}
                />
                <SingleParam
                  name={t('techSpech.resolution')}
                  param={product.resolution}
                />
                <SingleParam
                  name={t('techSpech.processor')}
                  param={product.processor}
                />
                <SingleParam name={t('productCard.RAM')} param={product.ram} />
                <SingleParam
                  name={t('productCard.capacity')}
                  param={product.capacity}
                />
                <SingleParam
                  name={t('techSpech.camera')}
                  param={product.camera}
                />
                <SingleParam name={t('techSpech.zoom')} param={product.zoom} />
                <SingleParam
                  name={t('techSpech.cell')}
                  param={product.cell.join(', ')}
                />
              </ProductParams>
            </div>
          )}
        </div>
      </div>
      <div className={styles.slider}>
        {otherProducts.length > 0 && (
          <SliderSection
            title={t('detailProduct.youMayAlsoLike')}
            prevButtonClass="buttonHotPrice-prev"
            nextButtonClass="buttonHotPrice-next"
            arrayToMap={otherProducts}
            withDiscount={true}
          />
        )}
      </div>
    </>
  );
};
