import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ReduxStoreProvider from './redux/ReduxStoreProvider.tsx';
import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';
import Loading from './components/ui/Loading/Loading.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxStoreProvider>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </React.Suspense>
      </ErrorBoundary>
      <Toaster />
    </ReduxStoreProvider>
  </StrictMode>
);
