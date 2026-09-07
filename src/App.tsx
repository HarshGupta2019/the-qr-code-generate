import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { QRCodePage } from './components/QRCodePage';
import { ScrollToTop } from './components/ScrollToTop';
import { PDF_QR_CONFIG, QR_TYPE_CONFIGS } from './data/qrTypeConfigs';
import { InformationPage } from './components/InformationPage';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('tqg_dark_mode');
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('tqg_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/about" element={<InformationPage kind="about" darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/contact" element={<InformationPage kind="contact" darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/privacy-policy" element={<InformationPage kind="privacy" darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/terms-and-conditions" element={<InformationPage kind="terms" darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/disclaimer" element={<InformationPage kind="disclaimer" darkMode={darkMode} setDarkMode={setDarkMode} />} />
        {/* Main Home Page / All-in-One QR Code Generator */}
        <Route
          path="/"
          element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />}
        />

        {/* 1. URL QR Code */}
        <Route
          path="/url-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.url}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 2. Plain Text QR Code */}
        <Route
          path="/text-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.text}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 3. vCard Digital Business Card QR Code */}
        <Route
          path="/vcard-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.vcard}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 4. Wi-Fi Network Connect QR Code */}
        <Route
          path="/wifi-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.wifi}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 5. WhatsApp Direct Message QR Code */}
        <Route
          path="/whatsapp-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.whatsapp}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 6. Email Draft QR Code */}
        <Route
          path="/email-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.email}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 7. Phone Dial QR Code */}
        <Route
          path="/phone-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.phone}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 8. SMS Text Message QR Code */}
        <Route
          path="/sms-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.sms}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 9. Calendar Event QR Code */}
        <Route
          path="/event-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.event}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 10. Map Location & GPS QR Code */}
        <Route
          path="/location-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.location}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 11. Cryptocurrency & Bitcoin QR Code */}
        <Route
          path="/crypto-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.crypto}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 12. Social Media Linktree QR Code */}
        <Route
          path="/social-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.social}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 13. App Store & Google Play QR Code */}
        <Route
          path="/app-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.app}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* 14. Payment & UPI QR Code */}
        <Route
          path="/payment-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.payment}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        {/* SEO Aliases */}
        <Route
          path="/upi-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.payment}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route
          path="/instagram-qr-code"
          element={
            <QRCodePage
              config={QR_TYPE_CONFIGS.social}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route
          path="/pdf-qr-code"
          element={<QRCodePage config={PDF_QR_CONFIG} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
