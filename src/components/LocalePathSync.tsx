import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import {
  getLocaleSegmentFromPathname,
  isLocalePrefixedPath,
  segmentToLanguage,
  withLocalePath,
} from '../i18n/localePath';

export const LocalePathSync: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useI18n();

  useEffect(() => {
    if (!isLocalePrefixedPath(location.pathname)) {
      const nextPath = withLocalePath(location.pathname, language);
      navigate(`${nextPath}${location.search}${location.hash}`, { replace: true });
      return;
    }

    const pathSegment = getLocaleSegmentFromPathname(location.pathname);
    const pathLanguage = segmentToLanguage(pathSegment);
    if (pathLanguage && pathLanguage !== language) {
      setLanguage(pathLanguage);
    }
  }, [language, location.hash, location.pathname, location.search, navigate, setLanguage]);

  return null;
};
