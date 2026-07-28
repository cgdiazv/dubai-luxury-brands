import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { Breadcrumbs } from '@/vibes/soul/sections/breadcrumbs';
import { getMetadataAlternates } from '~/lib/seo/canonical';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Privacy Policy | Dubai Luxury Brands',
    description: 'Privacy and Cookies Policy for Dubai Luxury Brands',
    alternates: await getMetadataAlternates({ path: '/privacy-policy', locale }),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '#' },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 @2xl:py-12 @4xl:py-16">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h1 className="mb-6 mt-8 font-heading text-4xl font-medium leading-none text-foreground @xl:text-5xl @4xl:text-6xl">
        Privacy & Cookies Policy
      </h1>

      <div className="prose max-w-none space-y-6 text-base leading-relaxed text-foreground/80">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">1. Commitment to Your Privacy</h2>
          <p>
            At Dubai Luxury Brands, we respect your privacy and are committed to protecting your personal information.
            Any data we collect—such as your name, contact details, shipping address, and payment information—is used solely to process your orders, improve your shopping experience, and provide personalized service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">2. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when creating an account, making a purchase, subscribing to our newsletter, or contacting customer support. We also automatically collect certain device and browsing information through cookies and similar technologies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>To process and fulfill your orders, including delivery and payment processing.</li>
            <li>To communicate with you regarding your orders, updates, and customer support requests.</li>
            <li>To send promotional communications and newsletters, if you have opted in.</li>
            <li>To monitor, secure, and improve our website performance and shopping experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">4. Information Sharing & Security</h2>
          <p>
            We never sell, rent, or trade your personal details with third parties. We only share information with trusted service providers necessary to fulfill your order (e.g., payment gateways and courier partners). All transactions are encrypted and processed securely.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">5. Cookies & Tracking Technologies</h2>
          <p>
            By continuing to use our website, you consent to our use of cookies in accordance with your privacy preferences. You can customize or withdraw consent for non-essential cookies at any time via our Cookie Settings banner.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">6. Account Deletion & Your Data Rights</h2>
          <p>
            You have the right to request access to, correction of, or permanent deletion of your account and personal data.
          </p>
          <ul className="list-disc space-y-2 pl-6 mt-2">
            <li>
              <strong>Mobile App:</strong> If you are using our Android app, you can delete your account directly inside the app by going to <strong>Account Details / Edit Account</strong> and tapping <strong>Delete Account</strong>.
            </li>
            <li>
              <strong>Web & General Requests:</strong> You can also request complete account and data deletion by sending an email to{' '}
              <a className="text-primary underline" href="mailto:contact@dubailuxurybrands.com">
                contact@dubailuxurybrands.com
              </a>
              . Upon verification, we will permanently delete your account and personal details in accordance with applicable laws.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">7. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact our support team at{' '}
            <a className="text-primary underline" href="mailto:contact@dubailuxurybrands.com">
              contact@dubailuxurybrands.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
