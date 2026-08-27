import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useQRGenerator } from '../hooks/useQRGenerator';
import { Header } from './Header';
import { Footer } from './Footer';
import { TypeSelector } from './TypeSelector';
import { QRCodeWorkspace } from './QRCodeWorkspace';
import { QrScannerView } from './QrScannerView';
import { BatchGenerator } from './BatchGenerator';
import { HistoryDrawer } from './HistoryDrawer';
import { QrScannerModal } from './QrScannerModal';
import { PrintModal } from './PrintModal';
import { DynamicQrModal } from './DynamicQrModal';
import { FaqSection } from './FaqSection';
import { RelatedQRTools } from './seo/RelatedQRTools';
import { AdPlaceholder } from './ads/AdPlaceholder';
import { Quote, Sparkles, ArrowRight } from 'lucide-react';
import { QR_TYPE_CONFIGS } from '../data/qrTypeConfigs';
import { Link } from 'react-router-dom';

interface HomePageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomePage: React.FC<HomePageProps> = ({ darkMode, setDarkMode }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'generator' | 'scanner' | 'batch' | 'history'>('generator');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isDynamicModalOpen, setIsDynamicModalOpen] = useState(false);

  const qrGen = useQRGenerator('url');

  const currentConfig = QR_TYPE_CONFIGS[qrGen.selectedType];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'scanner') {
            setIsScannerOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        savedCount={qrGen.savedItems.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenDynamicModal={() => setIsDynamicModalOpen(true)}
      />

      {/* Inspiring Brand Quote Banner */}
      <section
        id="quote-banner"
        className="w-full bg-gradient-to-r from-sky-900/60 via-blue-950 to-indigo-950/60 border-b border-sky-800/40 py-3 px-4 sm:px-6 relative overflow-hidden shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center">
          <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Quote className="w-3 h-3 text-sky-300" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-200 font-medium tracking-wide">
            <span className="text-sky-300 font-semibold">&ldquo;{t.quoteFirst}&rdquo;</span>
            <span className="text-zinc-300"> {t.quoteSecond}</span>
          </p>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 hidden sm:inline-block animate-pulse" />
        </div>
      </section>

      {/* Main Container */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: GENERATOR WORKSPACE */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            {/* Top QR Code Content Type Selector */}
            <div
              id="type-selector-card"
              className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-5 shadow-xl ring-1 ring-sky-500/10"
            >
              <TypeSelector
                selectedType={qrGen.selectedType}
                onSelectType={qrGen.setSelectedType}
              />

              {/* Quick Link to Dedicated SEO Guide & Page for this type */}
              {currentConfig && (
                <div className="mt-3 pt-3 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <span className="text-zinc-400">
                    Currently creating a <strong className="text-white">{currentConfig.title}</strong>
                  </span>
                  <Link
                    to={currentConfig.route}
                    className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold transition-colors group"
                  >
                    <span>Open dedicated {currentConfig.breadcrumbLabel} page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </div>

            {/* Combined Box: Input Data & Live QR Generator Present Beside Each Other + Customizer */}
            <QRCodeWorkspace
              selectedType={qrGen.selectedType}
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

            {/* SAFE AD PLACEMENT: STRICTLY AFTER THE COMPLETE GENERATOR FLOW */}
            <AdPlaceholder
              slotId="ad-home-post-generator"
              format="horizontal"
              className="mt-8 mb-4"
            />

            {/* Explore All 14 Dedicated Generator Pages */}
            <RelatedQRTools currentType={qrGen.selectedType} />

            {/* FAQ & Guidelines Section */}
            <FaqSection />
          </div>
        )}

        {/* TAB 2: SCANNER & DECODER */}
        {activeTab === 'scanner' && (
          <QrScannerView
            onLoadIntoGenerator={(text) => {
              qrGen.handleLoadScannedContent(text);
              setActiveTab('generator');
            }}
          />
        )}

        {/* TAB 3: BATCH GENERATOR */}
        {activeTab === 'batch' && <BatchGenerator style={qrGen.style} />}

        {/* TAB 4: SAVED HISTORY */}
        {activeTab === 'history' && (
          <HistoryDrawer
            isOpen={true}
            onClose={() => setActiveTab('generator')}
            items={qrGen.savedItems}
            onSelectItem={(item) => {
              qrGen.handleLoadSavedItem(item);
              setActiveTab('generator');
            }}
            onDeleteItem={qrGen.handleDeleteSavedItem}
            onClearAll={qrGen.handleClearAllHistory}
          />
        )}
      </main>

      {/* Modals */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onApplyDecoded={(text) => {
          qrGen.handleLoadScannedContent(text);
          setIsScannerOpen(false);
          setActiveTab('generator');
        }}
      />

      <PrintModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        payload={qrGen.currentPayload}
        dataType={qrGen.selectedType}
        style={qrGen.style}
      />

      <DynamicQrModal
        isOpen={isDynamicModalOpen}
        onClose={() => setIsDynamicModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onSelectType={(type) => {
          qrGen.setSelectedType(type);
          setActiveTab('generator');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDynamicModal={() => setIsDynamicModalOpen(true)}
      />
    </div>
  );
};
