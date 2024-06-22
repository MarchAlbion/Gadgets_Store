import './PhonesPage.scss';

import { BreadcrumbsComponent } from '../../UI/Breadcrumbs/Breadcrumbs';
import { Catalog } from '../../components/Catalog/Catalog';
import { PATHS } from '../../constants';
import { Breadcrumb } from '../../types/Breadcrumb';
import { useTranslation } from 'react-i18next';

export const PhonesPage = () => {
  const { t: localize } = useTranslation();

  const breadcrumbsData: Breadcrumb[] = [
    { label: localize('phones.title'), path: PATHS.PHONES.LIST },
  ];

  return (
    <div className="page__container">
      <BreadcrumbsComponent breadcrumbs={breadcrumbsData} />
      <Catalog productType="Phones" />
    </div>
  );
};
