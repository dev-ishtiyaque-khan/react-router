import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RootPage = () => {
  // const navigation = useNavigation(); // we can use useNavigation to reflect current navigation state in case, BE takes much time for response.

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>loading...</p>} */}
        <Outlet />
      </main>
    </>
  )
}

export default RootPage;