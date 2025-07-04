
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: object;
}

const SEO = ({
  title = "TaxConsult Pro - Professional Tax & Business Consulting",
  description = "Expert tax filing, GST compliance, and business registration services. Professional tax consultant with 8+ years experience.",
  keywords = "tax consultant, GST filing, income tax returns, business registration, tax advisor, chartered accountant",
  ogTitle,
  ogDescription,
  ogImage = "/placeholder.svg",
  canonical,
  structuredData
}: SEOProps) => {
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "TaxConsult Pro",
    "description": "Professional tax and business consulting services",
    "provider": {
      "@type": "Person",
      "name": "Shivam Kumar",
      "jobTitle": "Tax Consultant"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Road, UCO Bank",
      "addressLocality": "Barharwa",
      "postalCode": "816101",
      "addressCountry": "IN"
    },
    "telephone": "+91-9038603090",
    "email": "ska.bhw@gmail.com",
    "url": siteUrl,
    "serviceType": ["Tax Filing", "GST Registration", "Business Registration"],
    "areaServed": "India"
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="TaxConsult Pro" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TaxConsult Pro" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
