import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PrivateRoute } from '@/components/PrivateRoute';

import { Main } from '@/pages/Main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/notebooks" />,
  },
  {
    path: '/notebooks/:notebookId?',
    element: <PrivateRoute element={<Main />} />,
  },
  {
    path: '/notebooks/:notebookId?/notes/:noteId?',
    element: <PrivateRoute element={<Main />} />,
  },
]);
