import type { PhotoType } from "../hooks/fetchphotos";

type PhotoProps = {
  photo: PhotoType;
  isFavorite: boolean;
  onFavoriteToggle: (photoId: string) => void;
};

export default function Photo({
  photo,
  isFavorite,
  onFavoriteToggle,
}: PhotoProps) {
  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-xl bg-[#e8e5de]">
        <img
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          src={photo.download_url}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
        />
        <button
          className={`absolute right-3 top-3 flex size-10 items-center justify-center rounded-full shadow-sm transition ${
            isFavorite
              ? "bg-[#d66b50] text-white"
              : "bg-white/90 text-[#343530] hover:bg-white"
          }`}
          type="button"
          aria-label={
            isFavorite
              ? `Remove ${photo.author}'s photo from favorites`
              : `Add ${photo.author}'s photo to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => onFavoriteToggle(photo.id)}
        >
          <svg
            aria-hidden="true"
            className="size-5"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 pt-3">
        <p className="truncate text-sm font-medium">{photo.author}</p>
        {isFavorite && (
          <span className="shrink-0 text-[10px] font-bold tracking-[0.14em] text-[#d66b50]">
            FAVORITE
          </span>
        )}
      </div>
    </article>
  );
}
