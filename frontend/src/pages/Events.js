import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const data = useLoaderData(); // This hook retrieves event data using the useLoaderData() where on top level depends on loader function of react router check App.js.
  console.log(data)
  // if (data.isError) {
  //   return <p>{data.message}</p>
  // }
  const events = data.events;

  return (
    // We need Await with Suspense (for fallback) to lazily loading the data we get from defer. Ideally it will wait for defer promise to get resolve first with Await resolve.
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch events' },
      { status: 500 }
    )
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// By doing this I can use useLoaderData in all the nested component of EventsPage like directly in EventsList component but not in RootPage.
// It's not react component so useState or any react related code won't work inside it.
const loader = async () => {
  // We can use defer in case, we don't want whole page from loading but part of it (like where API request takes time). In this case, ideally it should render EventLayout atleast
  return defer({
    events: loadEvents(), // defer values returned from loaders by passing promises instead of resolved values.
  });
}

export default EventsPage;
export { loader };