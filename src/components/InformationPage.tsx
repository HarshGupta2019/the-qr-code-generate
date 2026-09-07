import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { PageSEO } from './seo/PageSEO';

type InformationPageKind = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';

const PAGE_COPY: Record<InformationPageKind, { title: string; description: string; heading: string; path: string }> = {
  about: { title: 'About The QR Code Generate', description: 'Learn how The QR Code Generate helps people create practical QR codes in their browser.', heading: 'About Us', path: '/about' },
  contact: { title: 'Contact The QR Code Generate', description: 'Contact The QR Code Generate about questions, feedback, or accessibility concerns.', heading: 'Contact Us', path: '/contact' },
  privacy: { title: 'Privacy Policy | The QR Code Generate', description: 'Read how The QR Code Generate handles QR content, local browser storage, cookies, and advertising.', heading: 'Privacy Policy', path: '/privacy-policy' },
  terms: { title: 'Terms and Conditions | The QR Code Generate', description: 'Review the terms for using The QR Code Generate and its browser-based QR tools.', heading: 'Terms & Conditions', path: '/terms-and-conditions' },
  disclaimer: { title: 'Disclaimer | The QR Code Generate', description: 'Understand the responsibilities and limitations that apply when using The QR Code Generate.', heading: 'Disclaimer', path: '/disclaimer' },
};

interface InformationPageProps {
  kind: InformationPageKind;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-2">
    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{title}</h2>
    <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">{children}</div>
  </section>
);

export const InformationPage: React.FC<InformationPageProps> = ({ kind, darkMode, setDarkMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const copy = PAGE_COPY[kind];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans'] transition-colors">
      <PageSEO title={copy.title} description={copy.description} path={copy.path} />
      <Header activeTab="generator" setActiveTab={() => navigate('/')} savedCount={0} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <nav className="text-xs text-slate-500 dark:text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-sky-600 dark:hover:text-sky-400">Home</Link><span className="mx-2">/</span><span>{copy.heading}</span>
        </nav>
        <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8">
          <header className="space-y-3"><h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{copy.heading}</h1><p className="text-sm text-slate-500 dark:text-slate-400">The QR Code Generate · Last updated September 2026</p></header>

          {kind === 'about' && <>
            <Section title="A practical QR tool"><p>The QR Code Generate is a browser-based utility for creating QR codes for websites, Wi-Fi access, messaging, payments, social profiles, documents, and contact details. The goal is simple: make common QR tasks understandable and usable without an account.</p></Section>
            <Section title="How it works"><p>Choose a format, enter the information you want to encode, review the preview, and download or share the result. QR generation happens in your browser for the supported generator workflows.</p></Section>
            <Section title="Use the tools responsibly"><p>Check every generated code before publishing it, especially when it points to a payment page, login flow, or third-party website. The QR code is only a representation of the information you provide.</p></Section>
          </>}

          {kind === 'contact' && <>
            <Section title="Get in touch"><p>For questions, feedback, accessibility concerns, or reports about a broken page, use the form below. This website currently does not have a connected mail server, so the form is an interface for future configuration.</p><p className="mt-2">Contact email placeholder: <a className="text-sky-600 dark:text-sky-400 hover:underline" href="mailto:contact@example.com">contact@example.com</a>. Replace this address with the maintained support address before publishing.</p></Section>
            <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <div><label htmlFor="contact-name" className="block text-sm font-semibold mb-1">Name</label><input id="contact-name" name="name" required className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2.5" /></div>
              <div><label htmlFor="contact-email" className="block text-sm font-semibold mb-1">Email</label><input id="contact-email" name="email" type="email" required className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2.5" /></div>
              <div><label htmlFor="contact-message" className="block text-sm font-semibold mb-1">Message</label><textarea id="contact-message" name="message" required rows={5} className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2.5" /></div>
              <button type="submit" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700">Prepare message</button>
              {submitted && <p className="text-sm text-emerald-600 dark:text-emerald-400" role="status">Your message is ready to be connected to the configured contact service.</p>}
            </form>
          </>}

          {kind === 'privacy' && <>
            <Section title="Information processed in your browser"><p>Text, URLs, Wi-Fi details, contact fields, and other values entered into the generator are used to create the QR image in your browser. The site does not intentionally send those values to a remote QR storage service. Saved history and theme preferences may be kept in your browser's local storage when you use those features.</p></Section>
            <Section title="Cookies, analytics, and advertising"><p>The site may use cookies or similar technologies if Google AdSense or analytics services are enabled in the deployed configuration. Those providers may process device or usage information under their own policies. No advertising code should be interpreted as a request to click an ad. Review the live deployment configuration before enabling any provider and provide any consent required in the visitor's region.</p></Section>
            <Section title="Third-party destinations"><p>A generated QR code can point to a third-party website or service. Once a visitor follows that destination, its privacy policy and data practices apply.</p></Section>
            <Section title="Questions"><p>For privacy questions, use the <Link className="text-sky-600 dark:text-sky-400 hover:underline" to="/contact">Contact Us</Link> page.</p></Section>
          </>}

          {kind === 'terms' && <>
            <Section title="Acceptable use"><p>Use the generator for lawful, accurate, and non-deceptive purposes. Do not encode content that violates another person's rights or use generated codes to facilitate fraud, abuse, or unauthorized access.</p></Section>
            <Section title="Your content and third-party destinations"><p>You are responsible for the information you enter and the destination it identifies. We do not control, verify, or guarantee the availability, safety, accuracy, or content of third-party destinations.</p></Section>
            <Section title="Intellectual property"><p>You retain responsibility for having permission to use logos, text, links, and other material you encode or upload. The site's software, text, and branding remain protected by applicable intellectual-property laws.</p></Section>
            <Section title="Availability and liability"><p>The service may change, become unavailable, or contain errors. To the extent permitted by law, The QR Code Generate is not liable for losses caused by reliance on a generated code, a destination service, or an interruption of the tool.</p></Section>
          </>}

          {kind === 'disclaimer' && <>
            <Section title="A QR generation tool"><p>The QR Code Generate creates QR images from information supplied by the user. It does not verify that the information, destination, payment recipient, Wi-Fi network, document, or contact details are correct.</p></Section>
            <Section title="Check before sharing"><p>Always scan and test a code before printing or distributing it. Users are responsible for the content they encode, the permissions needed for that content, and the consequences of people following the resulting destination.</p></Section>
            <Section title="No third-party guarantee"><p>Links, payment services, social profiles, and other destinations may change or stop working independently of this website. The QR Code Generate does not endorse or guarantee third-party content.</p></Section>
          </>}
        </article>
      </main>
      <Footer />
    </div>
  );
};