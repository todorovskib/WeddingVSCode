import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WeddingProvider } from './context/WeddingContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { WeddingDetail } from './pages/WeddingDetail';
import { Shop } from './pages/Shop';
import { Services } from './pages/Services';
import { ProductsPage } from './pages/Products';
import { Collaborations } from './pages/Collaborations';
import { Contact } from './pages/Contact';
import { Samples } from './pages/Samples';
import { TierSample } from './pages/TierSample';
import { PricingPage } from './pages/Pricing';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiePolicy } from './pages/CookiePolicy';
import { Navigation } from './components/Navigation';
import { SiteFooter } from './components/SiteFooter';
import { PublicFloatingCta } from './components/marketing/PublicFloatingCta';
import { I18nProvider } from './context/I18nContext';
import { ScrollToTop } from './components/ScrollToTop';
import { NaturalScrollMotion } from './components/NaturalScrollMotion';
import { DomTranslationFallback } from './components/DomTranslationFallback';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <WeddingProvider>
          <Router>
            <ScrollToTop />
            <NaturalScrollMotion />
            <DomTranslationFallback />
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/services" element={<Services />} />
              <Route path="/collaborations" element={<Collaborations />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/samples" element={<Samples />} />
              <Route path="/samples/:tier" element={<TierSample />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wedding/:id"
                element={
                  <ProtectedRoute>
                    <WeddingDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <PublicFloatingCta />
            <SiteFooter />
          </Router>
        </WeddingProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
