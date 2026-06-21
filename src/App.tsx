import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import TontoninDong from './pages/TontoninDong';
import TontoninDongWatch from './pages/TontoninDong/Watch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="project/:id" element={<ProjectDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="tontonin-dong" element={<TontoninDong />} />
      <Route path="tontonin-dong/watch/:id" element={<TontoninDongWatch />} />
      <Route path="tontonin-dong/watch/:source/:id" element={<TontoninDongWatch />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
