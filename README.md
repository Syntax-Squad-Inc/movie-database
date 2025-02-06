# 🎬 Syntax Squad Movies

## 📌 Overview
Syntax Squad Movies is a dynamic web application that allows users to search for movies and explore a curated collection of films. The app features a modern UI with **Material UI**, **React Hooks**, and **API-based search functionality**.

## 🚀 Features
✅ **Dynamic Backgrounds** – The homepage cycles through cinematic images.
✅ **Live Search** – Search movies in real time with API calls.
✅ **Responsive Design** – Fully optimized for all screen sizes.
✅ **Smooth UI** – Powered by Material UI with enhanced styling.
✅ **Error Handling** – Displays appropriate messages for failed searches.
✅ **Optimized Performance** – Uses `useEffect` and `useCallback` for efficiency.

## 🛠️ Tech Stack
- **Frontend:** React, Material UI (MUI)
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
- **API:** Movie search functionality (Replace with actual API if applicable)
- **Styling:** Material UI Theme with dark mode

## 📂 Project Structure
```
Syntax-Squad-Movies/
│-- public/
│-- src/
│   │-- components/
│   │   ├── MovieList.jsx
│   │   ├── Footer.jsx
│   │-- utils/
│   │   ├── api.js
│   │-- assets/
│   │   ├── logoo.png
│   │-- App.jsx
│   │-- index.js
│-- package.json
│-- README.md
```

## 🎬 How to Run
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/syntax-squad-movies.git
   cd syntax-squad-movies
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the app:**
   ```sh
   npm start
   ```
4. **Open in browser:**
   - The app will run at **http://localhost:3000**

## 🔍 API Integration
This project fetches movie data using an external API. Ensure you configure your API in `utils/api.js`:
```js
export const searchMovies = async (query) => {
  const response = await fetch(`https://api.example.com/movies?search=${query}`);
  const data = await response.json();
  return data.results;
};
```
Replace `https://api.example.com/movies` with the actual API endpoint.

## 📸 Screenshots
🚀 **Homepage with Background Transitions**

![Homepage](https://via.placeholder.com/800x400)

🔍 **Movie Search Functionality**

![Search](https://via.placeholder.com/800x400)

## 🛠️ Potential Improvements
🔹 Implement **lazy loading** for movie posters
🔹 Enhance accessibility (ARIA labels for better screen reader support)
🔹 Add **pagination** for large search results

## 💡 Contributors
👨‍💻 **Siseko Makomazi** – Developer
👨‍💻 **Xolani Mosuma** – Developer
👨‍💻 **Anelisiwe Mtati** – Developer
👨‍💻 **Thanyani Gumani** – Developer
👨‍💻 **Mampai Rantsi** – Developer

## Project Link - https://movie-database-smcf.onrender.com/

Feel free to contribute and enhance this project! 🚀🎬

