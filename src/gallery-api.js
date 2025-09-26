import axios from "axios";

const ACCESS_KEY = "vC_IV0ThH0s_ufETrBgaw59-mcOgxBtLqNUStBqmC_8";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchGallery = async (typeImg, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: typeImg,
      page: currentPage,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
};
