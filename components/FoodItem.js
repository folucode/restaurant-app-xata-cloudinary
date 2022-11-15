import styles from '../styles/Home.module.css';

export default function FoodItem({ meals }) {
  return (
    <div>
      {meals.map((meal) => (
        <div className={styles.foodList} key={meal.id}>
          <img src={meal.image_url} alt='image' width='100%' height='250' />

          <div className={styles.details}>
            <p>{meal.name}</p>
            <p>
              <b>Price:</b> {meal.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
