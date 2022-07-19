/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from 'react';
import { api } from '../services/api';

import styles from '../../styles/Home.module.css';

export default function Home() {
  const [file, setFile] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);

  function handleUploadFile(event: any) {
    setFile(event.target.files[0]);
  }

  async function uploadFile(event: FormEvent) {
    event.preventDefault();
    setUploaded(false);
    setError(false);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/file', formData);

      if (response.status === 200) {
        console.log(file);
        setUploaded(true);
        return;
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }

    setUploaded(false);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={uploadFile}>
        <input type="file" onChange={handleUploadFile} name="file" />

        <button type="submit">Upload</button>
      </form>

      {uploaded && (
        <div className={styles.uploaded}>
          {!error && (
            <>
              <span>Uploaded!</span>

              <img
                src="https://images-na.ssl-images-amazon.com/images/I/715vwvP5ZEL.png"
                alt=""
                className={styles.image}
              />
            </>
          )}
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <span>Error!</span>

          <img
            src="https://www.i2symbol.com/pictures/emojis/d/d/7/2/dd7299df7627f2d34d553ff2bb9eec55_256.png"
            alt=""
            className={styles.image}
          />
        </div>
      )}
    </div>
  );
}
