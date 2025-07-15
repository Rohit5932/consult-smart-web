
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";

const services = [
  {
    id: 1,
    title: "GST Registration",
    description: "Get your GST registration done quickly and easily with our expert assistance.",
    link: "/service/gst-registration",
  },
  {
    id: 2,
    title: "ITR Filing",
    description: "File your Income Tax Returns accurately and on time with our professional services.",
    link: "/service/itr-filing",
  },
  {
    id: 3,
    title: "Business Registration",
    description: "Register your business with ease and ensure compliance with all legal requirements.",
    link: "/service/business-registration",
  },
  {
    id: 4,
    title: "Tax Planning",
    description: "Optimize your tax liabilities and plan your finances effectively with our expert advice.",
    link: "/service/tax-planning",
  },
];

const features = [
  {
    id: 1,
    title: "Expert Consultants",
    description: "Our team of experienced consultants provides top-notch advice and support.",
  },
  {
    id: 2,
    title: "Timely Service",
    description: "We ensure that all your tasks are completed efficiently and on time.",
  },
  {
    id: 3,
    title: "Affordable Pricing",
    description: "Get high-quality services at competitive and transparent prices.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="ConsultSmart - Professional Business Consulting Services"
        description="Expert consulting services for GST, ITR, business registration, tax planning, and more. Get professional help for all your business needs."
        keywords="consulting, GST, ITR, tax planning, business registration, audit, accounting"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Your Trusted Business Consulting Partner
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We provide expert solutions for all your business needs, from GST and ITR to business registration and tax planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-primary text-primary-foreground py-3 px-6 rounded-full font-semibold hover:bg-primary/80 transition-colors">
              Get a Free Consultation
            </Link>
            <Link to="/dashboard" className="bg-secondary text-secondary-foreground py-3 px-6 rounded-full font-semibold hover:bg-secondary/80 transition-colors">
              Access Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-card rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <Link to={service.link} className="text-primary hover:underline mt-4 block">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Contact us today for a free consultation and let us help you achieve your business goals.
          </p>
          <Link to="/contact" className="bg-secondary text-secondary-foreground py-3 px-6 rounded-full font-semibold hover:bg-secondary/80 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto text-center px-4">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} ConsultSmart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
