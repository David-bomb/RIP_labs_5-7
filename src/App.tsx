import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ServerCatalogPage, ServerDetailPage } from './pages';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter > {/* <-- ДОБАВЛЕНО */}
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servers" element={<ServerCatalogPage />} />
          <Route path="/servers/:id" element={<ServerDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;