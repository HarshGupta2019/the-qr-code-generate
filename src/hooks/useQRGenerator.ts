import { useState, useMemo } from 'react';
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
import { DEFAULT_STYLE_OPTIONS, formatQrPayload, parseWifiQrString } from '../utils/qrUtils';

export function useQRGenerator(initialType: QrDataType = 'url') {
  const [selectedType, setSelectedType] = useState<QrDataType>(initialType);

  // Form State Data
  const [url, setUrl] = useState('https://www.the-qrcode-generator.com');
  const [isDynamic, setIsDynamic] = useState(false);
  const [text, setText] = useState('Welcome to The QR Code Generate! Scan to discover endless possibilities.');
  const [vcard, setVcard] = useState<VCardData>({
    firstName: 'Sarah',
    lastName: 'Connor',
    organization: 'Cyberdyne Systems',
    jobTitle: 'Chief Technology Officer',
    phoneCell: '+1 (555) 019-2834',
    phoneWork: '+1 (555) 019-2800',
    email: 'sarah.connor@example.com',
    url: 'https://the-qrcode-generator.com',
    street: '100 Silicon Way',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'USA',
    note: 'Let’s connect for enterprise collaborations!',
  });
  const [wifi, setWifi] = useState<WifiData>({
    ssid: 'Office_Guest_WiFi',
    password: 'Welcome2026!',
    encryption: 'WPA',
    hidden: false,
  });
  const [whatsapp, setWhatsapp] = useState<WhatsAppData>({
    countryCode: '+1',
    phoneNumber: '5550198888',
    message: 'Hello! I scanned your QR code and would like more details.',
  });
  const [email, setEmail] = useState<EmailData>({
    email: 'hello@the-qrcode-generator.com',
    subject: 'Project Inquiry via QR Code',
    body: 'Hi team, I would like to get a quote regarding...',
  });
  const [phone, setPhone] = useState('+18005550199');
  const [sms, setSms] = useState<SmsData>({
    phoneNumber: '+15550199999',
    message: 'START my special discount coupon promo!',
  });
  const [event, setEvent] = useState<EventData>({
    title: 'Global Tech & AI Summit 2026',
    location: 'Convention Center, Hall A & Online',
    description: 'Join thousands of developers and creators for live keynotes and interactive workshops.',
    startDate: '2026-09-15',
    startTime: '09:00',
    endDate: '2026-09-17',
    endTime: '18:00',
    allDay: false,
  });
  const [location, setLocation] = useState<LocationData>({
    latitude: '37.7749',
    longitude: '-122.4194',
    address: 'San Francisco, CA',
    query: 'San Francisco, CA',
  });
  const [crypto, setCrypto] = useState<CryptoData>({
    currency: 'BTC',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: '0.015',
    message: 'Invoice Payment',
  });
  const [social, setSocial] = useState<SocialData>({
    title: 'Alex Rivers • Creator & Designer',
    bio: 'Follow along for daily tech tutorials and design inspiration',
    links: [
      { platform: 'website', url: 'https://the-qrcode-generator.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'twitter', url: 'https://x.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
    ],
  });
  const [appStore, setAppStore] = useState<AppStoreData>({
    appName: 'The QR Code App',
    iosUrl: 'https://apps.apple.com/app/id123456789',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.theqrcodegenerate.app',
    fallbackUrl: 'https://the-qrcode-generator.com',
  });
  const [payment, setPayment] = useState<PaymentData>({
    provider: 'paypal',
    identifier: 'merchantsample',
    amount: '25.00',
    note: 'Thank you for your business!',
  });

  // Style State
  const [style, setStyle] = useState<QrStyleOptions>(DEFAULT_STYLE_OPTIONS);

  // Saved History Items
  const [savedItems, setSavedItems] = useState<SavedQrItem[]>(() => {
    try {
      const stored = localStorage.getItem('tqg_saved_qrs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleSaveToHistory = (item: Omit<SavedQrItem, 'id' | 'createdAt'>) => {
    const newItem: SavedQrItem = {
      ...item,
      id: `qr-${Date.now()}`,
      createdAt: Date.now(),
    };
    const updated = [newItem, ...savedItems];
    setSavedItems(updated);
    localStorage.setItem('tqg_saved_qrs', JSON.stringify(updated));
  };

  const handleDeleteSavedItem = (id: string) => {
    const updated = savedItems.filter((i) => i.id !== id);
    setSavedItems(updated);
    localStorage.setItem('tqg_saved_qrs', JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    setSavedItems([]);
    localStorage.removeItem('tqg_saved_qrs');
  };

  const handleLoadSavedItem = (item: SavedQrItem) => {
    setSelectedType(item.type);
    setStyle(item.style);
    if (item.type === 'url') setUrl(item.content);
    else if (item.type === 'text') setText(item.content);
    else if (item.type === 'phone') setPhone(item.content);
  };

  // Decode from scanner modal or scanner tab into the live editor
  const handleLoadScannedContent = (scannedText: string) => {
    const trimmed = scannedText.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      setSelectedType('url');
      setUrl(trimmed);
    } else if (trimmed.toUpperCase().startsWith('WIFI:')) {
      const wifiParsed = parseWifiQrString(trimmed);
      if (wifiParsed) {
        setSelectedType('wifi');
        setWifi({
          ssid: wifiParsed.ssid || 'WiFi_Network',
          password: wifiParsed.password || '',
          encryption: wifiParsed.encryption,
          hidden: wifiParsed.hidden,
        });
      }
    } else if (trimmed.toUpperCase().startsWith('BEGIN:VCARD')) {
      setSelectedType('vcard');
      const fn = trimmed.match(/FN:([^\n\r]+)/i);
      const tel = trimmed.match(/TEL(?:;[^:]+)?:([^\n\r]+)/i);
      const em = trimmed.match(/EMAIL(?:;[^:]+)?:([^\n\r]+)/i);
      const org = trimmed.match(/ORG:([^\n\r]+)/i);
      const title = trimmed.match(/TITLE:([^\n\r]+)/i);
      const names = (fn ? fn[1] : '').trim().split(' ');
      setVcard((prev) => ({
        ...prev,
        firstName: names[0] || prev.firstName,
        lastName: names.slice(1).join(' ') || prev.lastName,
        organization: org ? org[1].trim() : prev.organization,
        jobTitle: title ? title[1].trim() : prev.jobTitle,
        phoneCell: tel ? tel[1].trim() : prev.phoneCell,
        email: em ? em[1].trim() : prev.email,
      }));
    } else if (/^https?:\/\/wa\.me\//i.test(trimmed)) {
      setSelectedType('whatsapp');
      try {
        const waUrl = new URL(trimmed);
        const phoneNum = waUrl.pathname.replace('/', '');
        const textMsg = waUrl.searchParams.get('text') || '';
        setWhatsapp({
          countryCode: '',
          phoneNumber: phoneNum,
          message: textMsg,
        });
      } catch {
        setWhatsapp((prev) => ({ ...prev, phoneNumber: trimmed }));
      }
    } else if (trimmed.toLowerCase().startsWith('tel:')) {
      setSelectedType('phone');
      setPhone(trimmed.replace(/^[Tt][Ee][Ll]:/, ''));
    } else if (trimmed.toLowerCase().startsWith('mailto:')) {
      setSelectedType('email');
      const mailtoClean = trimmed.replace(/^mailto:/i, '');
      const parts = mailtoClean.split('?');
      const emailAddress = parts[0];
      const params = new URLSearchParams(parts[1] || '');
      setEmail({
        email: emailAddress,
        subject: params.get('subject') || '',
        body: params.get('body') || '',
      });
    } else if (trimmed.toLowerCase().startsWith('smsto:')) {
      setSelectedType('sms');
      const parts = trimmed.substring(6).split(':');
      setSms({
        phoneNumber: parts[0] || '',
        message: parts.slice(1).join(':') || '',
      });
    } else {
      setSelectedType('text');
      setText(trimmed);
    }
  };

  // Compute Current Form Payload
  const currentPayload = useMemo(() => {
    return formatQrPayload(selectedType, {
      url,
      text,
      vcard,
      wifi,
      whatsapp,
      email,
      phone,
      sms,
      event,
      location,
      crypto,
      social,
      app: appStore,
      payment,
    });
  }, [
    selectedType,
    url,
    text,
    vcard,
    wifi,
    whatsapp,
    email,
    phone,
    sms,
    event,
    location,
    crypto,
    social,
    appStore,
    payment,
  ]);

  const dataSummary = useMemo(() => {
    switch (selectedType) {
      case 'url':
        return url;
      case 'text':
        return text.substring(0, 30) + (text.length > 30 ? '...' : '');
      case 'vcard':
        return `${vcard.firstName} ${vcard.lastName} (${vcard.organization || 'Contact'})`;
      case 'wifi':
        return `SSID: ${wifi.ssid}`;
      case 'whatsapp':
        return `${whatsapp.countryCode}${whatsapp.phoneNumber}`;
      case 'email':
        return email.email;
      case 'phone':
        return phone;
      case 'sms':
        return sms.phoneNumber;
      case 'event':
        return event.title;
      case 'location':
        return location.address || `${location.latitude}, ${location.longitude}`;
      case 'crypto':
        return `${crypto.currency}: ${crypto.address.substring(0, 8)}...`;
      case 'social':
        return social.title;
      case 'app':
        return appStore.appName;
      case 'payment':
        return `${payment.provider.toUpperCase()}: ${payment.identifier}`;
      default:
        return 'Custom QR Code';
    }
  }, [
    selectedType,
    url,
    text,
    vcard,
    wifi,
    whatsapp,
    email,
    phone,
    sms,
    event,
    location,
    crypto,
    social,
    appStore,
    payment,
  ]);

  return {
    selectedType,
    setSelectedType,
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
    savedItems,
    handleSaveToHistory,
    handleDeleteSavedItem,
    handleClearAllHistory,
    handleLoadSavedItem,
    handleLoadScannedContent,
    currentPayload,
    dataSummary,
  };
}
