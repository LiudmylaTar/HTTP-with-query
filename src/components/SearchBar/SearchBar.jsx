import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

const notify = () => toast("Please enter what you are looking for!");
const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements["search"].value;
    if (inputValue.trim() === "") {
      notify();
      return;
    }
    onSubmit(inputValue);
    e.target.reset();
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
