import { useEffect, useState } from "react";

export type PhotoType = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?limit=30",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`The photo request failed (${response.status}).`);
        }

        const data: PhotoType[] = await response.json();
        setPhotos(data);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading photos.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchPhotos();

    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}