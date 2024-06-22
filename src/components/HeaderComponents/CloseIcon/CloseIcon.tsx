import { Button } from '../../../UI';
import { ReactComponent as Icon } from '../../../assets/icons/Close.svg';
import styles from './CloseIcon.module.scss';

type Props = {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CloseIcon: React.FC<Props> = ({ setShowMenu }) => (
  <div className={styles.icon}>
    <Button
      type="icon"
      onClick={() => setShowMenu(false)}
      size={{ width: 100, height: 100 }}
      measure="%"
      state="header"
    >
      <Icon className={styles.icon__close} />
    </Button>
  </div>
);
