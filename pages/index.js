import FoodItem from '../components/FoodItem';
import styles from '../styles/Home.module.css';
import { getXataClient } from '../src/xata';
import { useState } from 'react';
import SearchResult from '../components/SearchResult';

export default function Home({ data }) {
  const [imageSrc, setImageSrc] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [searchData, setSearchData] = useState();

  async function handleSearch(event) {
    event.preventDefault();

    const result = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchTerm,
      }),
    }).then((r) => r.json());
    // console.log(result);
    setSearchData(result);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    let response;

    if (imageSrc) {
      const body = new FormData();
      body.append('upload_preset', 'bn1pyehj');

      body.append('file', imageSrc);

      response = await fetch(
        'https://api.cloudinary.com/v1_1/chukwutosin/image/upload',
        {
          method: 'POST',
          body,
        }
      ).then((r) => r.json());
    }

    fetch('/api/add-food-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price,
        name,
        image_url: response.secure_url,
      }),
    }).then((r) => alert('record added successfully'));
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>Restaurant Menu</h1>
      </div>
      <div className={styles.foodListContainer}>
        <div>
          <input
            type='text'
            className={styles.formInput}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for meals...'
          />
          <button
            onClick={handleSearch}
            type='submit'
            className={styles.submitInput}
          >
            Search
          </button>
        </div>
        {searchData ? <SearchResult meals={searchData} /> : ''}

        {searchData ? '' : <FoodItem meals={data} />}
      </div>
      <div className={styles.form}>
        <label htmlFor='name'>
          <b>Name:</b>
        </label>
        <input
          type='text'
          name='name'
          className={styles.formInput}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='price'>
          <b>Price:</b>
        </label>
        <input
          type='text'
          name='price'
          className={styles.formInput}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor='image'>
          <b>Image:</b>
        </label>
        <input
          type='file'
          name='image'
          className={styles.formInput}
          onChange={(e) => setImageSrc(e.target.files[0])}
        />
        <button
          onClick={handleOnSubmit}
          type='submit'
          className={styles.submitInput}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const xata = getXataClient();
  const data = await xata.db.meals.getAll();
  return { props: { data } };
}
