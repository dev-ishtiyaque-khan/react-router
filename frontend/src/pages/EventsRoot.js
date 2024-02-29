import { Outlet } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

const EventsRootLayout = () => {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default EventsRootLayout;