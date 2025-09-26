import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ changePage }) => {
  return (
    <>
      <button className={css.button} onClick={changePage}>
        Load more
      </button>
    </>
  );
};
export default LoadMoreBtn;
