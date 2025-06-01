import { useId } from 'react';
import css from '../OrderForm1/OrderForm1.module.css';

export default function OrderForm1() {
  const nameId = useId();
  const emailId = useId();

  return (
    <form className={css.form}>
      <label className={css.label} htmlFor={nameId}>
        Name
      </label>
      <input className={css.input} type="text" name="username" id={nameId} />
      <label className={css.label} htmlFor={emailId}>
        Email
      </label>
      <input className={css.input} type="email" name="email" id={emailId} />

      <button className={css.button} type="submit">
        Place order
      </button>
    </form>
  );
}

//===================================================//
/**один базовий id**
 */
//   const fieldId = useId();
//   console.log(fieldId);

/* <label className={css.label} htmlFor={`${fieldId}-name`}>
        Name
      </label>
      <input
        className={css.input}
        type="text"
        name="username"
        id={`${fieldId}-name`}
      />
      <label className={css.label} htmlFor={`${fieldId}-email`}>
        Email
      </label>
      <input
        className={css.input}
        type="email"
        name="email"
        id={`${fieldId}-email`}
/> */

//======================================================//
