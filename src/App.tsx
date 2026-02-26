import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WeddingProvider } from './context/WeddingContext';
import { useAuth } from './context/AuthContext';
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
import { PublicMusicToggle } from './components/marketing/PublicMusicToggle';
import { I18nProvider } from './context/I18nContext';
import { ScrollToTop } from './components/ScrollToTop';
import { NaturalScrollMotion } from './components/NaturalScrollMotion';
import { LocalePathSync } from './components/LocalePathSync';
import { DomTranslationFallback } from './components/DomTranslationFallback';
import { getLocaleSegmentFromPathname, segmentToLanguage, withLocalePath } from './i18n/localePath';
import { useI18n } from './context/I18nContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  const { language } = useI18n();

  if (!token) {
    const pathLanguage = segmentToLanguage(getLocaleSegmentFromPathname(location.pathname));
    const effectiveLanguage = pathLanguage ?? language;
    return <Navigate to={withLocalePath('/', effectiveLanguage)} replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <WeddingProvider>
          <Router>
            <LocalePathSync />
            <ScrollToTop />
            <NaturalScrollMotion />
            <DomTranslationFallback />
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:locale" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/:locale/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/:locale/signup" element={<Signup />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/:locale/shop" element={<Shop />} />
              <Route path="/services" element={<Services />} />
              <Route path="/:locale/services" element={<Services />} />
              <Route path="/collaborations" element={<Collaborations />} />
              <Route path="/:locale/collaborations" element={<Collaborations />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/:locale/products" element={<ProductsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/:locale/contact" element={<Contact />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/:locale/pricing" element={<PricingPage />} />
              <Route path="/samples" element={<Samples />} />
              <Route path="/:locale/samples" element={<Samples />} />
              <Route path="/samples/:tier" element={<TierSample />} />
              <Route path="/:locale/samples/:tier" element={<TierSample />} />
              <Route path="/samples/:tier/:page" element={<TierSample />} />
              <Route path="/:locale/samples/:tier/:page" element={<TierSample />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/:locale/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/:locale/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/:locale/cookies" element={<CookiePolicy />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:locale/dashboard"
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
              <Route
                path="/:locale/wedding/:id"
                element={
                  <ProtectedRoute>
                    <WeddingDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <PublicMusicToggle />
            <PublicFloatingCta />
            <SiteFooter />
          </Router>
        </WeddingProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
