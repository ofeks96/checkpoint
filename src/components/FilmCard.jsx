import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './FilmCard.module.css';


export default function FilmCard({ film }) {
  const [characters, setCharacters] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded || characters.length > 0) return;
    const fetchCharacters = async () => {
      const characterData = await Promise.all(
        film.characters.slice(0, 5).map(async (url) => {
          // TODO there is no ssl certificate for the swapi.dev domain had to disable secure: false in vite.config.js -> must fix!
          const res = await fetch(url.replace('https://swapi.dev', '/api'));
          return res.json();
        })
      );
      setCharacters(characterData);
    };

    fetchCharacters();
  }, [expanded, film.characters]);

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant="h6" className={styles.cardTitle}>{film.title}</Typography>
        <Typography variant="body2">Release Date: {film.release_date}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{film.opening_crawl.slice(0, 120)}...</Typography>
        <Typography variant="body2">Director: {film.director}</Typography>
        <Typography variant="body2">Producer: {film.producer}</Typography>

        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} className={styles.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Characters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {characters.map(c => (
              <Typography key={c.url} variant="body2">
                {c.name} — {c.height}cm, {c.mass}kg, Hair: {c.hair_color}, Skin: {c.skin_color}, Eyes: {c.eye_color}, Born: {c.birth_year}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
