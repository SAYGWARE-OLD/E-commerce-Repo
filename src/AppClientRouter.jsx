import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routing/routes';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { ErrorBoundaryPage } from './pages/ErrorPage/ErrorPage';
import routesControl from './utils/routesControl';

const router = createBrowserRouter(
    routesControl(routes)
);

function AppClientRouter() {

    return (

        <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundaryPage fallback={<div>Something Error</div>}>
                <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
            </ErrorBoundaryPage>
        </Suspense>

    );
}

export default AppClientRouter