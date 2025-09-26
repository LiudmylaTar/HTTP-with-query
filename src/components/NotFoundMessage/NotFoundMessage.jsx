import css from "./NotFoundMessage.module.css";

const NotFoundMessage = ({ text }) => {
  return <div className={css.message}>{text}</div>;
};

export default NotFoundMessage;
