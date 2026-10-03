import React, { useState } from 'react';
import { QRTypeConfig } from '../data/qrTypeConfigs';
import { useQRGenerator } from '../hooks/useQRGenerator';
import { Header } from './Header';
import { Footer } from './Footer';
import { SEOHead } from './seo/SEOHead';
import { Breadcrumb } from './seo/Breadcrumb';
import { SEOContent } from './seo/SEOContent';
import { RelatedQRTools } from './seo/RelatedQRTools';
import { AdsterraBanner } from './ads/AdsterraBanner';
import { QRCodeWorkspace } from './QRCodeWorkspace';
import { QrScannerModal } from './QrScannerModal';
import { PrintModal } from './PrintModal';
import { HistoryDrawer } from './HistoryDrawer';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QRCodePageProps {
  config: QRTypeConfig;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QRCodePage: React.FC<QRCodePageProps> = ({
  config,
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Initialize QR generator hook with this page's specific type
  const qrGen = useQRGenerator(config.type);

  const handleSelectTab = (tab: 'generator' | 'scanner' | 'batch' | 'history') => {
    if (tab === 'history') {
      setIsHistoryOpen(true);
    } else if (tab === 'scanner') {
      setIsScannerOpen(true);
    } else if (tab === 'batch') {
      navigate('/?tab=batch');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] transition-colors duration-200">
      {/* 1. SEO Head & Dynamic Metadata */}
      <SEOHead config={config} />

      {/* 2. Existing Header & Navigation */}
      <Header
        activeTab="generator"
        setActiveTab={handleSelectTab}
        savedCount={qrGen.savedItems.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenDynamicModal={() => setIsScannerOpen(true)}
      />

      {/* 3. Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb currentLabel={config.breadcrumbLabel} />

        {/* Page Hero Title & Subtitle */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              <config.icon className="w-3.5 h-3.5" />
              <span>Dedicated Generator</span>
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium hidden sm:inline">
              100% Free • No Sign-Up • Unlimited Scans
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] mb-2">
            {config.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {config.metaDescription}
          </p>
        </div>

        {/* QR Workspace: Form on Left + Live Preview on Right + Customizer Below */}
        <QRCodeWorkspace
          selectedType={config.type}
          url={qrGen.url}
          setUrl={qrGen.setUrl}
          isDynamic={qrGen.isDynamic}
          setIsDynamic={qrGen.setIsDynamic}
          text={qrGen.text}
          setText={qrGen.setText}
          vcard={qrGen.vcard}
          setVcard={qrGen.setVcard}
          wifi={qrGen.wifi}
          setWifi={qrGen.setWifi}
          whatsapp={qrGen.whatsapp}
          setWhatsapp={qrGen.setWhatsapp}
          email={qrGen.email}
          setEmail={qrGen.setEmail}
          phone={qrGen.phone}
          setPhone={qrGen.setPhone}
          sms={qrGen.sms}
          setSms={qrGen.setSms}
          event={qrGen.event}
          setEvent={qrGen.setEvent}
          location={qrGen.location}
          setLocation={qrGen.setLocation}
          crypto={qrGen.crypto}
          setCrypto={qrGen.setCrypto}
          social={qrGen.social}
          setSocial={qrGen.setSocial}
          appStore={qrGen.appStore}
          setAppStore={qrGen.setAppStore}
          payment={qrGen.payment}
          setPayment={qrGen.setPayment}
          style={qrGen.style}
          setStyle={qrGen.setStyle}
          currentPayload={qrGen.currentPayload}
          dataSummary={qrGen.dataSummary}
          onOpenScanner={() => setIsScannerOpen(true)}
          onOpenPrintModal={() => setIsPrintOpen(true)}
          onSaveToHistory={qrGen.handleSaveToHistory}
        />

        {/* 4. AD PLACEMENT: STRICTLY AFTER THE COMPLETE GENERATOR FLOW */}
        <AdsterraBanner
          slotId={`ad-post-generator-${config.slug}`}
          className="mt-10 mb-4"
        />

        {/* 5. Comprehensive SEO Content: Intro, How it works, Steps, Use Cases, Benefits, Type-specific FAQ */}
        <SEOContent config={config} />

        {/* 6. Internal Linking: "More QR Code Generators" */}
        <RelatedQRTools currentType={config.type} />
      </main>

      {/* Modals & Drawers */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onLoadIntoGenerator={(text) => {
          qrGen.handleLoadScannedContent(text);
          setIsScannerOpen(false);
        }}
      />

      <PrintModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        payload={qrGen.currentPayload}
        style={qrGen.style}
      />

      <HistoryDrawer
        items={qrGen.savedItems}
        onSelectItem={(item) => {
          qrGen.handleLoadSavedItem(item);
          setIsHistoryOpen(false);
        }}
        onDeleteItem={qrGen.handleDeleteSavedItem}
        onClearAll={qrGen.handleClearAllHistory}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
