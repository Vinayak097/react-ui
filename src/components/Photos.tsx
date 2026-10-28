import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/fetchphotos";
import Photo from "./Photo";
import Searchbar from "./Searchbar";

type FavoritesAction = {
  type: "toggle";
  photoId: string;
};

function favoritesReducer(favorites: string[], action: FavoritesAction) {
  switch (action.type) {
    case "toggle":
      return favorites.includes(action.photoId)
        ? favorites.filter((id) => id !== action.photoId)
        : [...favorites, action.photoId];
  }
}

function getSavedFavorites(): string[] {
  const savedFavorites = localStorage.getItem("celebrare-favorite-photos");

  if (!savedFavorites) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(savedFavorites);

    if (
      Array.isArray(parsed) &&
      parsed.every((favorite): favorite is string => typeof favorite === "string")
    ) {
      return parsed;
    }

    console.error("Saved photo favorites have an invalid format.");
  } catch (err) {
    console.error("Could not read saved photo favorites.", err);
  }

  return [];
}

export default function Photos() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getSavedFavorites,
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return photos;
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query),
    );
  }, [photos, search]);

  const handleFavoriteToggle = useCallback((photoId: string) => {
    dispatch({ type: "toggle", photoId });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "celebrare-favorite-photos",
      JSON.stringify(favorites),
    );
  }, [favorites]);

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#20211f]">
      <header className="border-b border-[#e7e4dc]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a
            className="text-sm font-extrabold tracking-[0.2em]"
            href="#gallery"
            aria-label="Stillroom home"
          >
            STILLROOM<span className="text-[#d66b50]">.</span>
          </a>
          <p className="hidden text-xs font-medium tracking-[0.14em] text-[#77766f] sm:block">
            A PHOTO COLLECTION
          </p>
        </div>
      </header>

      <section
        id="gallery"
        className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16"
      >
        <div className="mb-9 flex flex-col gap-7 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#d66b50]">
              A LITTLE INSPIRATION, IN FOCUS
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl">
              Moments worth
              <br className="hidden sm:block" /> a closer look.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#77766f] sm:text-base">
              A small collection of photographs and the people behind them.
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <Searchbar value={search} onChange={handleSearchChange} />
            {!loading && !error && (
              <p className="mt-3 text-right text-xs text-[#77766f]">
                {filteredPhotos.length}{" "}
                {filteredPhotos.length === 1 ? "photo" : "photos"}
                {search.trim() ? " found" : " in the collection"}
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div
            className="flex min-h-64 flex-col items-center justify-center gap-4 text-sm text-[#77766f]"
            role="status"
          >
            <span className="size-8 animate-spin rounded-full border-[3px] border-[#dedbd2] border-t-[#d66b50]" />
            <span>Gathering the photographs…</span>
          </div>
        )}

        {error && !loading && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
            role="alert"
          >
            We couldn’t load the photos. {error}
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {filteredPhotos.map((photo) => (
              <Photo
                key={photo.id}
                photo={photo}
                isFavorite={favorites.includes(photo.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold">No photographs found</p>
            <p className="mt-2 text-sm text-[#77766f]">
              Try a different author name.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
