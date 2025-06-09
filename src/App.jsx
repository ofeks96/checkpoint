import Films from "./components/Films";
import styles from './App.module.css';


export default function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Films />
      </div>
    </div>
  );
}
