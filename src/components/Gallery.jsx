
import {
  useState,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";

// Load saved favourites from localStorage
function getSavedFavourites() {
  try {
    const saved = localStorage.getItem("favourites");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Manage favourite additions and removals
function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];

    default:
      return state;
  }
}

// Two seamless rows of decorative photo previews
function PhotoStrip({ photos, direction }) {
  if (photos.length === 0) return null;

  return (
    <div className="photo-strip overflow-hidden">
      <div
        className={`photo-strip-track ${
          direction === "left" ? "photo-strip-left" : "photo-strip-right"
        }`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="photo-strip-group"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {photos.map((photo, index) => (
              <div
                key={`${copy}-${photo.id}-${index}`}
                className="photo-strip-item"
              >
                <img
                  src={`https://picsum.photos/id/${photo.id}/320/200`}
                  alt=""
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getSavedFavourites
  );

  const [searchTerm, setSearchTerm] = useState("");

  // Persist favourites whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    } catch {
      console.error("Could not save favourites.");
    }
  }, [favourites]);

  // Update the search term without fetching again
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Filter the photos already returned by the API
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  // Toggle a photo's favourite status
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-4 py-32"
      >
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/15 border-t-lavender" />
        <p className="font-display text-lg text-lavender">
          Gathering your memories…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mx-auto max-w-md rounded-2xl border border-lavender/20 bg-espresso/60 p-8 text-center"
      >
        <p className="font-display text-2xl text-lavender">
          Oops, something went wrong
        </p>
        <p className="mt-2 text-sm text-platinum/80">{error}</p>
        <p className="mt-2 text-sm text-platinum/60">
          Please check your connection and refresh the page.
        </p>
      </div>
    );
  }

  // Use the same fetched photos for both decorative strips
  const stripPhotos = photos.slice(0, 10);

  return (
    <section>
      {/* Decorative showcase; the actual gallery remains below */}
      <div
        className="mb-9 space-y-3 sm:mb-11 sm:space-y-4"
        aria-label="Photo previews"
      >
        <PhotoStrip photos={stripPhotos} direction="left" />
        <PhotoStrip photos={stripPhotos} direction="right" />
      </div>

      {/* Required live author search */}
      <div className="mx-auto mb-8 max-w-xl sm:mb-10">
        <label
          htmlFor="photo-search"
          className="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-platinum/65"
        >
          Find a photographer
        </label>

        <div className="search-shell rounded-xl p-px transition duration-300">
          <input
            id="photo-search"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by author name..."
            className="w-full rounded-xl border border-lavender/15 bg-espresso/85 px-5 py-4 text-platinum outline-none placeholder:text-platinum/40 focus:border-transparent"
          />
        </div>
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="py-16 text-center text-platinum/70">
          No photos found for &quot;{searchTerm}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
