# Photo Gallery

A photo gallery built with React, Vite and Tailwind CSS.

## Features
- Fetches 30 photos from the Picsum API, with loading and error states
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Live search by author name (filters the fetched data, no extra API call)
- Favourites managed with useReducer and saved in localStorage
- Custom hook: useFetchPhotos
- useCallback and useMemo for the search handler and filtered list

## Run locally
npm install
npm run dev