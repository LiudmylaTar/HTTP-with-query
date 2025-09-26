import { useState, CSSProperties, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { fetchGallery } from "./gallery-api";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import NotFoundMessage from "./components/NotFoundMessage/NotFoundMessage";
import Modal from "react-modal";
import ImageModal from "./components/ImageModal/ImageModal";
import { useToggle } from "./hooks/useToggle";
Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [typeImg, setTypeImg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // For modal windows
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, open, close } = useToggle();
  const [modalLoading, setModalLoading] = useState(false);

  const searchImg = (inputValue) => {
    setTypeImg(inputValue);
    setCurrentPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1);
  };
  // For modal windows
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

  useEffect(() => {
    if (typeImg === "") {
      return;
    }
    async function getImages() {
      try {
        setIsError(false);
        setLoading(true);
        const data = await fetchGallery(typeImg, currentPage);
        setImages((prevImg) => [...prevImg, ...data.images]);
        setTotalPages(data.totalPages);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [typeImg, currentPage]);

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
      {isLoading && <Loader />}
      {isError && <p>Something went wrong, try again later</p>}
      {!isLoading && !isError && images.length === 0 && typeImg !== "" && (
        <NotFoundMessage
          text={`Try a different search — no results here "${typeImg}".`}
        />
      )}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
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
      {images.length > 0 && !isLoading && currentPage !== totalPages && (
        <LoadMoreBtn changePage={incrementPage} />
      )}
    </>
  );
}

export default App;
