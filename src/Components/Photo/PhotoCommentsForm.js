import React from 'react'
import { COMMENT_POST } from '../../api';
import {ReactComponent as Enviar} from '../../Assets/enviar.svg';
import Error from '../Helper/Error'
import useFetch from '../../Hooks/useFetch';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({id, setComments, single}) => {
  const [comment, setComment] = React.useState('');
  const {request, error} = useFetch();


  async function handleSubmit(event) {
    event.preventDefault();
    const {url, options} = COMMENT_POST(id, {comment});
    const { response, json } = await request(url, options);
    if(response.ok) {
      setComment('');
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea 
       className={`${styles.textarea} ${single ? styles.single : ''} `}
        id="comment"
        name="comment"
        placeholder="Comente aqui"
        value={comment}
        onChange={({target}) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm
