import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  // submit(null, { method: "post", action: "/logout", });
  // same as
  // <Form action="/logout" method="post" />;
  const submit = useSubmit(); // It is used to submit data programmatically.

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      // we can also pass other action path to submit. but in this case, it will be default to current route where this component is rendered.
      submit(null, { method: 'delete' })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
