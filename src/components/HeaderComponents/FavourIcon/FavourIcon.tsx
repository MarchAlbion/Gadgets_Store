import { ReactComponent as Icon } from '../../../assets/icons/Favourites.svg';
import styles from './FavourIcon.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '../../../UI';
import cn from 'classnames';
import { PATHS } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectfavorites } from '../../../redux';
import { Badge } from '../Badge/Badge';

export const FavourIcon = () => {
  const { pathname } = useLocation();
  const isActiveClass = pathname.includes('favourites');
  const itemsCount = useSelector(selectfavorites).length;

  return (
    <div
      className={cn(styles.icon, {
        [styles.icon_active]: isActiveClass,
      })}
    >
      <NavLink
        to={`${PATHS.FAVOURITES}`}
        style={{ width: '100%', boxSizing: 'border-box' }}
      >
        <Button
          type="icon"
          size={{ width: 100, height: 100 }}
          measure="%"
          state="header"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon className={styles.icon__fill} />
          {itemsCount > 0 && <Badge count={itemsCount} />}
        </Button>
      </NavLink>
    </div>
  );
};
