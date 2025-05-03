
import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Testimonials } from '../components/Testimonials';
import { Partners } from '../components/Partners';
import { Accreditations } from '../components/Accreditations';
import { Founders } from '../components/Founders';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <Partners />
      <Accreditations />
      <Founders />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Index;
