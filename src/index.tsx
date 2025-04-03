import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { RecipeDetailsPage } from './components/RecipeDetailsPage';
import { Cart } from './components/Cart';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/recipe/:itemId" element={<RecipeDetailsPage />} />
            <Route path="/recipe/cart" element={<Cart />} />
            <Route
              path="*"
              element={
                <h3 style={{ padding: 30 }} className="title">
                  Page not found
                </h3>
              }
            ></Route>
          </Route>
        </Routes>
      </HashRouter>

      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </Provider>,
);
