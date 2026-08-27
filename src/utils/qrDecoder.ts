import jsQR from 'jsqr';
import { parseWifiQrString } from './qrUtils';

export interface DecodedQrInfo {
  rawText: string;
  type: 'wifi' | 'url' | 'vcard' | 'email' | 'phone' | 'sms' | 'crypto' | 'payment' | 'text';
  title: string;
  description?: string;
  parsedData: Record<string, any>;
  imagePreviewUrl?: string;
}

/**
 * Parses raw decoded QR string into structured human-readable metadata
 */
export function analyzeQrPayload(rawText: string): DecodedQrInfo {
  const trimmed = (rawText || '').trim();

  // 1. Wi-Fi
  if (trimmed.toUpperCase().startsWith('WIFI:')) {
    const wifiData = parseWifiQrString(trimmed) || {
      ssid: 'Unknown Network',
      password: '',
      encryption: 'WPA',
      hidden: false,
    };
    return {
      rawText: trimmed,
      type: 'wifi',
      title: `Wi-Fi: ${wifiData.ssid}`,
      description: wifiData.password
        ? `Protected Network (${wifiData.encryption.toUpperCase()})`
        : 'Open Network (No Password)',
      parsedData: {
        ssid: wifiData.ssid,
        password: wifiData.password,
        encryption: wifiData.encryption,
        hidden: wifiData.hidden,
      },
    };
  }

  // 2. Web URL
  if (/^https?:\/\//i.test(trimmed)) {
    return {
      rawText: trimmed,
      type: 'url',
      title: 'Website Link (URL)',
      description: trimmed,
      parsedData: {
        url: trimmed,
      },
    };
  }

  // 3. Email
  if (/^mailto:/i.test(trimmed)) {
    const clean = trimmed.replace(/^mailto:/i, '');
    const [emailPart, queryPart] = clean.split('?');
    const params = new URLSearchParams(queryPart || '');
    return {
      rawText: trimmed,
      type: 'email',
      title: `Email to: ${emailPart}`,
      description: params.get('subject') ? `Subject: ${params.get('subject')}` : 'Direct Email link',
      parsedData: {
        email: emailPart,
        subject: params.get('subject') || '',
        body: params.get('body') || '',
      },
    };
  }

  // 4. Phone Number
  if (/^tel:/i.test(trimmed)) {
    const num = trimmed.replace(/^tel:/i, '');
    return {
      rawText: trimmed,
      type: 'phone',
      title: `Phone Call: ${num}`,
      description: 'Tap to dial phone number',
      parsedData: { phone: num },
    };
  }

  // 5. SMS
  if (/^smsto:/i.test(trimmed) || /^sms:/i.test(trimmed)) {
    const withoutPrefix = trimmed.replace(/^(smsto:|sms:)/i, '');
    const parts = withoutPrefix.split(':');
    const num = parts[0] || '';
    const body = parts.slice(1).join(':') || '';
    return {
      rawText: trimmed,
      type: 'sms',
      title: `SMS to: ${num}`,
      description: body ? `Message: "${body}"` : 'Direct SMS',
      parsedData: { phoneNumber: num, message: body },
    };
  }

  // 6. vCard / Contact Card
  if (trimmed.toUpperCase().startsWith('BEGIN:VCARD')) {
    const nameMatch = trimmed.match(/FN:([^\n\r]+)/i);
    const telMatch = trimmed.match(/TEL(?:;[^:]+)?:([^\n\r]+)/i);
    const emailMatch = trimmed.match(/EMAIL(?:;[^:]+)?:([^\n\r]+)/i);
    const orgMatch = trimmed.match(/ORG:([^\n\r]+)/i);
    const titleMatch = trimmed.match(/TITLE:([^\n\r]+)/i);

    const name = nameMatch ? nameMatch[1].trim() : 'Contact Card';
    return {
      rawText: trimmed,
      type: 'vcard',
      title: `Contact: ${name}`,
      description: orgMatch ? `${orgMatch[1]} ${titleMatch ? `• ${titleMatch[1]}` : ''}` : 'vCard 3.0 Contact',
      parsedData: {
        name,
        phone: telMatch ? telMatch[1].trim() : '',
        email: emailMatch ? emailMatch[1].trim() : '',
        org: orgMatch ? orgMatch[1].trim() : '',
        jobTitle: titleMatch ? titleMatch[1].trim() : '',
      },
    };
  }

  // 7. UPI / Payment
  if (/^upi:\/\/pay/i.test(trimmed)) {
    const urlObj = new URL(trimmed.replace(/^upi:\/\//i, 'http://dummy.com/'));
    const pa = urlObj.searchParams.get('pa') || '';
    const pn = urlObj.searchParams.get('pn') || '';
    const am = urlObj.searchParams.get('am') || '';
    return {
      rawText: trimmed,
      type: 'payment',
      title: `UPI Payment to: ${pn || pa}`,
      description: am ? `Amount: ₹${am}` : `VPA: ${pa}`,
      parsedData: { vpa: pa, payeeName: pn, amount: am },
    };
  }

  // 8. Plain text fallback
  return {
    rawText: trimmed,
    type: 'text',
    title: 'Text / Raw Content',
    description: trimmed.length > 80 ? `${trimmed.slice(0, 80)}...` : trimmed,
    parsedData: { text: trimmed },
  };
}

/**
 * Multi-pass high-accuracy QR code decoder for images.
 * Tries Native BarcodeDetector -> Multi-resolution jsQR -> Grayscale / Contrast Boost -> Inversion.
 */
export async function decodeQrFromImage(imageSource: HTMLImageElement | File | Blob): Promise<string> {
  let imgElement: HTMLImageElement;
  let isCreatedImg = false;

  if (imageSource instanceof HTMLImageElement) {
    imgElement = imageSource;
  } else {
    isCreatedImg = true;
    imgElement = await fileToImage(imageSource);
  }

  try {
    // Stage 1: Try browser native BarcodeDetector API (fastest & high tolerance for camera blur)
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        const barcodeDetector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
        const barcodes = await barcodeDetector.detect(imgElement);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          return barcodes[0].rawValue;
        }
      } catch (e) {
        // Fallback to jsQR canvas scanner
      }
    }

    // Stage 2: Canvas based multi-pass decoder
    const originalWidth = imgElement.naturalWidth || imgElement.width;
    const originalHeight = imgElement.naturalHeight || imgElement.height;

    if (!originalWidth || !originalHeight) {
      throw new Error('Invalid image dimensions');
    }

    const testScales = [
      { maxDim: 1600, contrast: false },
      { maxDim: 1000, contrast: false },
      { maxDim: 800, contrast: true },
      { maxDim: 500, contrast: false },
      { maxDim: 1200, contrast: true, cropCenter: true },
    ];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Canvas 2D context not available');

    for (const config of testScales) {
      let targetW = originalWidth;
      let targetH = originalHeight;

      if (config.cropCenter) {
        // Crop middle 75% of image
        targetW = Math.min(config.maxDim, originalWidth * 0.75);
        targetH = Math.min(config.maxDim, originalHeight * 0.75);
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.clearRect(0, 0, targetW, targetH);
        const sx = (originalWidth - targetW) / 2;
        const sy = (originalHeight - targetH) / 2;
        ctx.drawImage(imgElement, sx, sy, targetW, targetH, 0, 0, targetW, targetH);
      } else {
        // Scale down to prevent jsQR memory limit / performance issues on 4K images
        const scale = Math.min(1, config.maxDim / Math.max(originalWidth, originalHeight));
        targetW = Math.round(originalWidth * scale);
        targetH = Math.round(originalHeight * scale);
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.clearRect(0, 0, targetW, targetH);
        ctx.drawImage(imgElement, 0, 0, targetW, targetH);
      }

      let imageData = ctx.getImageData(0, 0, targetW, targetH);

      // Contrast / thresholding enhancement pass
      if (config.contrast) {
        applyHighContrastFilter(imageData.data);
        ctx.putImageData(imageData, 0, 0);
      }

      // Try jsQR with inversion attempts
      const result = jsQR(imageData.data, targetW, targetH, {
        inversionAttempts: 'attemptBoth',
      });

      if (result && result.data && result.data.trim()) {
        return result.data;
      }
    }

    throw new Error('No QR code detected in this image. Please ensure the QR code is clearly visible, well-lit, and not overly blurry.');
  } finally {
    if (isCreatedImg && imgElement && imgElement.src) {
      URL.revokeObjectURL(imgElement.src);
    }
  }
}

/**
 * Boosts contrast and binarizes low-contrast photo scans
 */
function applyHighContrastFilter(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Luminance grayscale
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    // Stretch contrast
    const enhanced = gray > 128 ? Math.min(255, gray * 1.25) : Math.max(0, gray * 0.75);
    data[i] = enhanced;
    data[i + 1] = enhanced;
    data[i + 2] = enhanced;
  }
}

/**
 * Converts File or Blob to HTMLImageElement
 */
export function fileToImage(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image file.'));
    };
    img.src = objectUrl;
  });
}
