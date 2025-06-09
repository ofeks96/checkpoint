import { useEffect, useState } from "react";
import { Container, Grid, Typography } from '@mui/material';

import FilmCard from './FilmCard';
import styles from './Films.module.css';


export default function Films() {
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
    <Container sx={{ mt: 4 }} className={styles.container}>
      <Typography variant="h3" gutterBottom className={styles.title}>
        Star Wars Films
      </Typography>
      <Grid container spacing={2}>
        {films.map(film => (
          <Grid item xs={12} sm={6} md={4} key={film.episode_id}>
            <FilmCard key={film.title} film={film} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
