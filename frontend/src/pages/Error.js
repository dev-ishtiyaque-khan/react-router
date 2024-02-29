import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError(); // It returns route error raised from components or loaders.

  let title = 'An Error Occurred';
  let message = 'Something went wrong';

  if (error.status === 500) {
    message = error.data.message
  }

  if (error.status === 404) {
    title = 'Not Found!';
    message = 'Could not find resource or page.'
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default ErrorPage;