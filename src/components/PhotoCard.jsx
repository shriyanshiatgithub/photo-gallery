
export default function PhotoCard({
  photo,
  isFavourite,
  onToggleFavourite,
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-lavender/15 bg-espresso/65 shadow-lg shadow-black/15 transition duration-300 ease-out hover:-translate-y-1 hover:border-lavender/40 hover:shadow-xl hover:shadow-black/25">
      <div className="relative aspect-[4/3] overflow-hidden bg-espresso">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? "Remove from favourites"
              : "Add to favourites"
          }
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender ${
            isFavourite
              ? "border-lavender/50 bg-espresso/80"
              : "border-white/30 bg-espresso/50 hover:bg-espresso/80"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-5 w-5 transition duration-300 ${
              isFavourite
                ? "scale-110 fill-lavender stroke-lavender"
                : "fill-none stroke-platinum"
            }`}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="border-t border-lavender/10 bg-white/[0.035] px-4 py-4 sm:px-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-platinum/50">
          Photographer
        </p>
        <p className="mt-1.5 break-words font-display text-lg font-medium text-platinum transition-colors duration-300 group-hover:text-lavender">
          {photo.author}
        </p>
      </div>
    </article>
  );
}
