import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy-loaded pages for code splitting
const HomePage   = lazy(() => import('./pages/HomePage'));
const AboutPage  = lazy(() => import('./pages/AboutPage'));
const MenuPage   = lazy(() => import('./pages/MenuPage'));
const BookPage   = lazy(() => import('./pages/BookPage'));
const LoginPage  = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingSpinner fullscreen />}>
      <Routes>
        <Route path="/"       element={<HomePage />} />
        <Route path="/about"  element={<AboutPage />} />
        <Route path="/menu"   element={<MenuPage />} />
        <Route path="/book"   element={<BookPage />} />
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
