import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import NotFoundMessage from "./components/NotFoundMessage/NotFoundMessage";
import Modal from "react-modal";
import ImageModal from "./components/ImageModal/ImageModal";
import { useToggle } from "./hooks/useToggle";
import { useImages } from "./hooks/useImage";

Modal.setAppElement("#root");

function App() {
  const [typeImg, setTypeImg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Для модалки
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, open, close } = useToggle();
  const [modalLoading, setModalLoading] = useState(false);

  // useImage
  const { data, isLoading, isError, isFetching } = useImages(
    typeImg,
    currentPage
  );
  const [images, setImages] = useState([]);

  const searchImg = (inputValue) => {
    setTypeImg(inputValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (data?.images) {
      if (currentPage === 1) {
        setImages(data.images); // перший пошук
      } else {
        setImages((prev) => [...prev, ...data.images]); // додавання наступних сторінок
      }
    }
  }, [data?.images, currentPage]);

  const incrementPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Для модалки
  const handleImageClick = (image) => {
    setModalLoading(true);
    const img = new Image();
    img.src = image.urls.regular;

    img.onload = () => {
      setSelectedImage(image);
      setModalLoading(false);
      open();
    };

    img.onerror = () => {
      setModalLoading(false);
      alert("Failed to load image");
    };
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
            background: "rgba(238, 167, 37, 0.9)",
          },
        }}
      />

      <SearchBar onSubmit={searchImg} />

      {isError && <p>Something went wrong, try again later</p>}

      {!isLoading &&
        !isError &&
        data?.images?.length === 0 &&
        typeImg !== "" && (
          <NotFoundMessage
            text={`Try a different search — no results here "${typeImg}".`}
          />
        )}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}

      {modalLoading && (
        <div className="modal-loader-wrapper">
          <Loader />
        </div>
      )}

      {isOpen && (
        <ImageModal
          isOpen={isOpen}
          onRequestClose={close}
          image={selectedImage}
        />
      )}

      {images.length > 0 && !isLoading && currentPage !== data?.totalPages && (
        <LoadMoreBtn changePage={incrementPage} disabled={isFetching} />
      )}
    </>
  );
}

export default App;
