import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { IoClose } from "react-icons/io5";

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={onRequestClose} className={css.closeBtn}>
        <IoClose size="32" />
      </button>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={css.largeImg}
      />
    </Modal>
  );
};

export default ImageModal;
