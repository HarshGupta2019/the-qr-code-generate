import { QrDataType } from '../types';
import {
  Link2,
  FileText,
  User,
  Wifi,
  MessageSquare,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  Coins,
  Share2,
  Smartphone,
  CreditCard,
} from 'lucide-react';
import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UseCaseItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface QRTypeConfig {
  type: QrDataType;
  route: string;
  slug: string;
  title: string;
  h1: string;
  navLabel: string;
  breadcrumbLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  howItWorks: string;
  steps: string[];
  useCases: UseCaseItem[];
  benefits: string[];
  faqs: FAQItem[];
  defaultPayloadHint: string;
}

export const QR_TYPE_CONFIGS: Record<QrDataType, QRTypeConfig> = {
  url: {
    type: 'url',
    route: '/url-qr-code',
    slug: 'url-qr-code',
    title: 'URL QR Code Generator',
    h1: 'Free URL QR Code Generator – Convert Links to QR Codes',
    navLabel: 'Website URL',
    breadcrumbLabel: 'URL QR Code',
    icon: Link2,
    metaTitle: 'URL QR Code Generator – Create Free Website Link QR Codes',
    metaDescription: 'Generate custom URL QR codes for any website, landing page, portfolio, or online store. Download in high-resolution PNG, SVG, or PDF with custom colors and logos.',
    intro: 'A URL QR Code is the most popular type of QR code in the world. It encodes any web address (HTTP or HTTPS) into a scannable 2D barcode that automatically opens the destination website on any smartphone or tablet camera without typing.',
    howItWorks: 'When a smartphone camera scans a URL QR code, the device\'s optical recognition engine detects the encoded URI string, validates the web protocol, and prompts the user with a single tap to instantly launch their default browser to that exact destination page.',
    steps: [
      'Enter or paste your full website address (e.g., https://yourbrand.com/special-offer).',
      'Choose whether to enable dynamic link shortening or keep it as a direct static destination.',
      'Customize the QR pattern, dot shapes, gradient colors, corner eyes, and add your brand logo.',
      'Select a call-to-action frame such as "SCAN ME" or "VISIT SITE" to boost scan engagement.',
      'Test your QR code with your phone camera, then download in high-resolution PNG, SVG vector, or print-ready PDF.',
    ],
    useCases: [
      {
        title: 'Marketing & Print Advertising',
        description: 'Place URL QR codes on flyers, brochures, billboards, posters, and magazine ads to direct prospective customers to high-converting campaign landing pages.',
      },
      {
        title: 'Product Packaging & User Manuals',
        description: 'Link consumers directly to warranty registration, product setup videos, customer support portals, or allergen information right from the box.',
      },
      {
        title: 'Restaurant Menus & Order Portals',
        description: 'Provide contactless digital dining menus, table ordering, or review collection links on table tents and coasters.',
      },
      {
        title: 'Business Cards & Resumes',
        description: 'Connect potential clients or recruiters to your digital portfolio, GitHub repository, LinkedIn profile, or personal website.',
      },
    ],
    benefits: [
      'Eliminates cumbersome URL typing and typos on mobile devices.',
      'Works universally on 100% of iOS and Android smartphone cameras without third-party apps.',
      'Supports high-resolution SVG vector output for crisp billboard-scale printing.',
      'Fully customizable with brand colors, gradients, custom frames, and central logo embeds.',
      'Free forever with unlimited scans and zero expiration dates.',
    ],
    faqs: [
      {
        question: 'What is a URL QR code?',
        answer: 'A URL QR code is a two-dimensional barcode that encodes a web address (URL). When scanned by any smartphone camera, it immediately prompts the user to open the webpage in their browser.',
      },
      {
        question: 'Does a URL QR code expire?',
        answer: 'Standard static URL QR codes created with The QR Code Generate never expire. As long as your destination website is online and accessible, the QR code will work permanently.',
      },
      {
        question: 'Can I change the website URL after downloading the QR code?',
        answer: 'With static QR codes, the URL is permanently encoded into the matrix. If you use a dynamic short link, you can redirect the destination URL anytime without changing the printed QR image.',
      },
      {
        question: 'What formats can I download my URL QR code in?',
        answer: 'You can download your URL QR code in high-resolution raster PNG (up to 4000x4000 4K resolution), infinitely scalable SVG vector for graphic designers, and print-ready PDF.',
      },
      {
        question: 'Can I add my company logo to the URL QR code?',
        answer: 'Yes! You can upload custom PNG, JPG, or SVG logos to sit in the center of the QR code. The built-in error correction automatically preserves 100% scannability.',
      },
    ],
    defaultPayloadHint: 'https://example.com',
  },
  text: {
    type: 'text',
    route: '/text-qr-code',
    slug: 'text-qr-code',
    title: 'Text QR Code Generator',
    h1: 'Free Text QR Code Generator – Convert Plain Text to QR Codes',
    navLabel: 'Plain Text',
    breadcrumbLabel: 'Text QR Code',
    icon: FileText,
    metaTitle: 'Text QR Code Generator – Encode Plain Text into QR Codes Free',
    metaDescription: 'Create custom plain text QR codes for notes, messages, serial numbers, codes, or instructions. Free high-res PNG, SVG vector, and PDF downloads.',
    intro: 'A Plain Text QR Code encodes alphanumeric text, secret notes, discount coupon codes, serial keys, or multi-line instructions directly into the QR matrix. Scanning displays the text instantly on screen without requiring an internet connection.',
    howItWorks: 'The text is encoded directly into binary alphanumeric data blocks within the QR code. Because no external URL is contacted, the scanner renders the message instantly on the user\'s screen in offline mode.',
    steps: [
      'Type or paste your text message, instructions, or alphanumeric code into the input field.',
      'Check the real-time character count and scannability rating in the preview panel.',
      'Customize dot styles, background colors, and corner eye patterns to fit your style.',
      'Optionally attach a custom logo or frame banner.',
      'Download your text QR code in PNG, vector SVG, or PDF format.',
    ],
    useCases: [
      {
        title: 'Promo Codes & Voucher Keys',
        description: 'Encode discount codes, gift card numbers, or redemption tokens on physical receipts and event passes.',
      },
      {
        title: 'Inventory & Serial Numbers',
        description: 'Label warehouse assets, machine parts, equipment identification tags, or batch numbers for quick offline scanning.',
      },
      {
        title: 'Classroom & Scavenger Hunts',
        description: 'Create interactive clues, educational trivia, or classroom quiz answers that students can discover by scanning.',
      },
      {
        title: 'Secret Notes & Personal Greetings',
        description: 'Print surprise messages on greeting cards, gift tags, wedding favors, or artwork.',
      },
    ],
    benefits: [
      'Works 100% offline without requiring internet or Wi-Fi connectivity.',
      'Completely private—data is stored directly inside the code matrix.',
      'Supports multi-line formatting, special characters, and numbers.',
      'Generates instant crisp previews with configurable error correction.',
      'Free unlimited downloads in SVG, PNG, and PDF.',
    ],
    faqs: [
      {
        question: 'How much text can I put in a Text QR code?',
        answer: 'A standard QR code can store up to approximately 3,000 alphanumeric characters or 7,000 digits. However, for quick scanning across all smartphone cameras, we recommend keeping text under 300–500 characters.',
      },
      {
        question: 'Do text QR codes require an internet connection to scan?',
        answer: 'No. Plain text QR codes store all information directly inside the 2D matrix pattern, so any phone camera or barcode scanner can read the message completely offline.',
      },
      {
        question: 'Can someone copy the text after scanning?',
        answer: 'Yes. When scanned, modern smartphone cameras display the text on screen with a single-tap "Copy" button to paste it into notes, messaging apps, or forms.',
      },
    ],
    defaultPayloadHint: 'Enter any text, notes, or promo codes...',
  },
  vcard: {
    type: 'vcard',
    route: '/vcard-qr-code',
    slug: 'vcard-qr-code',
    title: 'vCard QR Code Generator',
    h1: 'Free vCard QR Code Generator – Digital Business Cards',
    navLabel: 'Digital Business Card (vCard)',
    breadcrumbLabel: 'vCard QR Code',
    icon: User,
    metaTitle: 'vCard QR Code Generator – Create Digital Business Card QR Codes',
    metaDescription: 'Generate digital business card vCard QR codes. Let people scan and save your contact info (name, phone, email, company, address) directly to their phonebook.',
    intro: 'A vCard QR Code is an electronic business card that lets anyone scan your contact details and instantly save your full name, phone numbers, email address, company title, website, and physical address directly into their smartphone contacts with one tap.',
    howItWorks: 'The code is formatted in the universal vCard 3.0 standard. iOS and Android cameras natively recognize the vCard protocol and present a "Save Contact" or "Add to Contacts" prompt with every field pre-filled accurately.',
    steps: [
      'Fill in your contact information: first name, last name, company, job title, and phone numbers.',
      'Add your email address, portfolio website URL, and physical address details.',
      'Customize the QR code styling with your corporate colors and professional logo.',
      'Add a "SAVE CONTACT" frame banner for higher conversion at networking events.',
      'Download high-resolution PNG or print-ready vector SVG for your physical business cards.',
    ],
    useCases: [
      {
        title: 'Modern Business Cards',
        description: 'Replace manual contact entry with a scannable QR code on the back or corner of your physical business card.',
      },
      {
        title: 'Conferences & Networking Events',
        description: 'Display your vCard QR code on conference badges, lanyard tags, or presentation slides for instant connections.',
      },
      {
        title: 'Email Signatures & Resumes',
        description: 'Add a compact vCard QR code to your CV or printed resume so hiring managers can call or email you instantly.',
      },
      {
        title: 'Storefronts & Service Vehicles',
        description: 'Place contact QR codes on company vans, office doors, and flyers so customers can save your hotline instantly.',
      },
    ],
    benefits: [
      'Eliminates manual typing and spelling mistakes in phone numbers and emails.',
      'Saves full contact profiles (Work, Mobile, Address, Web) in a single second.',
      'Fully compatible with iOS Contacts, Google Contacts, and Outlook.',
      'High error correction allows your company logo to sit cleanly in the center.',
      'No monthly subscriptions or app installations needed.',
    ],
    faqs: [
      {
        question: 'What is a vCard QR code?',
        answer: 'A vCard QR code contains structured digital contact information (vCard format). When scanned by a phone, it opens the device\'s native contacts app and allows the user to save the complete contact profile with one tap.',
      },
      {
        question: 'Does scanning a vCard QR code automatically add the contact?',
        answer: 'Scanning displays a preview of the contact card and prompts the user to tap "Create New Contact" or "Add to Existing Contact", ensuring user consent while making saving effortless.',
      },
      {
        question: 'Can I include both mobile and work phone numbers?',
        answer: 'Yes! Our vCard generator supports first name, last name, organization, job title, cell phone, work phone, email, website URL, full physical address, and custom notes.',
      },
      {
        question: 'What size should I print a vCard QR code on a business card?',
        answer: 'For optimal readability on standard business cards, we recommend printing the QR code at a minimum size of 0.8 x 0.8 inches (20 x 20 mm) with good contrast.',
      },
    ],
    defaultPayloadHint: 'BEGIN:VCARD...',
  },
  wifi: {
    type: 'wifi',
    route: '/wifi-qr-code',
    slug: 'wifi-qr-code',
    title: 'Wi-Fi QR Code Generator',
    h1: 'Free Wi-Fi QR Code Generator – Connect to Wi-Fi by Scanning',
    navLabel: 'Wi-Fi Network',
    breadcrumbLabel: 'Wi-Fi QR Code',
    icon: Wifi,
    metaTitle: 'Wi-Fi QR Code Generator – Free Wi-Fi QR Code Creator',
    metaDescription: 'Create a free Wi-Fi QR code and let guests connect to your network instantly by scanning. No typing long passwords. Free PNG, SVG, and PDF downloads.',
    intro: 'A Wi-Fi QR Code allows guests, customers, and employees to connect instantly to your wireless network without typing long, complex passwords. One quick scan connects their device securely.',
    howItWorks: 'The QR code formats network credentials following the standard Wi-Fi protocol (`WIFI:S:SSID;T:WPA;P:Password;;`). When scanned by an iOS or Android device, the operating system securely negotiates the handshake and joins the network automatically.',
    steps: [
      'Enter your exact Wi-Fi Network Name (SSID).',
      'Select your security encryption type (WPA/WPA2/WPA3, WEP, or No Password).',
      'Enter your network password (leave blank if open). Check the "Hidden Network" box if your SSID is non-broadcasted.',
      'Customize with your cafe or home decor colors, and add a "CONNECT TO WI-FI" frame.',
      'Download as PNG or PDF, print it out, and display it in your living room, cafe, Airbnb, or office.',
    ],
    useCases: [
      {
        title: 'Cafes, Restaurants & Bars',
        description: 'Put Wi-Fi QR codes on table stands, bar tops, and menus so guests can connect in seconds without asking staff.',
      },
      {
        title: 'Airbnbs & Hotel Rooms',
        description: 'Provide an elegant printed table card in guest rooms for hassle-free internet access upon check-in.',
      },
      {
        title: 'Offices & Co-working Spaces',
        description: 'Display guest Wi-Fi access codes on reception desks and conference room tables for visiting clients.',
      },
      {
        title: 'Smart Homes & Dinner Parties',
        description: 'Stop reciting long Wi-Fi passwords to friends and family when they visit your home.',
      },
    ],
    benefits: [
      'Protects your password from eavesdropping and prevents spelling errors.',
      'Supports WPA, WPA2, WPA3, WEP, and open networks.',
      'Works natively on iPhone, iPad, Samsung, Google Pixel, and all modern Android devices.',
      'Print-ready PDF layout for table tents, stickers, and framed signs.',
      'Completely free with no limits on scans or guest connections.',
    ],
    faqs: [
      {
        question: 'How do I connect to Wi-Fi using a QR code?',
        answer: 'Simply open the native Camera app on your iPhone or Android phone, point it at the Wi-Fi QR code, and tap the notification banner that says "Join Network". Your phone will connect automatically.',
      },
      {
        question: 'Can someone see my Wi-Fi password when scanning?',
        answer: 'The QR code encodes the password in the protocol string so the phone can connect. While modern phones connect seamlessly without showing the password plainly, anyone with a raw barcode reader can read the encoded text. For maximum security, use a dedicated guest network.',
      },
      {
        question: 'Does this work for 5GHz and 2.4GHz Wi-Fi networks?',
        answer: 'Yes. The QR code encodes the SSID name. Your smartphone\'s Wi-Fi chip will automatically select the best available frequency band (2.4GHz, 5GHz, or 6GHz) matching that SSID.',
      },
      {
        question: 'Can I generate a Wi-Fi QR code for a hidden SSID?',
        answer: 'Yes! Simply check the "Hidden Network" checkbox before generating, and the appropriate hidden flag (`H:true;`) will be included in the QR string.',
      },
    ],
    defaultPayloadHint: 'WIFI:S:Network_Name;T:WPA;P:secret123;;',
  },
  whatsapp: {
    type: 'whatsapp',
    route: '/whatsapp-qr-code',
    slug: 'whatsapp-qr-code',
    title: 'WhatsApp QR Code Generator',
    h1: 'Free WhatsApp QR Code Generator – Direct WhatsApp Chat & Message',
    navLabel: 'WhatsApp Direct Chat',
    breadcrumbLabel: 'WhatsApp QR Code',
    icon: MessageSquare,
    metaTitle: 'WhatsApp QR Code Generator – Start WhatsApp Chat Instantly',
    metaDescription: 'Generate a WhatsApp QR code with pre-filled messages. Let customers start a direct WhatsApp chat with your business in one scan. Free vector and PNG download.',
    intro: 'A WhatsApp QR Code allows potential customers and clients to initiate a direct WhatsApp conversation with your personal or business phone number without manually saving you to their contact list first.',
    howItWorks: 'The code generates a verified WhatsApp Click-to-Chat deep link (`https://wa.me/number?text=message`). When scanned, it launches the WhatsApp app directly into a chat window with your pre-populated greeting ready to send.',
    steps: [
      'Enter your country calling code and your WhatsApp phone number (e.g., +1 555-0199).',
      'Optionally type a pre-filled message (e.g., "Hi! I would like to inquire about your product pricing.").',
      'Customize the QR code with WhatsApp green accents or your own brand identity.',
      'Add a "CHAT ON WHATSAPP" call-to-action frame to maximize customer engagement.',
      'Download high-resolution PNG or SVG for your website, flyers, and storefront banners.',
    ],
    useCases: [
      {
        title: 'Customer Support & Sales Inquiries',
        description: 'Put WhatsApp QR codes on product catalogs and receipts so customers can ask questions or request quotes instantly.',
      },
      {
        title: 'Local Businesses & Delivery Orders',
        description: 'Let customers place orders, reserve appointments, or request table bookings via WhatsApp messaging.',
      },
      {
        title: 'Real Estate & Car Dealerships',
        description: 'Attach QR codes to property signs and car windows so prospective buyers can text the agent immediately.',
      },
      {
        title: 'Event Registration & RSVPs',
        description: 'Allow attendees to confirm attendance or get live updates directly through WhatsApp.',
      },
    ],
    benefits: [
      'Eliminates the friction of saving phone numbers before messaging.',
      'Supports pre-written custom messages that guide the conversation.',
      'Works with both standard WhatsApp and WhatsApp Business accounts.',
      'Increases lead conversion from physical marketing materials by over 300%.',
      'Instant generation with vector SVG and high-resolution PNG options.',
    ],
    faqs: [
      {
        question: 'Do customers need to save my number to send a WhatsApp message?',
        answer: 'No! That is the biggest benefit of a WhatsApp QR code. Scanning the code opens a direct chat window immediately without requiring the user to add your contact to their phonebook first.',
      },
      {
        question: 'Can I include a pre-written message?',
        answer: 'Yes. You can write a default message such as "Hello, I want to book a consultation." When the user scans the code, that message is automatically pre-filled in their WhatsApp text bar.',
      },
      {
        question: 'Does this work with WhatsApp Business?',
        answer: 'Yes, it works seamlessly with both WhatsApp Messenger and WhatsApp Business on iOS, Android, and WhatsApp Web.',
      },
    ],
    defaultPayloadHint: 'https://wa.me/1234567890?text=Hello',
  },
  email: {
    type: 'email',
    route: '/email-qr-code',
    slug: 'email-qr-code',
    title: 'Email QR Code Generator',
    h1: 'Free Email QR Code Generator – Compose Emails via QR Code',
    navLabel: 'Email Message',
    breadcrumbLabel: 'Email QR Code',
    icon: Mail,
    metaTitle: 'Email QR Code Generator – Send Pre-Filled Emails on Scan',
    metaDescription: 'Generate custom Email QR codes with recipient address, subject line, and pre-written message body. Free PNG, SVG vector, and PDF download.',
    intro: 'An Email QR Code triggers the user\'s default mail client (Gmail, Apple Mail, Outlook) with your recipient email address, subject line, and pre-written message body ready to send with a single tap.',
    howItWorks: 'The code encodes a standardized `mailto:` URI scheme containing query parameters for `subject` and `body`. When scanned, mobile operating systems launch the default email composer with all fields populated.',
    steps: [
      'Enter the recipient email address (e.g., support@yourcompany.com).',
      'Provide a clear subject line (e.g., "Quote Request: Custom Services").',
      'Type an optional message body template to make responding effortless for your customers.',
      'Style your QR code with custom colors, eye shapes, and brand logos.',
      'Download in PNG, SVG vector, or PDF for digital flyers and print collateral.',
    ],
    useCases: [
      {
        title: 'Customer Feedback & Support',
        description: 'Print email QR codes on warranties and invoices to streamline support tickets and warranty claims.',
      },
      {
        title: 'Job Applications & Recruiting',
        description: 'Place on hiring posters so candidates can send resumes with the exact job ID pre-filled in the subject.',
      },
      {
        title: 'RSVP & Newsletter Signups',
        description: 'Collect event confirmations or subscription requests directly in your inbox.',
      },
      {
        title: 'Business Proposals & Quotes',
        description: 'Let prospective clients request custom quotes without filling out long web forms.',
      },
    ],
    benefits: [
      'Prevents typos in complex corporate email addresses.',
      'Pre-categorizes incoming emails using structured subject lines.',
      'Works with all mobile email apps (Apple Mail, Gmail, Outlook, Yahoo).',
      'Available in 4K PNG, vector SVG, and PDF formats.',
      'No fees, limits, or tracking redirects.',
    ],
    faqs: [
      {
        question: 'How does an Email QR code work?',
        answer: 'When scanned, your phone opens its default email app (like Mail or Gmail) and creates a new email draft with the recipient, subject line, and message body pre-filled.',
      },
      {
        question: 'Does the email send automatically when scanned?',
        answer: 'No. For user security and privacy, the email app opens with the draft prepared, and the user must tap "Send".',
      },
      {
        question: 'Can I add multiple recipients or CC fields?',
        answer: 'Yes, you can enter standard email addresses, and the formatted mailto link will handle standard email routing.',
      },
    ],
    defaultPayloadHint: 'mailto:contact@example.com?subject=Hello',
  },
  phone: {
    type: 'phone',
    route: '/phone-qr-code',
    slug: 'phone-qr-code',
    title: 'Phone Call QR Code Generator',
    h1: 'Free Phone Call QR Code Generator – Direct Dialing via QR Code',
    navLabel: 'Phone Call',
    breadcrumbLabel: 'Phone QR Code',
    icon: Phone,
    metaTitle: 'Phone Call QR Code Generator – Dial Numbers Instantly',
    metaDescription: 'Create a phone call QR code. When scanned, smartphones immediately open the dialer with your phone number ready to call. Free high-res download.',
    intro: 'A Phone Call QR Code encodes a telephone number using the `tel:` URI protocol. When scanned by a smartphone, it immediately launches the phone\'s native dialer with your number pre-dialed and ready to call.',
    howItWorks: 'The QR code stores `tel:+1234567890`. Modern mobile cameras recognize telephone numbers and display a "Call Number" action button with zero dialing friction.',
    steps: [
      'Enter your full telephone number including the international country code (e.g., +1 800-555-0199).',
      'Review the live dialer preview in the right panel.',
      'Customize dot patterns, brand colors, and add a "CALL US NOW" frame.',
      'Test by scanning with your phone camera to verify the dial prompt.',
      'Download in PNG, SVG vector, or print-ready PDF.',
    ],
    useCases: [
      {
        title: 'Emergency Hotlines & 24/7 Support',
        description: 'Display on equipment, security panels, or roadside signs for instant emergency dialing.',
      },
      {
        title: 'Service Vans & Billboards',
        description: 'Allow drivers or pedestrians to call plumbers, electricians, or locksmiths with a fast scan from a distance.',
      },
      {
        title: 'Restaurant Reservations & Takeout',
        description: 'Put on table tents and flyers for quick phone ordering and table reservations.',
      },
      {
        title: 'Real Estate Yard Signs',
        description: 'Enable prospective buyers standing outside a property to call the listing agent on the spot.',
      },
    ],
    benefits: [
      'Eliminates misdialed digits and forgotten numbers.',
      'Immediate connection for high-intent customer leads.',
      'Completely universal across iPhone and Android dialers.',
      'Crisp high-resolution outputs for large billboards and vehicle wraps.',
      'Free with zero ongoing fees.',
    ],
    faqs: [
      {
        question: 'Will the phone call be made automatically when scanned?',
        answer: 'No. Mobile operating systems display a prompt showing the phone number and asking the user to confirm the call, ensuring complete user control.',
      },
      {
        question: 'Should I include the country code in the phone number?',
        answer: 'Yes! Including the international country code (e.g., +1 for USA/Canada, +44 for UK, +91 for India) ensures that people can call you from any location or carrier.',
      },
    ],
    defaultPayloadHint: 'tel:+1234567890',
  },
  sms: {
    type: 'sms',
    route: '/sms-qr-code',
    slug: 'sms-qr-code',
    title: 'SMS QR Code Generator',
    h1: 'Free SMS QR Code Generator – Send Text Messages via QR Code',
    navLabel: 'SMS Message',
    breadcrumbLabel: 'SMS QR Code',
    icon: MessageCircle,
    metaTitle: 'SMS QR Code Generator – Create Scannable Text Message QR Codes',
    metaDescription: 'Generate SMS QR codes with recipient numbers and pre-filled text messages. Ideal for competitions, customer opt-ins, and text support.',
    intro: 'An SMS QR Code lets users send a text message to a specific phone number with a pre-written message ready in their native Messages app upon scanning.',
    howItWorks: 'Using the `smsto:number:message` standard, the QR code triggers the phone\'s SMS application and fills in the destination number and message body.',
    steps: [
      'Enter the recipient phone number with country code.',
      'Enter the pre-written SMS message body (e.g., "START to subscribe to weekly deals").',
      'Customize styling with colors, gradients, and custom CTA frames.',
      'Download high-res PNG, vector SVG, or PDF.',
    ],
    useCases: [
      {
        title: 'SMS Marketing Opt-Ins',
        description: 'Grow your SMS subscriber list with keywords like "JOIN" or "DISCOUNT" on in-store signage.',
      },
      {
        title: 'Contests & Giveaways',
        description: 'Let participants enter sweepstakes by scanning and sending pre-formatted contest codes.',
      },
      {
        title: 'Customer Support & Parking Validation',
        description: 'Enable quick SMS-based parking validation or automated customer service replies.',
      },
    ],
    benefits: [
      'High conversion for mobile marketing campaigns.',
      'Pre-written keywords eliminate typing errors.',
      'Native SMS works without requiring third-party messaging apps.',
      'Vector SVG and PNG downloads included free.',
    ],
    faqs: [
      {
        question: 'Does scanning an SMS QR code send the message right away?',
        answer: 'No. The phone opens the SMS composer with the number and message pre-filled. The user must press the send arrow to send the text message.',
      },
      {
        question: 'Can I use this for keyword marketing campaigns?',
        answer: 'Yes! You can specify any keyword or phrase in the message body, making it ideal for automated SMS marketing gateways.',
      },
    ],
    defaultPayloadHint: 'smsto:+1234567890:Hello',
  },
  event: {
    type: 'event',
    route: '/event-qr-code',
    slug: 'event-qr-code',
    title: 'Calendar Event QR Code Generator',
    h1: 'Free Calendar Event QR Code Generator – Add Events to Calendar',
    navLabel: 'Calendar Event',
    breadcrumbLabel: 'Event QR Code',
    icon: Calendar,
    metaTitle: 'Calendar Event QR Code Generator – Save Events with One Scan',
    metaDescription: 'Create Calendar Event QR codes (iCalendar/vEvent). Let attendees save event dates, times, locations, and details straight to Google Calendar or Apple Calendar.',
    intro: 'A Calendar Event QR Code encodes event details into standard iCalendar (vEvent) format. When attendees scan the code, their device opens a "Add to Calendar" prompt with the title, start/end dates, location, and reminder notes pre-filled.',
    howItWorks: 'The code encodes a universal `BEGIN:VEVENT` format. When scanned, iOS Calendar, Google Calendar, and Microsoft Outlook automatically parse the timeline and offer a single tap to schedule.',
    steps: [
      'Enter the Event Title (e.g., "Annual Tech Summit 2026").',
      'Set the start and end dates and times, or mark as an All-Day event.',
      'Add the venue location or virtual meeting URL and event description notes.',
      'Customize QR colors and choose an "ADD TO CALENDAR" frame.',
      'Download high-res PNG, SVG vector, or PDF for event posters and tickets.',
    ],
    useCases: [
      {
        title: 'Weddings & Private Celebrations',
        description: 'Print on wedding invitations so guests can save your special day without forgetting the date or venue address.',
      },
      {
        title: 'Conferences & Seminars',
        description: 'Place on event brochures, stage banners, and keynote slides for individual session scheduling.',
      },
      {
        title: 'Concerts & Sports Matches',
        description: 'Add to ticket confirmation receipts and promotional posters to minimize no-shows.',
      },
      {
        title: 'Webinars & Product Launches',
        description: 'Provide a scannable reminder link for live virtual stream broadcasts.',
      },
    ],
    benefits: [
      'Drastically reduces event no-shows and forgotten dates.',
      'Works seamlessly with Apple Calendar, Google Calendar, and Outlook.',
      'Includes venue location and event description in one scan.',
      'High error correction allows logo placement.',
      'Completely free with unlimited scans.',
    ],
    faqs: [
      {
        question: 'Which calendar apps support Event QR codes?',
        answer: 'All major calendar apps support standard iCalendar events, including Apple Calendar (iOS/macOS), Google Calendar (Android/Web), and Microsoft Outlook.',
      },
      {
        question: 'Does the calendar event adjust for time zones?',
        answer: 'Yes, standard ISO dates preserve exact scheduling across local device time zones.',
      },
    ],
    defaultPayloadHint: 'BEGIN:VEVENT...',
  },
  location: {
    type: 'location',
    route: '/location-qr-code',
    slug: 'location-qr-code',
    title: 'Location QR Code Generator',
    h1: 'Free Google Maps Location QR Code Generator – Share Geo Coordinates',
    navLabel: 'Map Location',
    breadcrumbLabel: 'Location QR Code',
    icon: MapPin,
    metaTitle: 'Location QR Code Generator – Share Google Maps Directions Free',
    metaDescription: 'Generate Google Maps Location QR codes. Help visitors navigate straight to your store, event venue, or office with turn-by-turn directions.',
    intro: 'A Location QR Code directs users directly to your exact geographical coordinates on Google Maps, Apple Maps, or Waze, making it effortless for customers to find your store, office, or event venue.',
    howItWorks: 'The code encodes coordinates (`geo:lat,lng`) or a formatted Google Maps navigation link (`https://maps.google.com/?q=lat,lng`). When scanned, the smartphone opens its native navigation app with turn-by-turn directions.',
    steps: [
      'Enter latitude and longitude coordinates, or your business address query.',
      'Use the built-in "Use Current Location" button for instant GPS coordinate detection.',
      'Customize QR colors, corner styling, and frame banners like "FIND US ON MAPS".',
      'Download high-res PNG, vector SVG, or PDF for storefront signs and flyers.',
    ],
    useCases: [
      {
        title: 'Storefronts & Retail Locations',
        description: 'Print on flyers, direct mail, and print ads so prospective customers can navigate directly to your store.',
      },
      {
        title: 'Weddings & Party Venues',
        description: 'Guide guests accurately to hard-to-find rural venues or outdoor parks.',
      },
      {
        title: 'Real Estate Open Houses',
        description: 'Place on street directional signs so prospective buyers can map the route instantly.',
      },
      {
        title: 'Tourism & Hiking Trails',
        description: 'Mark landmarks, scenic viewpoints, and trailhead parking lots for travelers.',
      },
    ],
    benefits: [
      'Eliminates lost visitors and wrong address searches.',
      'Opens directly in Google Maps, Apple Maps, and navigation apps.',
      'Supports exact GPS coordinates down to the meter.',
      'High-resolution vector SVG downloads for physical signs.',
    ],
    faqs: [
      {
        question: 'Does the Location QR code open Google Maps or Apple Maps?',
        answer: 'On iOS devices, it opens Apple Maps or Google Maps based on user defaults; on Android devices, it opens Google Maps with turn-by-turn GPS navigation ready.',
      },
      {
        question: 'Can I use GPS coordinates instead of a street address?',
        answer: 'Yes! Exact latitude and longitude coordinates are supported, which is ideal for remote venues, parking lots, and outdoor locations without street numbers.',
      },
    ],
    defaultPayloadHint: 'https://maps.google.com/?q=37.7749,-122.4194',
  },
  crypto: {
    type: 'crypto',
    route: '/crypto-qr-code',
    slug: 'crypto-qr-code',
    title: 'Crypto QR Code Generator',
    h1: 'Free Cryptocurrency QR Code Generator – Bitcoin, Ethereum, Solana, USDT',
    navLabel: 'Crypto Wallet Payment',
    breadcrumbLabel: 'Crypto QR Code',
    icon: Coins,
    metaTitle: 'Crypto QR Code Generator – Bitcoin, Ethereum, USDT & Solana',
    metaDescription: 'Generate cryptocurrency payment QR codes for Bitcoin (BTC), Ethereum (ETH), USDT, Solana (SOL), and Dogecoin with custom amounts and addresses.',
    intro: 'A Crypto QR Code allows users to receive cryptocurrency payments securely by encoding your wallet public address, requested coin amount, and payment memo into a scannable QR code compatible with major crypto wallet apps.',
    howItWorks: 'The code encodes standard cryptocurrency payment URIs (such as `bitcoin:address?amount=0.05` or `ethereum:address`). When scanned inside wallet apps like MetaMask, Trust Wallet, or Coinbase, all transaction fields are pre-filled securely.',
    steps: [
      'Select your cryptocurrency (Bitcoin, Ethereum, USDT, Solana, or Dogecoin).',
      'Paste your public wallet address carefully.',
      'Optionally specify a requested payment amount and memo note.',
      'Style with crypto-themed colors and crypto currency icons in the center.',
      'Download in PNG, SVG, or print-ready PDF for point-of-sale displays.',
    ],
    useCases: [
      {
        title: 'Point of Sale Merchant Payments',
        description: 'Accept crypto payments at your retail register or cafe counter by displaying a scannable wallet QR code.',
      },
      {
        title: 'Online Creator Tips & Donations',
        description: 'Place crypto tip jars on your website, livestream overlays, or YouTube video descriptions.',
      },
      {
        title: 'Freelance Invoicing & Billing',
        description: 'Include your crypto payment QR code on PDF invoices for instant global settlements without bank fees.',
      },
    ],
    benefits: [
      'Eliminates catastrophic manual typing errors in long cryptographic addresses.',
      'Compatible with Bitcoin, Ethereum, Solana, USDT, and Dogecoin wallets.',
      'Supports optional pre-set payment amounts.',
      'High-resolution vector outputs for checkout counters and invoices.',
    ],
    faqs: [
      {
        question: 'Which crypto wallets can scan this QR code?',
        answer: 'Virtually all major cryptocurrency wallet apps (MetaMask, Coinbase Wallet, Trust Wallet, Phantom, Ledger Live, Exodus, Binance) can scan and parse standard crypto URI QR codes.',
      },
      {
        question: 'Is it safe to share my crypto wallet QR code?',
        answer: 'Yes. The QR code only encodes your public wallet address, which is safe to share publicly for receiving funds. Never share your private keys or seed phrases.',
      },
    ],
    defaultPayloadHint: 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  },
  social: {
    type: 'social',
    route: '/social-qr-code',
    slug: 'social-qr-code',
    title: 'Social Media QR Code Generator',
    h1: 'Free Social Media QR Code Generator – Multi-Link Social Profiles',
    navLabel: 'Social Media Multi-Link',
    breadcrumbLabel: 'Social Media QR Code',
    icon: Share2,
    metaTitle: 'Social Media QR Code Generator – Connect All Social Profiles',
    metaDescription: 'Generate a single Social Media QR code linking to all your profiles: Instagram, TikTok, YouTube, X (Twitter), LinkedIn, and Facebook.',
    intro: 'A Social Media QR Code allows you to connect followers to all your social platforms—Instagram, TikTok, YouTube, X, LinkedIn, Facebook, and your personal website—from one single scan.',
    howItWorks: 'The code directs scanners to your primary social hub or curated link-in-bio page, allowing followers to choose their preferred platform to follow, subscribe, or message you.',
    steps: [
      'Enter your primary profile links for Instagram, YouTube, TikTok, X, LinkedIn, or personal website.',
      'Add a title and bio description for your personal or brand profile.',
      'Customize with aesthetic gradients, rounded corner eyes, and brand logos.',
      'Add a "FOLLOW US" or "CONNECT" frame banner.',
      'Download high-resolution PNG or SVG for packaging, storefronts, and pop-up events.',
    ],
    useCases: [
      {
        title: 'Influencers & Content Creators',
        description: 'Display on merchandise, event booths, and video cards to grow followers across multiple channels simultaneously.',
      },
      {
        title: 'Retail Stores & Boutiques',
        description: 'Put at the checkout counter so customers can follow your Instagram and TikTok for discount drops and styling tips.',
      },
      {
        title: 'Musicians & Artists',
        description: 'Share Spotify, YouTube, and Apple Music links on concert flyers and album covers.',
      },
    ],
    benefits: [
      'Grow multiple social channels with a single printed QR code.',
      'Reduces the clutter of listing 5 different social handles.',
      'Works on all mobile devices and operating systems.',
      'High-resolution vector outputs for print collateral.',
    ],
    faqs: [
      {
        question: 'Can I link to multiple social media channels at once?',
        answer: 'Yes! You can configure links for Instagram, YouTube, TikTok, X (Twitter), LinkedIn, Facebook, and your website, directing users to your consolidated social hub.',
      },
      {
        question: 'Can I add my Instagram or YouTube logo to the center?',
        answer: 'Yes, you can upload any custom platform logo or brand icon to be displayed in the center of your social QR code.',
      },
    ],
    defaultPayloadHint: 'https://the-qrcode-generator.com/social',
  },
  app: {
    type: 'app',
    route: '/app-qr-code',
    slug: 'app-qr-code',
    title: 'App Store QR Code Generator',
    h1: 'Free App Store QR Code Generator – iOS App Store & Google Play',
    navLabel: 'App Download Link',
    breadcrumbLabel: 'App Download QR Code',
    icon: Smartphone,
    metaTitle: 'App Store QR Code Generator – Download iOS & Android Apps',
    metaDescription: 'Create a single App Store QR code that directs users to the Apple App Store on iPhones and Google Play Store on Android devices.',
    intro: 'An App Store QR Code makes downloading your mobile app effortless. One single QR code detects the user\'s mobile operating system and routes iOS users to the Apple App Store and Android users to the Google Play Store.',
    howItWorks: 'The code links to your smart app download landing page or direct store URI, automatically routing the visitor to the compatible app store for their specific hardware.',
    steps: [
      'Enter your App Store (iOS) URL and Google Play Store (Android) URL.',
      'Optionally provide a fallback web address for desktop visitors.',
      'Customize the QR code with your app icon in the center.',
      'Choose a "GET THE APP" or "DOWNLOAD NOW" call-to-action frame.',
      'Download high-res PNG or SVG vector for banners, posters, and print campaigns.',
    ],
    useCases: [
      {
        title: 'App Marketing & Posters',
        description: 'Promote mobile games, fintech apps, and utility apps on billboards, subway posters, and flyers.',
      },
      {
        title: 'Physical Products & Hardware Onboarding',
        description: 'Guide customers straight to the companion companion app to set up smart devices, IoT gadgets, and wearables.',
      },
      {
        title: 'Loyalty & Rewards Programs',
        description: 'Encourage in-store shoppers to download your retail loyalty app for discounts and points.',
      },
    ],
    benefits: [
      'Single QR code serves both iPhone and Android users.',
      'Increases app installation rates by removing search friction.',
      'Includes fallback support for desktop visitors.',
      'Vector SVG and 4K PNG downloads included.',
    ],
    faqs: [
      {
        question: 'Does one QR code work for both iPhone and Android?',
        answer: 'Yes! By linking to your universal app routing page or store URLs, iPhone scanners are directed to the Apple App Store and Android scanners to Google Play.',
      },
      {
        question: 'Can I put my app\'s icon in the middle of the QR code?',
        answer: 'Yes! Upload your app icon in the customizer tab, and it will be embedded with automatic scannability protection.',
      },
    ],
    defaultPayloadHint: 'https://apps.apple.com/app/id123456789',
  },
  payment: {
    type: 'payment',
    route: '/payment-qr-code',
    slug: 'payment-qr-code',
    title: 'Payment & UPI QR Code Generator',
    h1: 'Free Payment & UPI QR Code Generator – PayPal, Venmo, Cash App, UPI',
    navLabel: 'Payment & UPI',
    breadcrumbLabel: 'Payment QR Code',
    icon: CreditCard,
    metaTitle: 'Payment & UPI QR Code Generator – PayPal, Venmo & UPI QR Codes',
    metaDescription: 'Generate instant payment QR codes for PayPal, Venmo, Cash App, and UPI (India). Accept contactless payments and tips seamlessly.',
    intro: 'A Payment QR Code allows businesses, freelancers, and creators to receive contactless payments through popular payment providers like PayPal, Venmo, Cash App, and Unified Payments Interface (UPI).',
    howItWorks: 'The code encodes direct deep links and payment protocols (such as `upi://pay?pa=id&am=amount` or `https://paypal.me/user/amount`). When scanned, it launches the relevant payment app with the recipient and amount pre-filled.',
    steps: [
      'Select your payment provider (PayPal, Venmo, Cash App, or UPI).',
      'Enter your username, merchant ID, or UPI VPA (e.g., username@upi or paypal.me/handle).',
      'Optionally set a fixed billing amount and payment description note.',
      'Customize with your brand styling and a "PAY HERE" frame.',
      'Download high-res PNG or SVG to display at your register, invoice, or donation stand.',
    ],
    useCases: [
      {
        title: 'Retail Stores & Market Stalls',
        description: 'Accept instant cashless payments at farmer\'s markets, food trucks, and pop-up shops.',
      },
      {
        title: 'Freelancers & Contractors',
        description: 'Include payment QR codes on invoices for rapid settlement without wire transfer delays.',
      },
      {
        title: 'Tips & Donations',
        description: 'Collect tips for musicians, baristas, service staff, and charity fundraisers.',
      },
    ],
    benefits: [
      'Supports PayPal, Venmo, Cash App, and UPI in one generator.',
      'Pre-fills payment amounts to prevent billing errors.',
      'Contactless, fast, and secure.',
      'Print-ready high-resolution vector and PNG formats.',
    ],
    faqs: [
      {
        question: 'Which payment apps are supported?',
        answer: 'Our payment generator supports PayPal (PayPal.Me), Venmo, Cash App ($Cashtag), and UPI (Google Pay, PhonePe, Paytm, BHIM).',
      },
      {
        question: 'Are there any transaction fees from The QR Code Generate?',
        answer: 'No! The QR Code Generate is 100% free with zero commission or fees. Transactions are processed directly by your chosen payment provider under their standard terms.',
      },
      {
        question: 'How do UPI QR codes work in India?',
        answer: 'UPI QR codes encode standard `upi://pay` URI schemes, allowing customers to scan with Google Pay, PhonePe, Paytm, or any BHIM-compatible banking app.',
      },
    ],
    defaultPayloadHint: 'https://paypal.me/merchantsample/25.00',
  },
};

export const ALL_QR_TYPES: QrDataType[] = [
  'url',
  'text',
  'vcard',
  'wifi',
  'whatsapp',
  'email',
  'phone',
  'sms',
  'event',
  'location',
  'crypto',
  'social',
  'app',
  'payment',
];

export function getQRTypeConfig(type: QrDataType): QRTypeConfig {
  return QR_TYPE_CONFIGS[type] || QR_TYPE_CONFIGS.url;
}

export function getQRTypeByRoute(pathname: string): QRTypeConfig | undefined {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  
  // Direct match
  const match = Object.values(QR_TYPE_CONFIGS).find((c) => c.slug === clean || c.route === `/${clean}`);
  if (match) return match;

  // Aliases for SEO variations
  if (clean === 'upi-qr-code') return QR_TYPE_CONFIGS.payment;
  if (clean === 'instagram-qr-code') return QR_TYPE_CONFIGS.social;
  
  return undefined;
}
