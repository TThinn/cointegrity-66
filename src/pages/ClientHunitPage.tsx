import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ChevronDown, Globe, Zap, Shield, DollarSign, TrendingUp, Lock, Network, Users, Phone, Clock, AlertTriangle, Coins, Target, BarChart3, Layers } from 'lucide-react';
import ClientLogin from '@/components/client/ClientLogin';
import Footer from '@/components/Footer';
import '@/styles/client/client-theme.css';

const ClientHunitPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const sections = [
    'hero', 'cbdc', 'blockchain', 'correspondent', 'local-currency', 
    'trade-finance', 'rupee-systems', 'crypto', 'regional-networks', 'compliance'
  ];

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section
      const sectionElements = sectionsRef.current;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollTop + 200) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="client-page">
        <div className="client-container">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-client-secondary">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <ClientLogin />;
  }

  return (
    <div className="client-page">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-client-border z-50">
        <div 
          className="h-full bg-client-accent transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Fixed Navigation Header */}
      <header className="fixed top-1 left-0 right-0 bg-client-bg/90 backdrop-blur-sm border-b border-client-border z-40">
        <div className="client-container">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-client-text-primary">Hunit</h1>
              <nav className="hidden md:flex space-x-6">
                {['Hero', 'Challenges', 'Opportunity', 'Solutions', 'Local Currency', 'Trade Finance', 'Rupee Systems', 'Crypto', 'Networks', 'Compliance'].map((label, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`text-sm transition-colors ${
                      activeSection === index 
                        ? 'text-client-accent font-medium' 
                        : 'text-client-text-secondary hover:text-client-accent'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>
            <button 
              onClick={handleLogout}
              className="client-button-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={el => sectionsRef.current[0] = el}
        className="pt-20 pb-16 bg-gradient-to-br from-client-bg to-client-card-bg"
      >
        <div className="client-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-client-text-primary mb-6 leading-tight">
              Beyond SWIFT: Alternative Payment Rails for 
              <span className="text-client-accent"> India-Africa Oil Trade</span>
            </h1>
            <p className="text-xl text-client-text-secondary mb-8 leading-relaxed">
              Strategic Options for Efficient, Secure, and Compliant Cross-Border Settlements
            </p>
            <p className="text-lg text-client-text-muted mb-12">
              Explore innovative payment solutions to transform $17B annual India-Africa oil trade
            </p>
            <button 
              onClick={() => scrollToSection(1)}
              className="client-button inline-flex items-center space-x-2"
            >
              <span>Explore Solutions</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="client-container">
        <div className="space-y-16 py-16">
          
          {/* Section 1: Current Challenges */}
          <section ref={el => sectionsRef.current[1] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-red-50 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Current Challenges in Cross-Border Oil Payments</h2>
                <p className="client-text mb-6">
                  Traditional cross-border payment systems create significant friction in the $17B India-Africa oil trade, 
                  imposing delays, costs, and risks that impact both importers and exporters.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="bg-client-bg p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Time Delays</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">3-5 days settlement time through correspondent banking networks</p>
                  </div>
                  
                  <div className="bg-client-bg p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">High Costs</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">2-4% in transaction fees, FX spreads, and intermediary charges</p>
                  </div>
                  
                  <div className="bg-client-bg p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Geopolitical Risk</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">Sanctions exposure and correspondent banking restrictions</p>
                  </div>
                  
                  <div className="bg-client-bg p-4 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Coins className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Currency Inefficiency</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">Multiple currency conversions through USD intermediation</p>
                  </div>
                  
                  <div className="bg-client-bg p-4 rounded-xl md:col-span-2 lg:col-span-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Compliance Complexity</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">Multi-jurisdictional regulatory requirements and reporting</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-client-accent/10 to-client-text-secondary/10 p-6 rounded-xl border-l-4 border-client-accent">
                  <blockquote className="text-lg italic text-client-text-primary mb-2">
                    "The current SWIFT-based system was designed for a different era. Today's oil trade requires speed, efficiency, and direct settlement capabilities that legacy infrastructure simply cannot provide."
                  </blockquote>
                  <cite className="text-client-text-secondary">— Global Trade Finance Report 2024</cite>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Market Opportunity */}
          <section ref={el => sectionsRef.current[2] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-green-50 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">The India-Africa Oil Trade Opportunity</h2>
                <p className="client-text mb-6">
                  The rapidly growing India-Africa oil trade corridor presents unprecedented opportunities for 
                  payment system innovation and cost optimization.
                </p>
                
                {/* Key Statistics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center bg-client-bg p-6 rounded-xl">
                    <div className="text-3xl font-bold text-client-accent mb-2">$17B</div>
                    <div className="text-client-text-primary font-medium mb-1">Annual Trade Volume</div>
                    <div className="text-sm text-client-text-secondary">Current India-Africa oil trade value</div>
                  </div>
                  
                  <div className="text-center bg-client-bg p-6 rounded-xl">
                    <div className="text-3xl font-bold text-client-accent mb-2">20%</div>
                    <div className="text-client-text-primary font-medium mb-1">India's Oil Imports</div>
                    <div className="text-sm text-client-text-secondary">Share from African countries</div>
                  </div>
                  
                  <div className="text-center bg-client-bg p-6 rounded-xl">
                    <div className="text-3xl font-bold text-client-accent mb-2">15%</div>
                    <div className="text-client-text-primary font-medium mb-1">Annual Growth</div>
                    <div className="text-sm text-client-text-secondary">Projected trade expansion</div>
                  </div>
                </div>

                {/* Opportunity Highlights */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <BarChart3 className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Growing Trade Volume</h4>
                    </div>
                    <p className="text-client-text-secondary">Expanding partnerships with Nigeria, Angola, and emerging producers</p>
                  </div>
                  
                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <Target className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Efficiency Potential</h4>
                    </div>
                    <p className="text-client-text-secondary">$340-680M annual savings through payment optimization</p>
                  </div>
                  
                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Strategic Partnerships</h4>
                    </div>
                    <p className="text-client-text-secondary">Government-to-government agreements enabling direct settlements</p>
                  </div>
                </div>

                {/* Top African Oil Exporters Chart */}
                <div className="bg-client-bg p-6 rounded-xl">
                  <h4 className="font-semibold text-client-text-primary mb-4">Top African Oil Exporters to India (2024)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-client-text-secondary">Nigeria</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-client-border rounded-full h-2">
                          <div className="bg-client-accent h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <span className="text-client-text-primary font-medium">$6.2B</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-client-text-secondary">Angola</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-client-border rounded-full h-2">
                          <div className="bg-client-accent h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-client-text-primary font-medium">$4.3B</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-client-text-secondary">South Africa</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-client-border rounded-full h-2">
                          <div className="bg-client-accent h-2 rounded-full" style={{width: '25%'}}></div>
                        </div>
                        <span className="text-client-text-primary font-medium">$2.4B</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-client-text-secondary">Ghana</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-client-border rounded-full h-2">
                          <div className="bg-client-accent h-2 rounded-full" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-client-text-primary font-medium">$1.4B</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Solution Overview */}
          <section ref={el => sectionsRef.current[3] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Alternative Payment Rail Options</h2>
                <p className="client-text mb-8">
                  Three primary pathways emerge for transforming India-Africa oil trade payments, 
                  each offering distinct advantages for different trade scenarios and risk profiles.
                </p>
                
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                  {/* PAPSS */}
                  <div className="bg-client-bg p-6 rounded-xl border-2 border-client-border hover:border-client-accent transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                      <Globe className="w-6 h-6 text-client-accent" />
                      <h3 className="client-heading-sm">PAPSS Integration</h3>
                    </div>
                    <p className="client-text mb-4 text-sm">
                      Pan-African Payment and Settlement System enables direct local currency settlements 
                      across African countries.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Multi-country coverage</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Central bank endorsed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Local currency focus</span>
                      </div>
                    </div>
                  </div>

                  {/* Blockchain */}
                  <div className="bg-client-bg p-6 rounded-xl border-2 border-client-border hover:border-client-accent transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                      <Network className="w-6 h-6 text-client-accent" />
                      <h3 className="client-heading-sm">Enterprise Blockchain</h3>
                    </div>
                    <p className="client-text mb-4 text-sm">
                      Private blockchain networks with smart contracts for automated, 
                      programmable oil trade settlements.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Instant settlement</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Smart contract automation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Immutable audit trail</span>
                      </div>
                    </div>
                  </div>

                  {/* Stablecoin */}
                  <div className="bg-client-bg p-6 rounded-xl border-2 border-client-border hover:border-client-accent transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                      <Coins className="w-6 h-6 text-client-accent" />
                      <h3 className="client-heading-sm">Stablecoin Infrastructure</h3>
                    </div>
                    <p className="client-text mb-4 text-sm">
                      Regulated stablecoins and CBDCs provide stable value transfers 
                      with programmable compliance features.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">24/7 availability</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Regulatory compliance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Price stability</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hybrid Approach Highlight */}
                <div className="bg-gradient-to-r from-client-accent/10 to-blue-500/10 p-6 rounded-xl border border-client-accent/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-client-accent/20 rounded-lg">
                      <Zap className="w-6 h-6 text-client-accent" />
                    </div>
                    <h3 className="client-heading-sm text-client-accent">Recommended: Hybrid Approach</h3>
                  </div>
                  <p className="client-text mb-4">
                    Combining regional payment systems (PAPSS) with blockchain infrastructure creates 
                    the optimal balance of coverage, speed, and compliance for India-Africa oil trade.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-client-text-primary mb-2">Regional Layer (PAPSS)</h4>
                      <p className="text-sm text-client-text-secondary">Handles local currency settlements and regulatory compliance within Africa</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-client-text-primary mb-2">Blockchain Layer</h4>
                      <p className="text-sm text-client-text-secondary">Provides cross-border automation and India-Africa connectivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Local Currency Settlement */}
          <section ref={el => sectionsRef.current[4] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-client-accent/10 rounded-2xl">
                <DollarSign className="w-8 h-8 text-client-accent" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Local Currency Settlement Mechanisms</h2>
                <p className="client-text mb-6">
                  Bilateral currency agreements enable direct INR-to-local currency settlements, 
                  reducing USD dependency and foreign exchange risks for both trading partners.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-3">Current Agreements</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-client-text-secondary">Nigeria (Naira)</span>
                        <span className="text-client-accent">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-client-text-secondary">South Africa (Rand)</span>
                        <span className="text-client-accent">Pilot</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-client-text-secondary">Angola (Kwanza)</span>
                        <span className="text-orange-500">Negotiating</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-3">Benefits</h4>
                    <ul className="space-y-2 text-client-text-secondary">
                      <li>• 15-20% cost reduction</li>
                      <li>• Faster settlement (2-3 days)</li>
                      <li>• Reduced FX exposure</li>
                      <li>• Support for local economies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Trade Finance Platforms */}
          <section ref={el => sectionsRef.current[5] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-client-accent/10 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-client-accent" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Digital Trade Finance Platforms</h2>
                <p className="client-text mb-6">
                  Integrated platforms combining letters of credit, trade financing, and settlement mechanisms 
                  streamline the entire oil trade lifecycle from contract to payment.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-4">Platform Features</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-4 h-4 text-client-accent" />
                        <span className="text-client-text-secondary">Digital Letters of Credit</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Lock className="w-4 h-4 text-client-accent" />
                        <span className="text-client-text-secondary">Escrow Services</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-4 h-4 text-client-accent" />
                        <span className="text-client-text-secondary">Multi-party Workflows</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-4">Key Players</h4>
                    <ul className="space-y-2 text-client-text-secondary">
                      <li>• JPMorgan Onyx Platform</li>
                      <li>• TradeIX Marco Polo</li>
                      <li>• HSBC Trade Connect</li>
                      <li>• Local fintech solutions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Rupee-Based Payment Systems */}
          <section ref={el => sectionsRef.current[6] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-client-accent/10 rounded-2xl">
                <Globe className="w-8 h-8 text-client-accent" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Rupee-Based Payment Systems</h2>
                <p className="client-text mb-6">
                  India's push for INR internationalization creates opportunities for direct rupee-denominated 
                  oil purchases, supported by rupee nostro accounts and trade credit arrangements.
                </p>
                <div className="bg-client-bg p-6 rounded-xl">
                  <h4 className="font-semibold text-client-text-primary mb-4">RBI Special Rupee Vostro Account (SRVA) Mechanism</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-client-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-client-accent font-bold">1</span>
                      </div>
                      <p className="text-sm text-client-text-secondary">Setup SRVA with African banks</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-client-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-client-accent font-bold">2</span>
                      </div>
                      <p className="text-sm text-client-text-secondary">Direct INR payments for oil</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-client-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-client-accent font-bold">3</span>
                      </div>
                      <p className="text-sm text-client-text-secondary">Rupee utilization for trade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Cryptocurrency Solutions */}
          <section ref={el => sectionsRef.current[7] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-client-accent/10 rounded-2xl">
                <Network className="w-8 h-8 text-client-accent" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Cryptocurrency & Stablecoin Solutions</h2>
                <p className="client-text mb-6">
                  Regulated digital assets and stablecoins provide 24/7 settlement capabilities with 
                  programmable compliance features, ideal for high-value oil trade transactions.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-3">Stablecoin Options</h4>
                    <ul className="space-y-2 text-client-text-secondary">
                      <li>• USD-pegged stablecoins (USDC, USDT)</li>
                      <li>• INR-backed digital rupee</li>
                      <li>• Commodity-backed tokens</li>
                      <li>• Central bank digital currencies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-3">Regulatory Considerations</h4>
                    <ul className="space-y-2 text-client-text-secondary">
                      <li>• RBI crypto framework compliance</li>
                      <li>• African regulatory sandboxes</li>
                      <li>• Anti-money laundering protocols</li>
                      <li>• Cross-border reporting requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Regional Payment Networks */}
          <section ref={el => sectionsRef.current[8] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-client-accent/10 rounded-2xl">
                <Users className="w-8 h-8 text-client-accent" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Regional Payment Networks</h2>
                <p className="client-text mb-6">
                  Leveraging existing regional payment infrastructures like UPI, NPCI, and African fintech networks 
                  to create seamless cross-border payment corridors for oil trade.
                </p>
                <div className="space-y-6">
                  <div className="bg-client-bg p-4 rounded-xl">
                    <h4 className="font-semibold text-client-text-primary mb-2">India Stack Integration</h4>
                    <p className="text-client-text-secondary">Extending UPI and NPCI capabilities for international B2B settlements</p>
                  </div>
                  <div className="bg-client-bg p-4 rounded-xl">
                    <h4 className="font-semibold text-client-text-primary mb-2">African Fintech Partnerships</h4>
                    <p className="text-client-text-secondary">Collaborations with Flutterwave, Paystack, and Interswitch for seamless integration</p>
                  </div>
                  <div className="bg-client-bg p-4 rounded-xl">
                    <h4 className="font-semibold text-client-text-primary mb-2">Pan-African Payment System (PAPSS)</h4>
                    <p className="text-client-text-secondary">Utilizing continental payment infrastructure for multi-country oil trade</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Regulatory Compliance */}
          <section ref={el => sectionsRef.current[9] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-client-accent/10 rounded-2xl">
                <Shield className="w-8 h-8 text-client-accent" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Regulatory Compliance Framework</h2>
                <p className="client-text mb-6">
                  Comprehensive compliance strategy ensuring adherence to Indian, African, and international 
                  regulations while maintaining operational efficiency and risk management.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-4">Indian Regulations</h4>
                    <ul className="space-y-2 text-client-text-secondary">
                      <li>• FEMA compliance for forex transactions</li>
                      <li>• RBI guidelines for trade settlements</li>
                      <li>• PMLA anti-money laundering norms</li>
                      <li>• Customs and excise regulations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-client-text-primary mb-4">International Standards</h4>
                    <ul className="space-y-2 text-client-text-secondary">
                      <li>• FATF recommendations compliance</li>
                      <li>• Sanctions screening protocols</li>
                      <li>• KYC/AML verification systems</li>
                      <li>• Trade-based money laundering prevention</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Contact CTA Section */}
      <section className="bg-gradient-to-r from-client-accent to-client-text-secondary py-16">
        <div className="client-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Oil Trade Payments?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Partner with us to implement cutting-edge payment solutions that reduce costs, 
              increase efficiency, and ensure regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-client-accent px-8 py-4 rounded-2xl font-semibold hover:bg-white/90 transition-colors">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientHunitPage;