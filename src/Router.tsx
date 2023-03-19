import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<Navigate to="/admin" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
