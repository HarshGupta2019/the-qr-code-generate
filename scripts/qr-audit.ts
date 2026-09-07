import assert from 'node:assert/strict';
import { formatQrPayload, getQrMatrix } from '../src/utils/qrUtils';

const vcard = {
  firstName: 'Asha', lastName: 'Khan', organization: 'Example, Inc.', jobTitle: 'Product; Lead',
  phoneCell: '+91 98765 43210', phoneWork: '+91 40 1234 5678', email: 'asha@example.com',
  url: 'https://example.com/profile', street: '1 Main Street', city: 'Hyderabad', state: 'TS', zip: '500001', country: 'IN', note: 'Hello; notes',
};

const base = {
  url: 'https://example.com/a-b_c?x=1&y=2#section',
  text: 'F0-A04-013-05-C',
  vcard,
  wifi: { ssid: 'Cafe;Guest:WiFi', password: 'p@ss# $%&-_/!\\,;:"', encryption: 'WPA' as const, hidden: true },
  whatsapp: { countryCode: '+91', phoneNumber: '98765 43210', message: 'Hello & welcome! / table #2' },
  email: { email: 'hello@example.com', subject: 'A & B', body: 'Hello, world! / test' },
  phone: '+91 (98765) 43210',
  sms: { phoneNumber: '+91 98765 43210', message: 'A&B / test? yes!' },
  event: { title: 'Launch & Learn', location: 'Hall A; Hyderabad', description: 'Bring a laptop, please.', startDate: '2026-09-15', startTime: '09:00', endDate: '2026-09-15', endTime: '10:30', allDay: false },
  location: { latitude: '', longitude: '', address: 'Eiffel Tower, Paris', query: 'Eiffel Tower, Paris' },
  crypto: { currency: 'BTC' as const, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', amount: '0.015', message: 'Invoice #1' },
  social: { title: 'Profiles', bio: '', links: [{ platform: 'instagram' as const, url: 'https://instagram.com/example_user' }, { platform: 'facebook' as const, url: 'https://facebook.com/example' }] },
  app: { appName: 'Example App', iosUrl: 'https://apps.apple.com/app/id123', androidUrl: 'https://play.google.com/store/apps/details?id=com.example', fallbackUrl: 'https://example.com/app' },
  payment: { provider: 'upi' as const, identifier: 'merchant@upi', payeeName: 'Merchant & Co', amount: '25.00', note: 'Order #1', reference: 'ORDER-123' },
};

const textSamples = [
  'F0-A04-013-05-C', 'Hello World', 'ABC-123', 'A/B/C', 'A_B_C', 'A@B#C',
  'Hello & Welcome!', '123456789', 'Hindi text', 'नमस्ते QR', '日本語 QR', '中文 QR', '😀 QR Code',
];

const cases: Array<[string, Parameters<typeof formatQrPayload>[0], Parameters<typeof formatQrPayload>[1], (payload: string) => void]> = [
  ['URL', 'url', base, (p) => assert.equal(p, base.url)],
  ['Text', 'text', base, (p) => assert.equal(p, base.text)],
  ['vCard', 'vcard', base, (p) => assert.match(p, /^BEGIN:VCARD[\s\S]*VERSION:3\.0[\s\S]*END:VCARD$/)],
  ['Wi-Fi', 'wifi', base, (p) => { assert.match(p, /^WIFI:S:/); assert.match(p, /\\;/); assert.match(p, /H:true/); }],
  ['WhatsApp', 'whatsapp', base, (p) => { assert.match(p, /^https:\/\/wa\.me\/919876543210\?text=/); assert.ok(p.includes('%26')); }],
  ['Email', 'email', base, (p) => { assert.match(p, /^mailto:hello@example\.com\?/); assert.ok(p.includes('subject=A+%26+B')); }],
  ['Phone', 'phone', base, (p) => assert.equal(p, 'tel:+919876543210')],
  ['SMS', 'sms', base, (p) => { assert.match(p, /^sms:\+919876543210\?body=/); assert.ok(p.includes('A%26B')); }],
  ['Event', 'event', base, (p) => { assert.match(p, /^BEGIN:VCALENDAR/); assert.match(p, /DTSTART:20260915T090000/); assert.match(p, /END:VCALENDAR$/); }],
  ['Location', 'location', base, (p) => assert.equal(p, 'https://maps.google.com/?q=Eiffel%20Tower%2C%20Paris')],
  ['Crypto', 'crypto', base, (p) => assert.match(p, /^bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\?amount=0\.015/)],
  ['Social', 'social', base, (p) => assert.equal(p, 'https://instagram.com/example_user')],
  ['App', 'app', base, (p) => assert.equal(p, base.app.fallbackUrl)],
  ['Payment / UPI', 'payment', base, (p) => { assert.match(p, /^upi:\/\/pay\?/); assert.ok(p.includes('pa=merchant%40upi')); assert.ok(p.includes('tr=ORDER-123')); }],
];

async function main() {
  for (const sample of textSamples) {
    const payload = formatQrPayload('text', { text: sample });
    assert.equal(payload, sample);
    const matrix = await getQrMatrix(payload, 'H');
    assert.ok(matrix.size >= 21);
  }

  for (const [name, type, data, verify] of cases) {
    const payload = formatQrPayload(type, data);
    assert.ok(payload.length > 0, `${name} payload is empty`);
    verify(payload);
    const matrix = await getQrMatrix(payload, 'H');
    assert.ok(matrix.size >= 21, `${name} matrix is too small`);
    console.log(`PASS ${name}: ${matrix.size}x${matrix.size}`);
  }

  console.log(`PASS Text samples: ${textSamples.length}`);
  console.log(`PASS QR types: ${cases.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
