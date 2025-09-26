import { useQuery } from "@tanstack/react-query";
import { fetchGallery } from "../gallery-api";

export function useImages(typeImg, currentPage) {
  return useQuery({
    queryKey: ["gallery", typeImg, currentPage],
    queryFn: () => fetchGallery(typeImg, currentPage),
    keepPreviousData: true,
    enabled: !!typeImg,
  });
}
