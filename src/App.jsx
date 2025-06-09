import { useEffect, useState } from "react";


function App() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        // TODO there is no ssl certificate for the swapi.dev domain had to disable secure: false in vite.config.js -> must fix!
        const res = await fetch('/api/api/films/')
        const data = await res.json();
        console.log(data); // TODO remove 
        setFilms(data.results);

      } catch (error) {
        console.error('Failed to fetch films:', error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Star Wars Films</h1>
      <ul>
        {films.map(film => (
          console.log(film), // TODO remove
          <li key={film.episode_id}>{film.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
