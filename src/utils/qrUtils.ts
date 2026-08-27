import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
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
} from '../types';

export const DEFAULT_STYLE_OPTIONS: QrStyleOptions = {
  dotType: 'square',
  dotColor: '#1e293b',
  useGradient: false,
  gradientType: 'linear',
  gradientColor1: '#2563eb',
  gradientColor2: '#9333ea',
  gradientRotation: 45,

  bgColor: '#ffffff',
  transparentBg: false,

  cornerSquareType: 'square',
  cornerSquareColor: '#1e293b',
  cornerDotType: 'square',
  cornerDotColor: '#1e293b',

  logoUrl: null,
  logoSize: 0.22,
  logoMargin: 6,
  logoBgColor: '#ffffff',
  logoShape: 'rounded',

  frameType: 'none',
  frameText: 'SCAN ME',
  frameColor: '#2563eb',
  frameTextColor: '#ffffff',
  frameFont: 'Plus Jakarta Sans, sans-serif',

  errorCorrectionLevel: 'M',
  margin: 2,
};

/**
 * Format payload according to data type
 */
export function formatQrPayload(
  type: QrDataType,
  data: {
    url?: string;
    text?: string;
    vcard?: VCardData;
    wifi?: WifiData;
    whatsapp?: WhatsAppData;
    email?: EmailData;
    phone?: string;
    sms?: SmsData;
    event?: EventData;
    location?: LocationData;
    crypto?: CryptoData;
    social?: SocialData;
    app?: AppStoreData;
    payment?: PaymentData;
  }
): string {
  switch (type) {
    case 'url': {
      let raw = (data.url || '').trim();
      if (!raw) return 'https://example.com';
      if (!/^https?:\/\//i.test(raw) && !raw.startsWith('//')) {
        raw = 'https://' + raw;
      }
      return raw;
    }
    case 'text':
      return data.text || 'Hello World';

    case 'vcard': {
      const v = data.vcard;
      if (!v) return 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName || ''};${v.firstName || ''};;;`,
        `FN:${[v.firstName, v.lastName].filter(Boolean).join(' ') || 'Contact'}`,
      ];
      if (v.organization) lines.push(`ORG:${v.organization}`);
      if (v.jobTitle) lines.push(`TITLE:${v.jobTitle}`);
      if (v.phoneCell) lines.push(`TEL;TYPE=CELL:${v.phoneCell}`);
      if (v.phoneWork) lines.push(`TEL;TYPE=WORK:${v.phoneWork}`);
      if (v.email) lines.push(`EMAIL:${v.email}`);
      if (v.url) lines.push(`URL:${v.url.startsWith('http') ? v.url : 'https://' + v.url}`);
      if (v.street || v.city || v.state || v.zip || v.country) {
        lines.push(`ADR;TYPE=WORK:;;${v.street || ''};${v.city || ''};${v.state || ''};${v.zip || ''};${v.country || ''}`);
      }
      if (v.note) lines.push(`NOTE:${v.note}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    case 'wifi': {
      const w = data.wifi;
      if (!w) return 'WIFI:S:WiFi_Network;T:WPA;P:password;;';
      
      // Standard escaping for Wi-Fi SSID & Password according to ZXing & RFC spec
      // Only escape reserved characters: \ ; , : "
      const escapeWifi = (str: string) => (str || '').replace(/([\\;,":])/g, '\\$1');
      const rawSsid = (w.ssid || '').trim();
      const ssid = escapeWifi(rawSsid || 'WiFi_Network');
      const enc = w.encryption || 'WPA';
      const isNoPass = enc === 'nopass';
      const isHidden = Boolean(w.hidden);

      // ZXing & iOS/Android standard format: WIFI:S:<SSID>;T:<TYPE>;P:<PASSWORD>;H:<HIDDEN>;;
      let payload = `WIFI:S:${ssid};T:${enc};`;
      if (!isNoPass) {
        payload += `P:${escapeWifi(w.password || '')};`;
      }
      if (isHidden) {
        payload += `H:true;`;
      }
      payload += ';';
      return payload;
    }

    case 'whatsapp': {
      const wa = data.whatsapp;
      if (!wa) return 'https://wa.me/1234567890';
      const cleanNumber = (wa.countryCode + wa.phoneNumber).replace(/\D/g, '');
      const encodedMsg = wa.message ? `?text=${encodeURIComponent(wa.message)}` : '';
      return `https://wa.me/${cleanNumber}${encodedMsg}`;
    }

    case 'email': {
      const em = data.email;
      if (!em) return 'mailto:hello@example.com';
      const params = new URLSearchParams();
      if (em.subject) params.append('subject', em.subject);
      if (em.body) params.append('body', em.body);
      const query = params.toString() ? `?${params.toString()}` : '';
      return `mailto:${em.email || ''}${query}`;
    }

    case 'phone': {
      const phone = (data.phone || '').trim();
      return phone ? `tel:${phone}` : 'tel:+1234567890';
    }

    case 'sms': {
      const sms = data.sms;
      if (!sms) return 'SMSTO:+1234567890:Hello';
      return `SMSTO:${sms.phoneNumber || ''}:${sms.message || ''}`;
    }

    case 'event': {
      const ev = data.event;
      if (!ev) return 'BEGIN:VEVENT\nSUMMARY:Meeting\nEND:VEVENT';
      const formatCalDate = (dateStr: string, timeStr: string, isAllDay: boolean) => {
        if (!dateStr) return '';
        const d = dateStr.replace(/-/g, '');
        if (isAllDay || !timeStr) return d;
        const t = timeStr.replace(/:/g, '') + '00';
        return `${d}T${t}`;
      };

      const start = formatCalDate(ev.startDate, ev.startTime, ev.allDay);
      const end = formatCalDate(ev.endDate || ev.startDate, ev.endTime || ev.startTime, ev.allDay);

      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title || 'Event'}`,
      ];
      if (start) lines.push(ev.allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`);
      if (end) lines.push(ev.allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`);
      if (ev.location) lines.push(`LOCATION:${ev.location}`);
      if (ev.description) lines.push(`DESCRIPTION:${ev.description}`);
      lines.push('END:VEVENT');
      lines.push('END:VCALENDAR');
      return lines.join('\n');
    }

    case 'location': {
      const loc = data.location;
      if (!loc) return 'geo:37.7749,-122.4194';
      if (loc.latitude && loc.longitude) {
        return `https://maps.google.com/?q=${loc.latitude},${loc.longitude}`;
      }
      if (loc.query || loc.address) {
        return `https://maps.google.com/?q=${encodeURIComponent(loc.query || loc.address)}`;
      }
      return 'https://maps.google.com/?q=37.7749,-122.4194';
    }

    case 'crypto': {
      const cr = data.crypto;
      if (!cr) return 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
      const prefix = cr.currency.toLowerCase();
      let uri = `${prefix}:${cr.address || ''}`;
      const params = new URLSearchParams();
      if (cr.amount) params.append('amount', cr.amount);
      if (cr.message) params.append('message', cr.message);
      if (params.toString()) uri += `?${params.toString()}`;
      return uri;
    }

    case 'social': {
      const s = data.social;
      if (!s || !s.links || s.links.length === 0) {
        return 'https://linktr.ee/example';
      }
      if (s.links.length === 1) {
        return s.links[0].url;
      }
      // Combine multiple links into a structured landing query
      const validLinks = s.links.filter((l) => l.url);
      if (validLinks.length === 1) return validLinks[0].url;
      return `https://theqrcodegenerate.app/p?title=${encodeURIComponent(s.title || 'My Links')}&links=${encodeURIComponent(JSON.stringify(validLinks))}`;
    }

    case 'app': {
      const app = data.app;
      if (!app) return 'https://apps.apple.com';
      return app.fallbackUrl || app.iosUrl || app.androidUrl || 'https://apps.apple.com';
    }

    case 'payment': {
      const p = data.payment;
      if (!p) return 'https://paypal.me';
      switch (p.provider) {
        case 'paypal':
          return `https://paypal.me/${p.identifier}${p.amount ? '/' + p.amount : ''}`;
        case 'venmo':
          return `https://venmo.com/${p.identifier.replace(/^@/, '')}?txn=pay&note=${encodeURIComponent(p.note || '')}${p.amount ? '&amount=' + p.amount : ''}`;
        case 'cashapp':
          return `https://cash.app/$${p.identifier.replace(/^\$/, '')}${p.amount ? '/' + p.amount : ''}`;
        case 'upi':
          return `upi://pay?pa=${p.identifier}&pn=Merchant&am=${p.amount || '0'}&cu=INR&tn=${encodeURIComponent(p.note || 'Payment')}`;
        default:
          return `https://paypal.me/${p.identifier}`;
      }
    }

    default:
      return 'https://www.the-qrcode-generator.com';
  }
}

/**
 * Generate standard QR matrix & modules
 */
export async function getQrMatrix(text: string, errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M', _margin = 2) {
  try {
    const qrData = QRCode.create(text || ' ', {
      errorCorrectionLevel,
    });
    return qrData.modules;
  } catch (err) {
    console.error('QR creation error', err);
    const fallback = QRCode.create('https://the-qrcode-generator.com', {
      errorCorrectionLevel: 'M',
    });
    return fallback.modules;
  }
}

/**
 * Check if a cell is part of the 3 corner position detection squares (7x7 module finder patterns)
 */
export function isFinderPattern(row: number, col: number, size: number, margin = 2): boolean {
  const innerSize = size - margin * 2;
  const r = row - margin;
  const c = col - margin;

  // Top-Left (0..6, 0..6)
  if (r >= 0 && r < 7 && c >= 0 && c < 7) return true;
  // Top-Right (0..6, innerSize-7..innerSize-1)
  if (r >= 0 && r < 7 && c >= innerSize - 7 && c < innerSize) return true;
  // Bottom-Left (innerSize-7..innerSize-1, 0..6)
  if (r >= innerSize - 7 && r < innerSize && c >= 0 && c < 7) return true;

  return false;
}

/**
 * Identify finder pattern parts (outer 7x7 square vs inner 3x3 dot)
 */
export function getFinderPart(row: number, col: number, size: number, margin = 2): 'outer' | 'inner' | 'none' {
  const innerSize = size - margin * 2;
  const r = row - margin;
  const c = col - margin;

  const checkCorner = (cornerR: number, cornerC: number) => {
    const dr = r - cornerR;
    const dc = c - cornerC;
    if (dr >= 0 && dr < 7 && dc >= 0 && dc < 7) {
      if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) {
        return 'inner';
      }
      if (dr === 0 || dr === 6 || dc === 0 || dc === 6) {
        return 'outer';
      }
      return 'none';
    }
    return null;
  };

  const tl = checkCorner(0, 0);
  if (tl) return tl;
  const tr = checkCorner(0, innerSize - 7);
  if (tr) return tr;
  const bl = checkCorner(innerSize - 7, 0);
  if (bl) return bl;

  return 'none';
}

/**
 * Render custom QR code directly onto a Canvas element with high precision
 */
export async function renderQrToCanvas(
  canvas: HTMLCanvasElement,
  content: string,
  style: QrStyleOptions,
  targetSize = 1024
): Promise<void> {
  const matrix = await getQrMatrix(content, style.errorCorrectionLevel, style.margin);
  const moduleCount = matrix.size;

  // Set up frame dimensions
  const hasFrame = style.frameType !== 'none';
  let frameTopPadding = 0;
  let frameBottomPadding = 0;
  let frameHorizontalPadding = 0;

  if (hasFrame) {
    switch (style.frameType) {
      case 'bottom-banner':
      case 'rounded-pill':
      case 'polaroid':
      case 'ticket':
        frameBottomPadding = Math.round(targetSize * 0.18);
        frameTopPadding = Math.round(targetSize * 0.05);
        frameHorizontalPadding = Math.round(targetSize * 0.05);
        break;
      case 'top-banner':
        frameTopPadding = Math.round(targetSize * 0.18);
        frameBottomPadding = Math.round(targetSize * 0.05);
        frameHorizontalPadding = Math.round(targetSize * 0.05);
        break;
      case 'phone-frame':
        frameTopPadding = Math.round(targetSize * 0.15);
        frameBottomPadding = Math.round(targetSize * 0.20);
        frameHorizontalPadding = Math.round(targetSize * 0.08);
        break;
      case 'bubble':
        frameTopPadding = Math.round(targetSize * 0.06);
        frameBottomPadding = Math.round(targetSize * 0.20);
        frameHorizontalPadding = Math.round(targetSize * 0.06);
        break;
    }
  }

  const canvasWidth = targetSize + frameHorizontalPadding * 2;
  const canvasHeight = targetSize + frameTopPadding + frameBottomPadding;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw Frame Background if frame is enabled
  if (hasFrame) {
    ctx.save();
    ctx.fillStyle = style.frameColor || '#2563eb';

    if (style.frameType === 'rounded-pill' || style.frameType === 'phone-frame') {
      const radius = style.frameType === 'phone-frame' ? 36 : 28;
      drawRoundedRect(ctx, 0, 0, canvasWidth, canvasHeight, radius);
      ctx.fill();
    } else if (style.frameType === 'polaroid' || style.frameType === 'bottom-banner' || style.frameType === 'top-banner') {
      drawRoundedRect(ctx, 0, 0, canvasWidth, canvasHeight, 20);
      ctx.fill();
    } else if (style.frameType === 'ticket') {
      drawTicket(ctx, 0, 0, canvasWidth, canvasHeight, 20);
      ctx.fill();
    } else if (style.frameType === 'bubble') {
      drawBubble(ctx, 0, 0, canvasWidth, canvasHeight, 24);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    ctx.restore();
  }

  // Draw QR background
  const qrX = frameHorizontalPadding;
  const qrY = frameTopPadding;
  const qrW = targetSize;
  const qrH = targetSize;

  ctx.save();
  if (!style.transparentBg) {
    ctx.fillStyle = style.bgColor;
    if (hasFrame) {
      drawRoundedRect(ctx, qrX, qrY, qrW, qrH, 16);
      ctx.fill();
    } else {
      ctx.fillRect(qrX, qrY, qrW, qrH);
    }
  }
  ctx.restore();

  // Calculate module dimension
  const moduleSize = targetSize / moduleCount;

  // Build foreground style / gradient
  let fgStyle: string | CanvasGradient = style.dotColor;
  if (style.useGradient) {
    if (style.gradientType === 'linear') {
      const rad = (style.gradientRotation * Math.PI) / 180;
      const x1 = qrX + qrW / 2 - (Math.cos(rad) * qrW) / 2;
      const y1 = qrY + qrH / 2 - (Math.sin(rad) * qrH) / 2;
      const x2 = qrX + qrW / 2 + (Math.cos(rad) * qrW) / 2;
      const y2 = qrY + qrH / 2 + (Math.sin(rad) * qrH) / 2;
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, style.gradientColor1);
      grad.addColorStop(1, style.gradientColor2);
      fgStyle = grad;
    } else {
      const grad = ctx.createRadialGradient(
        qrX + qrW / 2,
        qrY + qrH / 2,
        moduleSize,
        qrX + qrW / 2,
        qrY + qrH / 2,
        qrW / 1.4
      );
      grad.addColorStop(0, style.gradientColor1);
      grad.addColorStop(1, style.gradientColor2);
      fgStyle = grad;
    }
  }

  // Draw modules
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      const isDark = matrix.get(row, col);
      if (!isDark) continue;

      const isFinder = isFinderPattern(row, col, moduleCount, style.margin);
      const cellX = qrX + col * moduleSize;
      const cellY = qrY + row * moduleSize;

      if (isFinder) {
        // Render finder eyes with custom corner eye styles
        const finderPart = getFinderPart(row, col, moduleCount, style.margin);
        ctx.save();
        if (finderPart === 'inner') {
          ctx.fillStyle = style.cornerDotColor || style.dotColor;
          drawCornerDotShape(ctx, cellX, cellY, moduleSize, style.cornerDotType);
        } else if (finderPart === 'outer') {
          ctx.fillStyle = style.cornerSquareColor || style.dotColor;
          drawCornerSquareShape(ctx, cellX, cellY, moduleSize, style.cornerSquareType);
        } else {
          ctx.fillStyle = fgStyle;
          ctx.fillRect(cellX, cellY, moduleSize, moduleSize);
        }
        ctx.restore();
      } else {
        // Standard data dot
        ctx.save();
        ctx.fillStyle = fgStyle;
        drawDataDotShape(ctx, cellX, cellY, moduleSize, style.dotType);
        ctx.restore();
      }
    }
  }

  // Draw Logo in center if present
  if (style.logoUrl) {
    try {
      await drawLogoInCenter(ctx, style.logoUrl, qrX, qrY, qrW, qrH, style);
    } catch (e) {
      console.warn('Failed to render logo', e);
    }
  }

  // Draw Frame Text / Banner Call-To-Action
  if (hasFrame && style.frameText) {
    ctx.save();
    ctx.fillStyle = style.frameTextColor || '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(targetSize * 0.055)}px ${style.frameFont}`;

    let textX = canvasWidth / 2;
    let textY = canvasHeight - frameBottomPadding / 2;

    if (style.frameType === 'top-banner') {
      textY = frameTopPadding / 2;
    } else if (style.frameType === 'phone-frame') {
      textY = canvasHeight - frameBottomPadding / 2 + 5;
    } else if (style.frameType === 'bubble') {
      textY = canvasHeight - frameBottomPadding / 2;
    }

    ctx.fillText(style.frameText.toUpperCase(), textX, textY);
    ctx.restore();
  }
}

/**
 * Helper to draw data dots with various shapes
 */
function drawDataDotShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  type: QrStyleOptions['dotType']
) {
  const pad = 0.3; // prevent subpixel gap bleeding
  const s = size + pad;

  switch (type) {
    case 'dots': {
      const radius = size * 0.44;
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, radius, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'rounded': {
      drawRoundedRect(ctx, x, y, size, size, size * 0.35);
      ctx.fill();
      break;
    }
    case 'extra-rounded': {
      drawRoundedRect(ctx, x, y, size, size, size * 0.5);
      ctx.fill();
      break;
    }
    case 'classy': {
      // diamond / rounded classy
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y);
      ctx.lineTo(x + size, y + size / 2);
      ctx.lineTo(x + size / 2, y + size);
      ctx.lineTo(x, y + size / 2);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'classy-rounded': {
      ctx.beginPath();
      ctx.moveTo(x + size * 0.2, y);
      ctx.lineTo(x + size * 0.8, y);
      ctx.arcTo(x + size, y, x + size, y + size * 0.2, size * 0.2);
      ctx.lineTo(x + size, y + size * 0.8);
      ctx.arcTo(x + size, y + size, x + size * 0.8, y + size, size * 0.2);
      ctx.lineTo(x + size * 0.2, y + size);
      ctx.arcTo(x, y + size, x, y + size * 0.8, size * 0.2);
      ctx.lineTo(x, y + size * 0.2);
      ctx.arcTo(x, y, x + size * 0.2, y, size * 0.2);
      ctx.fill();
      break;
    }
    case 'square':
    default:
      ctx.fillRect(x, y, s, s);
      break;
  }
}

/**
 * Helper to draw corner outer square shape
 */
function drawCornerSquareShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  type: QrStyleOptions['cornerSquareType']
) {
  switch (type) {
    case 'dot': {
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size * 0.46, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'extra-rounded':
    case 'classy': {
      drawRoundedRect(ctx, x, y, size, size, size * 0.35);
      ctx.fill();
      break;
    }
    case 'square':
    default:
      ctx.fillRect(x, y, size + 0.2, size + 0.2);
      break;
  }
}

/**
 * Helper to draw corner inner dot shape
 */
function drawCornerDotShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  type: QrStyleOptions['cornerDotType']
) {
  if (type === 'dot') {
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size * 0.46, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, size + 0.2, size + 0.2);
  }
}

/**
 * Helper for rounded rectangle path
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * Helper for Ticket cutouts
 */
function drawTicket(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  drawRoundedRect(ctx, x, y, w, h, r);
}

/**
 * Helper for Speech bubble frame
 */
function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  drawRoundedRect(ctx, x, y, w, h, r);
}

/**
 * Draw logo in center with optional background container
 */
async function drawLogoInCenter(
  ctx: CanvasRenderingContext2D,
  logoSrc: string,
  qrX: number,
  qrY: number,
  qrW: number,
  qrH: number,
  style: QrStyleOptions
) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const logoWidth = qrW * Math.min(Math.max(style.logoSize, 0.15), 0.35);
      const logoHeight = logoWidth * (img.naturalHeight / img.naturalWidth || 1);

      const margin = style.logoMargin;
      const boxW = logoWidth + margin * 2;
      const boxH = logoHeight + margin * 2;

      const boxX = qrX + (qrW - boxW) / 2;
      const boxY = qrY + (qrH - boxH) / 2;

      ctx.save();
      // Draw background pod behind logo to preserve readability
      ctx.fillStyle = style.logoBgColor || '#ffffff';
      if (style.logoShape === 'circle') {
        ctx.beginPath();
        ctx.arc(boxX + boxW / 2, boxY + boxH / 2, Math.max(boxW, boxH) / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (style.logoShape === 'rounded') {
        drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 12);
        ctx.fill();
      } else {
        ctx.fillRect(boxX, boxY, boxW, boxH);
      }

      // Clip and draw image
      ctx.drawImage(img, boxX + margin, boxY + margin, logoWidth, logoHeight);
      ctx.restore();
      resolve();
    };
    img.onerror = (e) => {
      console.warn('Could not load logo image', e);
      resolve(); // resolve so rendering doesn't completely fail
    };
    img.src = logoSrc;
  });
}

/**
 * Calculate color contrast ratio (WCAG formula)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const a = [r, g, b].map((v) => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch {
    return 7;
  }
}

/**
 * Download QR Code as PNG file with chosen resolution
 */
export async function downloadQrPng(
  content: string,
  style: QrStyleOptions,
  size = 2048,
  filename = 'the-qr-code-generate.png'
) {
  const canvas = document.createElement('canvas');
  await renderQrToCanvas(canvas, content, style, size);

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download QR Code as SVG vector
 */
export async function downloadQrSvg(
  content: string,
  style: QrStyleOptions,
  filename = 'the-qr-code-generate.svg'
) {
  const matrix = await getQrMatrix(content, style.errorCorrectionLevel, style.margin);
  const size = matrix.size;
  const scale = 10;
  const total = size * scale;

  let rects = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix.get(r, c)) {
        rects += `<rect x="${c * scale}" y="${r * scale}" width="${scale}" height="${scale}" fill="${style.dotColor}" />\n`;
      }
    }
  }

  const bgRect = style.transparentBg
    ? ''
    : `<rect width="${total}" height="${total}" fill="${style.bgColor}" />\n`;

  const svgContent = `<?xml version="1.0" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}" viewBox="0 0 ${total} ${total}">
  ${bgRect}
  ${rects}
</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download QR Code in Print-Ready PDF
 */
export async function downloadQrPdf(
  content: string,
  style: QrStyleOptions,
  filename = 'the-qr-code-generate.pdf'
) {
  const canvas = document.createElement('canvas');
  await renderQrToCanvas(canvas, content, style, 1500);

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // A4 is 210 x 297 mm
  const pageWidth = 210;
  const qrSizeMm = 120;
  const x = (pageWidth - qrSizeMm) / 2;
  const y = 40;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(30, 41, 59);
  pdf.text('The QR Code Generate', pageWidth / 2, 25, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(100, 116, 139);
  pdf.text('Scan this code with any smartphone camera or QR reader', pageWidth / 2, 32, { align: 'center' });

  pdf.addImage(imgData, 'PNG', x, y, qrSizeMm, qrSizeMm * (canvas.height / canvas.width));

  pdf.setFontSize(9);
  pdf.setTextColor(148, 163, 184);
  pdf.text('Created with The QR Code Generate • https://the-qrcode-generator.com', pageWidth / 2, 285, {
    align: 'center',
  });

  pdf.save(filename);
}

/**
 * Copy QR Code image directly to Clipboard
 */
export async function copyQrToClipboard(content: string, style: QrStyleOptions): Promise<boolean> {
  try {
    const canvas = document.createElement('canvas');
    await renderQrToCanvas(canvas, content, style, 1024);
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return resolve(false);
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}

/**
 * Robust Wi-Fi QR Code parser compatible with ZXing, Apple iOS, Android, Samsung, and Huawei QR codes.
 */
export function parseWifiQrString(qrString: string): {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
} | null {
  if (!qrString || !qrString.toUpperCase().startsWith('WIFI:')) {
    return null;
  }

  const content = qrString.substring(qrString.indexOf(':') + 1);

  // Extract a field by tag (e.g. S, T, P, H) taking escaped semicolons into account
  const getField = (prefix: string): string | null => {
    const regex = new RegExp(`(?:^|;)${prefix}:((?:\\\\;|[^;])*)`, 'i');
    const match = content.match(regex);
    if (!match) return null;
    let val = match[1];
    // Remove outer quotes if wrapped in "..."
    if (val.startsWith('"') && val.endsWith('"') && val.length >= 2) {
      val = val.slice(1, -1);
    }
    // Unescape standard backslash sequences
    return val.replace(/\\([\\;,":])/g, '$1');
  };

  const rawSsid = getField('S');
  const rawPass = getField('P');
  const rawType = getField('T');
  const rawHidden = getField('H');

  const ssid = rawSsid !== null ? rawSsid : '';
  const password = rawPass !== null ? rawPass : '';

  let encryption: 'WPA' | 'WEP' | 'nopass' = 'WPA';
  if (rawType) {
    const t = rawType.toUpperCase();
    if (t === 'NOPASS' || t === 'NONE' || t === 'OPEN') {
      encryption = 'nopass';
    } else if (t === 'WEP') {
      encryption = 'WEP';
    } else {
      encryption = 'WPA';
    }
  } else if (!password) {
    encryption = 'nopass';
  }

  const hidden = rawHidden ? rawHidden.toLowerCase() === 'true' || rawHidden === '1' : false;

  return {
    ssid,
    password,
    encryption,
    hidden,
  };
}
