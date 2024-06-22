import { Outlet } from 'react-router-dom';
import { Header } from '../../components/HeaderComponents/Header/Header';
import { Footer } from '../../components/FooterComponents/Footer/Footer';
// import { ItemDetailsPage } from '../../pages';

export const RouteLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        {/* <ItemDetailsPage /> */}
      </main>
      <Footer />
    </>
  );
};
