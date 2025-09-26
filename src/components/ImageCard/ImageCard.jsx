import css from "./ImageCard.module.css";
const ImageCard = ({ image, onClick }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        width="300"
        height="200"
        onClick={() => onClick(image)}
        className={css.image}
      />
    </div>
  );
};
export default ImageCard;
