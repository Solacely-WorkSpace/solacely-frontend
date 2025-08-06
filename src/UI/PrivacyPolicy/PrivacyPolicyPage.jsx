"use client";       
import React from 'react'


function PrivacyPolicyPage() {
  return (
    <section className="aboutpage-container mt-16 w-full px-4 md:px-0"> 
    <div className="max-w-6xl justify-start">
      <h1 className="text-3xl font-bold text-complementary mt-20">Privacy Policy</h1>
      <p className="text-sm mt-4"><strong>Last updated:</strong> January, 2025</p>
      <ol className='mt-6' style={{ paddingLeft: '1.2em' }}>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">1. Introduction</h2>
          <p className="mt-2">
            Welcome to Solacely ('we', 'us'). We operate the website Solacely.app ('Service'). This Privacy Policy explains how we collect, use, disclose, and protect your information in compliance with Nigerian law. By using our Service, you accept the practices outlined herein and those in our Terms and Conditions ("Agreement").
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">2. Definitions</h2>
          <ul className="mt-2 list-disc list-inside">
            <li><strong>Personal Data:</strong> Information that can identify a living individual.</li>
            <li><strong>Usage Data, Cookies, Data Controller, Data Processor, Data Subject, User:</strong> Defined as in standard GDPR-style terms and consistent with NDPA definitions.</li>
          </ul>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">3. Legal Basis and Principles (NDPA, NDPC GAID)</h2>
          <p className="mt-2">
            We process Personal Data on lawful bases—such as your consent, performance of contract, compliance with legal obligations, vital interests, or legitimate interests—documented per Sections 2 & 6 of the NDPA.<br/>
            All processing is fair, lawful, transparent, purpose‑limited, and data‑minimized, in line with NDPC principles.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">4. Data Collection</h2>
          <p className="mt-2">We collect:</p>
          <ul className="mt-2 ml-4 list-disc list-inside">
            <li><strong>Personal Data:</strong> email, name, phone, address (city, country, postal code), device info, cookies.</li>
            <li><strong>Sensitive Data:</strong> only if you voluntarily provide it, with explicit consent (e.g., health, biometric)</li>
            <li><strong>Usage Data:</strong> IP address, browser, pages visited, device type, operating system, timestamps.</li>
            <li><strong>Location Data:</strong> only if permitted; can be disabled via device settings.</li>
          </ul>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">5. Children and Capacity</h2>
          <p className="mt-2">
            Our Service is intended for users 18+. We do not knowingly collect data from minors under 18. NDPA requires explicit parental/guardian consent for children’s data collection.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">6. Use of Data</h2>
          <p className="mt-2">We use Personal Data to:</p>
          <ul className="mt-2 ml-4 list-disc list-inside">
            <li>Provide and operate the Service, customer support, updates, billing and subscriptions</li>
            <li>Send promotional emails (with opt-out)</li>
            <li>Analyze and improve Service performance</li>
            <li>Detect, prevent and remedy technical issues or abuse</li>
            <li>Comply with legal obligations and enforce rights arising from contracts</li>
          </ul>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">7. Data Retention</h2>
          <p className="mt-2">
            We retain Personal Data only as long as necessary for the stated purposes or to satisfy legal retention requirements (e.g. tax, dispute resolution). Usage Data is retained for internal analysis unless otherwise required by law.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">8. International Transfer</h2>
          <p className="mt-2">
            Your data may be transferred to Nigeria for processing. Any transfer outside Nigeria is only permitted under conditions of adequate protection (such as binding contractual clauses or lawful mechanisms) and is documented per NDPA Sections 41–43
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">9. Disclosure of Data</h2>
          <p className="mt-2">We may share data:</p>
          <ul className="mt-2 ml-4 list-disc list-inside">
            <li>In corporate transactions (merger, sale)</li>
            <li>With affiliates, subcontractors, and service providers under binding agreements</li>
            <li>As required by law or to protect rights, property, and safety</li>
            <li>With your consent or as described at collection</li>
          </ul>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">10. Security</h2>
          <p className="mt-2">
            We implement technical and organizational safeguards to protect against unauthorized access, disclosure, alteration, or destruction of data in accordance with Section 39 of the NDPA
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">11. Data Breach Notification</h2>
          <p className="mt-2">If a personal data breach occurs that may impact data subject rights, we will:</p>
          <ul className="mt-2 ml-4 list-disc list-inside">
            <li>Notify the NDPC within 72 hours of becoming aware</li>
            <li>Notify affected users where appropriate</li>
            <li>Provide details, risk assessment, and remediation steps as required under NDPA Section 40 and GAID rules</li>
          </ul>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">12. Data Protection Officer (DPO)</h2>
          <p className="mt-2">
            Where required under NDPA (e.g. handling sensitive data or &gt;10,000 data subjects/year), we will appoint a DPO, who may be contacted via <a href="mailto:hello@solacely.app">hello@solacely.app</a>. DPO details may also be included in our public‑facing privacy policy.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">13. Rights of Data Subjects</h2>
          <p className="mt-2">Under the NDPA, data subjects have the right to:</p>
          <ul className="mt-2 ml-4 list-disc list-inside">
            <li>Access personal data held about them</li>
            <li>Rectification of inaccurate data</li>
            <li>Erasure or restriction of processing (if no lawful basis exists)</li>
            <li>Object to processing based on legitimate interests</li>
            <li>Data portability to receive info in machine‑readable format</li>
            <li>Withdraw consent at any time (processing stops unless another lawful basis exists)</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, email us at <a href="mailto:support@solacely.app">support@solacely.app</a>. We may request identity verification before honoring requests. Some rights may be limited by legal obligations or excessive cost.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">14. Cookies and Tracking</h2>
          <p className="mt-2">
            We use session, preference, security, and advertising cookies. Cookies enhance functionality, personalize settings, and support analytics. You may disable cookies via browser settings, but this may affect your ability to use certain Service features.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">15. Third‑Party Service Providers</h2>
          <p className="mt-2">
            We engage third-party processors for hosting, analytics, customer support, payment processing, etc. They only access Personal Data necessary to perform their tasks and are bound by confidentiality and NDPA‑compliant data protection obligations.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">16. Behavioral Remarketing</h2>
          <p className="mt-2">
            We and our partners may use cookies or similar technologies to deliver ads relevant based on prior visits to our Service.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">17. Payments</h2>
          <p className="mt-2">
            If third‑party payment processors are used, card data is handled directly by them. We comply with PCI‑DSS via our payment partners; we do not store payment card details ourselves.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">18. Children’s Privacy</h2>
          <p className="mt-2">
            We do not knowingly collect data from children under 18. If we discover such data has been provided without consent, it will be deleted promptly.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">19. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this policy from time to time. We will post updates here and, where required, notify you via email or notice before they take effect. Check back periodically for changes.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold mt-4 text-primary my-4">20. Contact Us</h2>
          <p className="mt-2 mb-20">
            To ask questions or exercise your data rights under NDPA, email <a href="mailto:hello@solacely.app">hello@solacely.app</a> or <a href="mailto:support@solacely.app">support@solacely.app</a>.
          </p>
        </li>
      </ol>
    </div>
    </section>
  );
}

export default PrivacyPolicyPage