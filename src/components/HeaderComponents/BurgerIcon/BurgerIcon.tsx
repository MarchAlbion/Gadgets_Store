import { Button } from '../../../UI';
import { ReactComponent as Burger } from '../../../assets/icons/Menu.svg';
import styles from './BurgerIcon.module.scss';

type Props = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BurgerIcon: React.FC<Props> = ({ setShowMenu }) => (
  <div className={styles.icon}>
    <Button
      type="icon"
      onClick={() => setShowMenu(true)}
      size={{ width: 50, height: 50 }}
      state="header"
    >
      <Burger className={styles.icon__fill} />
    </Button>
  </div>
);
