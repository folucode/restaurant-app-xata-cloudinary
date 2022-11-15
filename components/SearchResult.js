import styles from '../styles/Home.module.css';

export default function SearchResult({ meals }) {
  return (
    <div>
      {meals.map((meal) => (
        <div className={styles.foodList} key={meal.record.id}>
          <img
            src={meal.record.image_url}
            alt='image'
            width='100%'
            height='250'
          />

          <div className={styles.details}>
            <p>{meal.record.name}</p>
            <p>
              <b>Price:</b> {meal.record.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
