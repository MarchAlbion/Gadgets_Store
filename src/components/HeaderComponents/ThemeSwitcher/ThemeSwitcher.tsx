import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { selectTheme, setTheme } from '../../../redux';
import styles from './ThemeSwitcher.module.scss';

type Props = {
  invertedIconLogic?: boolean;
};

const defaultOptions = {
  invertedIconLogic: false,
};

export const ThemeSwitcher: React.FunctionComponent<Props> = ({
  invertedIconLogic = defaultOptions.invertedIconLogic,
}) => {
  const theme = useSelector(selectTheme);
  const dispatch = useAppDispatch();

  const isDark = theme === 'Original Dark' ? false : true;

  const onChange = () => {
    if (theme === 'Original') {
      dispatch(setTheme('Original Dark'));
    } else {
      dispatch(setTheme('Original'));
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={styles.container}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <input
        type="checkbox"
        defaultChecked={invertedIconLogic ? !isDark : isDark}
        onChange={onChange}
      />
      <div />
    </label>
  );
};
