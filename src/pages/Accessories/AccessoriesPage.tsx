import './AccessoriesPage.scss';
import { BreadcrumbsComponent } from '../../UI/Breadcrumbs/Breadcrumbs';
import { Catalog } from '../../components/Catalog/Catalog';
import { PATHS } from '../../constants';
import { Breadcrumb } from '../../types/Breadcrumb';
import { useTranslation } from 'react-i18next';

export const AccessoriesPage = () => {
  const { t: localize } = useTranslation();

  const breadcrumbsData: Breadcrumb[] = [
    { label: localize('accessories.title'), path: PATHS.ACCESSORIES.LIST },
  ];

  return (
    <div className="page__container">
      <BreadcrumbsComponent breadcrumbs={breadcrumbsData} />
      <Catalog productType="Accessories" />
    </div>
  );
};
