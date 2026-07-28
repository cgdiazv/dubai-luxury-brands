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
    title: 'Terms & Conditions | Dubai Luxury Brands',
    description: 'Terms and Conditions of Service for Dubai Luxury Brands',
    alternates: await getMetadataAlternates({ path: '/terms-and-conditions', locale }),
  };
}

export default async function TermsAndConditionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Terms & Conditions', href: '#' },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 @2xl:py-12 @4xl:py-16">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <h1 className="mb-6 mt-8 font-heading text-4xl font-medium leading-none text-foreground @xl:text-5xl @4xl:text-6xl">
        Terms & Conditions
      </h1>

      <div className="prose max-w-none space-y-6 text-base leading-relaxed text-foreground/80">
        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">1. Introduction</h2>
          <p>
            Welcome to Dubai Luxury Brands. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before placing an order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">2. Products & Orders</h2>
          <p>
            All products displayed on our website are subject to availability. We reserve the right to limit the quantity of items purchased and to revise, update, or discontinue products at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">3. Pricing & Payment</h2>
          <p>
            Prices listed on our store are in the specified currency and include applicable taxes unless otherwise noted. Payments are processed securely at checkout via authorized payment service providers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">4. Shipping & Delivery</h2>
          <p>
            Shipping rates and estimated delivery times are provided at checkout. While we strive to meet all delivery timelines, shipping dates are estimates and subject to carrier delays beyond our control.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">5. Returns & Refunds</h2>
          <p>
            If you are not entirely satisfied with your purchase, please inspect our returns policy or reach out to our support team within 14 days of receiving your item. Items must be unused and in original packaging to qualify for a return or exchange.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">6. Intellectual Property</h2>
          <p>
            All content on this website—including images, text, logos, graphics, and product names—is the property of Dubai Luxury Brands or its licensors and is protected by copyright and intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-foreground">7. Contact Information</h2>
          <p>
            For any inquiries or assistance regarding these Terms & Conditions, please contact us at{' '}
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
