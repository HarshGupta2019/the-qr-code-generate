import React from 'react';
import {
  QrDataType,
  VCardData,
  WifiData,
  WhatsAppData,
  EmailData,
  SmsData,
  EventData,
  LocationData,
  CryptoData,
  SocialData,
  AppStoreData,
  PaymentData,
  QrStyleOptions,
  SavedQrItem,
} from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { Upload } from 'lucide-react';

import { UrlForm } from './forms/UrlForm';
import { TextForm } from './forms/TextForm';
import { VCardForm } from './forms/VCardForm';
import { WifiForm } from './forms/WifiForm';
import { WhatsAppForm } from './forms/WhatsAppForm';
import { EmailForm } from './forms/EmailForm';
import { PhoneForm, SmsForm } from './forms/PhoneForm';
import { EventForm } from './forms/EventForm';
import { LocationForm } from './forms/LocationForm';
import { CryptoForm } from './forms/CryptoForm';
import { SocialLinksForm } from './forms/SocialLinksForm';
import { AppStoreForm, PaymentForm } from './forms/AppStoreForm';
import { QrPreviewCard } from './QrPreviewCard';
import { QrCustomizer } from './QrCustomizer';

interface QRCodeWorkspaceProps {
  selectedType: QrDataType;
  url: string;
  setUrl: (v: string) => void;
  isDynamic: boolean;
  setIsDynamic: (v: boolean) => void;
  text: string;
  setText: (v: string) => void;
  vcard: VCardData;
  setVcard: React.Dispatch<React.SetStateAction<VCardData>>;
  wifi: WifiData;
  setWifi: React.Dispatch<React.SetStateAction<WifiData>>;
  whatsapp: WhatsAppData;
  setWhatsapp: React.Dispatch<React.SetStateAction<WhatsAppData>>;
  email: EmailData;
  setEmail: React.Dispatch<React.SetStateAction<EmailData>>;
  phone: string;
  setPhone: (v: string) => void;
  sms: SmsData;
  setSms: React.Dispatch<React.SetStateAction<SmsData>>;
  event: EventData;
  setEvent: React.Dispatch<React.SetStateAction<EventData>>;
  location: LocationData;
  setLocation: React.Dispatch<React.SetStateAction<LocationData>>;
  crypto: CryptoData;
  setCrypto: React.Dispatch<React.SetStateAction<CryptoData>>;
  social: SocialData;
  setSocial: React.Dispatch<React.SetStateAction<SocialData>>;
  appStore: AppStoreData;
  setAppStore: React.Dispatch<React.SetStateAction<AppStoreData>>;
  payment: PaymentData;
  setPayment: React.Dispatch<React.SetStateAction<PaymentData>>;

  style: QrStyleOptions;
  setStyle: React.Dispatch<React.SetStateAction<QrStyleOptions>>;
  currentPayload: string;
  dataSummary: string;

  onOpenScanner: () => void;
  onOpenPrintModal: () => void;
  onSaveToHistory: (item: Omit<SavedQrItem, 'id' | 'createdAt'>) => void;
}

export const QRCodeWorkspace: React.FC<QRCodeWorkspaceProps> = ({
  selectedType,
  url,
  setUrl,
  isDynamic,
  setIsDynamic,
  text,
  setText,
  vcard,
  setVcard,
  wifi,
  setWifi,
  whatsapp,
  setWhatsapp,
  email,
  setEmail,
  phone,
  setPhone,
  sms,
  setSms,
  event,
  setEvent,
  location,
  setLocation,
  crypto,
  setCrypto,
  social,
  setSocial,
  appStore,
  setAppStore,
  payment,
  setPayment,
  style,
  setStyle,
  currentPayload,
  dataSummary,
  onOpenScanner,
  onOpenPrintModal,
  onSaveToHistory,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Top Main Workspace: Form on Left + Live Preview on Right */}
      <div
        id="generator-workspace"
        className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 sm:p-6 shadow-xl ring-1 ring-sky-500/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Side: Form Input Area (7 cols) */}
          <div id="input-form-container" className="lg:col-span-7 flex flex-col justify-start">
            <div className="pb-3 border-b border-zinc-800/80 mb-4 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
                {t.stepEnterData}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-quick-upload-qr"
                  onClick={onOpenScanner}
                  className="px-2.5 py-1 text-xs font-semibold text-sky-300 hover:text-white bg-sky-500/15 hover:bg-sky-600/30 border border-sky-500/30 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  title="Upload an existing QR image to decode its code and edit it live"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{t.uploadScanBtn}</span>
                </button>
                <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                  {(t.types && t.types[selectedType]) || selectedType}
                </span>
              </div>
            </div>

            {selectedType === 'url' && (
              <UrlForm
                url={url}
                setUrl={setUrl}
                isDynamic={isDynamic}
                setIsDynamic={setIsDynamic}
              />
            )}
            {selectedType === 'text' && <TextForm text={text} setText={setText} />}
            {selectedType === 'vcard' && <VCardForm vcard={vcard} setVcard={setVcard} />}
            {selectedType === 'wifi' && <WifiForm wifi={wifi} setWifi={setWifi} />}
            {selectedType === 'whatsapp' && (
              <WhatsAppForm whatsapp={whatsapp} setWhatsapp={setWhatsapp} />
            )}
            {selectedType === 'email' && <EmailForm email={email} setEmail={setEmail} />}
            {selectedType === 'phone' && <PhoneForm phone={phone} setPhone={setPhone} />}
            {selectedType === 'sms' && <SmsForm sms={sms} setSms={setSms} />}
            {selectedType === 'event' && <EventForm event={event} setEvent={setEvent} />}
            {selectedType === 'location' && (
              <LocationForm location={location} setLocation={setLocation} />
            )}
            {selectedType === 'crypto' && <CryptoForm crypto={crypto} setCrypto={setCrypto} />}
            {selectedType === 'social' && <SocialLinksForm social={social} setSocial={setSocial} />}
            {selectedType === 'app' && <AppStoreForm app={appStore} setApp={setAppStore} />}
            {selectedType === 'payment' && (
              <PaymentForm payment={payment} setPayment={setPayment} />
            )}
          </div>

          {/* Right Side: Live QR Preview Card (5 cols) */}
          <div id="live-qr-container" className="lg:col-span-5 flex flex-col">
            <QrPreviewCard
              payload={currentPayload}
              dataType={selectedType}
              style={style}
              dataSummary={dataSummary}
              onSaveToHistory={onSaveToHistory}
              onOpenPrintModal={onOpenPrintModal}
            />
          </div>
        </div>
      </div>

      {/* Bottom Step 2: Styling, Color, Frames & Quality Customizer */}
      <QrCustomizer
        style={style}
        onChangeStyle={setStyle}
        currentDataType={selectedType}
      />
    </div>
  );
};
