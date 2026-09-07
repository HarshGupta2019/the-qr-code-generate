export type QrDataType =
  | 'url'
  | 'text'
  | 'vcard'
  | 'wifi'
  | 'whatsapp'
  | 'email'
  | 'phone'
  | 'sms'
  | 'event'
  | 'location'
  | 'crypto'
  | 'social'
  | 'app'
  | 'payment';

export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType =
  | 'square'
  | 'dot'
  | 'extra-rounded'
  | 'classy';

export type CornerDotType =
  | 'square'
  | 'dot';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type FrameType =
  | 'none'
  | 'bottom-banner'
  | 'top-banner'
  | 'rounded-pill'
  | 'phone-frame'
  | 'polaroid'
  | 'bubble'
  | 'ticket';

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  jobTitle: string;
  phoneCell: string;
  phoneWork: string;
  email: string;
  url: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  note: string;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface WhatsAppData {
  countryCode: string;
  phoneNumber: string;
  message: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface SmsData {
  phoneNumber: string;
  message: string;
}

export interface EventData {
  title: string;
  location: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  allDay: boolean;
}

export interface LocationData {
  latitude: number | string;
  longitude: number | string;
  address: string;
  query: string;
}

export interface CryptoData {
  currency: 'BTC' | 'ETH' | 'USDT' | 'SOL' | 'DOGE';
  address: string;
  amount: string;
  message: string;
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'youtube' | 'tiktok' | 'github' | 'website';
  url: string;
}

export interface SocialData {
  title: string;
  bio: string;
  links: SocialLink[];
}

export interface AppStoreData {
  appName: string;
  iosUrl: string;
  androidUrl: string;
  fallbackUrl: string;
}

export interface PaymentData {
  provider: 'paypal' | 'venmo' | 'cashapp' | 'upi';
  identifier: string;
  payeeName?: string;
  amount: string;
  note: string;
  reference?: string;
}

export interface QrStyleOptions {
  // Dots
  dotType: DotType;
  dotColor: string;
  useGradient: boolean;
  gradientType: 'linear' | 'radial';
  gradientColor1: string;
  gradientColor2: string;
  gradientRotation: number;

  // Background
  bgColor: string;
  transparentBg: boolean;

  // Corner Squares & Dots
  cornerSquareType: CornerSquareType;
  cornerSquareColor: string;
  cornerDotType: CornerDotType;
  cornerDotColor: string;

  // Logo
  logoUrl: string | null;
  logoSize: number; // 0.15 to 0.35
  logoMargin: number; // 0 to 10
  logoBgColor: string;
  logoShape: 'circle' | 'square' | 'rounded';

  // Frame
  frameType: FrameType;
  frameText: string;
  frameColor: string;
  frameTextColor: string;
  frameFont: string;

  // Quality & Settings
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number; // in modules/pixels
}

export interface SavedQrItem {
  id: string;
  title: string;
  type: QrDataType;
  content: string;
  createdAt: number;
  dataSummary: string;
  style: QrStyleOptions;
  thumbnailUrl?: string;
}

export interface BatchItem {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'ready' | 'error';
  error?: string;
}
