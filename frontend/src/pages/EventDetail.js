import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from '../components/EventItem';
import { Suspense } from "react";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  // This hook makes the data at any currently rendered route available anywhere in the tree.
  // This is useful for components deep in the tree needing data from routes much farther up,
  // as well as parent routes needing the data of child routes deeper in the tree.
  const { events, event } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  )
}

const loadEvent = async (id) => {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' } // This is one way to handle error
    // throw { message: 'Could not fetch events.' }
    // throw new Response(JSON.stringify({ message: 'Could not fetch events'}), { status: 500 }); // alternative react router json utility
    throw json(
      { message: 'Could not fetch details for selected event'},
      { status: 500 }
    )
  } else {
    const resData = await response.json();
    return resData.event;
  }
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
const loader = async ({ request, params}) => {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id), // Tells to wait till promise is resolved before loading the page component at all.
    events: loadEvents() // This is deferred, so only be rendered after page is loaded and promise is resolved
  })
}

const action = async ({ params, request }) => {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method // we got this from useSubmit hook from EvenItem.
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 })
  }
  return redirect('/events');
}

export default EventDetailPage;
export { loader, action }