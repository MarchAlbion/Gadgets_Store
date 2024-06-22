import style from './EmptySearch.module.scss';

export const EmptySearch = () => {
  return (
    <div className={style.emptySearchContainer}>
      <div className={style.emptySearch}></div>
    </div>
  );
};
