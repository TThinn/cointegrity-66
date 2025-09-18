import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ChevronDown, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faDollarSign, 
  faExclamationTriangle, 
  faCoins, 
  faShield, 
  faGlobe, 
  faNetworkWired, 
  faLayerGroup, 
  faChartLine, 
  faBullseye, 
  faUsers, 
  faLock, 
  faZap, 
  faChartBar,
  faRocket,
  faHandshake,
  faArrowTrendUp,
  faGem
} from '@fortawesome/free-solid-svg-icons';
import ClientLogin from '@/components/client/ClientLogin';
import ClientFooter from '@/components/ClientFooter';
import AnimatedCounter from '@/components/client/AnimatedCounter';
import NavigationDots from '@/components/client/NavigationDots';
import TradeVolumeChart from '@/components/client/TradeVolumeChart';
import PaymentFlowSVG from '@/components/client/PaymentFlowSVG';
import '@/styles/client/client-theme.css';

const ClientHunitPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const sections = [
    'hero', 'challenges', 'opportunity', 'solutions', 'papss', 'blockchain', 
    'implementation', 'value-prop', 'next-steps', 'compliance'
  ];

  const sectionLabels = [
    'Hero', 'Challenges', 'Opportunity', 'Solutions', 'PAPSS', 'Blockchain', 
    'Implementation', 'Value Prop', 'Next Steps', 'Compliance'
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
      {/* Navigation Dots */}
      <NavigationDots 
        sections={sectionLabels}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

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
              <nav className="hidden md:flex space-x-4 lg:space-x-6">
                {sectionLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`text-xs lg:text-sm transition-colors ${
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
              className="client-button-secondary text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={el => sectionsRef.current[0] = el}
        className="pt-24 pb-16 bg-gradient-to-br from-client-bg to-client-card-bg animate-fadeInUp"
      >
        <div className="client-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-client-text-primary mb-6 leading-tight animate-slideInLeft">
              Beyond SWIFT: Alternative Payment Rails for 
              <span className="text-client-accent"> India-Africa Oil Trade</span>
            </h1>
            <p className="text-lg md:text-xl text-client-text-secondary mb-8 leading-relaxed animate-slideInRight">
              Strategic Options for Efficient, Secure, and Compliant Cross-Border Settlements
            </p>
            <p className="text-base md:text-lg text-client-text-muted mb-12 animate-fadeInUp">
              Explore innovative payment solutions to transform $17B annual India-Africa oil trade
            </p>
            <button 
              onClick={() => scrollToSection(1)}
              className="client-button inline-flex items-center space-x-2 animate-bounce"
            >
              <span>Explore Solutions</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="client-container">
        <div className="space-y-8 md:space-y-16 py-8 md:py-16">
          
          {/* Section 1: Current Challenges */}
          <section ref={el => sectionsRef.current[1] = el} className="client-card animate-fadeInUp">
            <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
              <div className="p-4 bg-red-50 rounded-2xl flex-shrink-0 self-start">
                <FontAwesomeIcon icon={faExclamationTriangle} className="w-8 h-8 text-red-600 icon-bounce" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Current Challenges in Cross-Border Oil Payments</h2>
                <p className="client-text mb-6">
                  Traditional cross-border payment systems create significant friction in the $17B India-Africa oil trade, 
                  imposing delays, costs, and risks that impact both importers and exporters.
                </p>
                
                {/* Payment Flow Diagram */}
                <div className="mb-8">
                  <PaymentFlowSVG />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="client-card bg-client-bg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Time Delays</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">3-5 days settlement time through correspondent banking networks</p>
                  </div>
                  
                  <div className="client-card bg-client-bg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">High Costs</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">2-4% in transaction fees, FX spreads, and intermediary charges</p>
                  </div>
                  
                  <div className="client-card bg-client-bg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Geopolitical Risk</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">Sanctions exposure and correspondent banking restrictions</p>
                  </div>
                  
                  <div className="client-card bg-client-bg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <FontAwesomeIcon icon={faCoins} className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Currency Inefficiency</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">Multiple currency conversions through USD intermediation</p>
                  </div>
                  
                  <div className="client-card bg-client-bg p-4 hover:shadow-md transition-all md:col-span-2 lg:col-span-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <FontAwesomeIcon icon={faShield} className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-client-text-primary">Compliance Complexity</h4>
                    </div>
                    <p className="text-sm text-client-text-secondary">Multi-jurisdictional regulatory requirements and reporting</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-client-accent/10 to-client-text-secondary/10 p-6 rounded-xl border-l-4 border-client-accent">
                  <blockquote className="text-base md:text-lg italic text-client-text-primary mb-2">
                    "The current SWIFT-based system was designed for a different era. Today's oil trade requires speed, efficiency, and direct settlement capabilities that legacy infrastructure simply cannot provide."
                  </blockquote>
                  <cite className="text-client-text-secondary">— Global Trade Finance Report 2024</cite>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Market Opportunity */}
          <section ref={el => sectionsRef.current[2] = el} className="client-card animate-fadeInUp">
            <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
              <div className="p-4 bg-green-50 rounded-2xl flex-shrink-0 self-start">
                <FontAwesomeIcon icon={faChartLine} className="w-8 h-8 text-green-600 icon-pulse" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">The India-Africa Oil Trade Opportunity</h2>
                <p className="client-text mb-6">
                  The rapidly growing India-Africa oil trade corridor presents unprecedented opportunities for 
                  payment system innovation and cost optimization.
                </p>
                
                {/* Key Statistics with Animated Counters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center client-card bg-client-bg p-6 hover:shadow-md transition-all">
                    <div className="text-2xl md:text-3xl font-bold text-client-accent mb-2">
                      $<AnimatedCounter end={17} />B
                    </div>
                    <div className="text-client-text-primary font-medium mb-1">Annual Trade Volume</div>
                    <div className="text-sm text-client-text-secondary">Current India-Africa oil trade value</div>
                  </div>
                  
                  <div className="text-center client-card bg-client-bg p-6 hover:shadow-md transition-all">
                    <div className="text-2xl md:text-3xl font-bold text-client-accent mb-2">
                      <AnimatedCounter end={20} />%
                    </div>
                    <div className="text-client-text-primary font-medium mb-1">India's Oil Imports</div>
                    <div className="text-sm text-client-text-secondary">Share from African countries</div>
                  </div>
                  
                  <div className="text-center client-card bg-client-bg p-6 hover:shadow-md transition-all">
                    <div className="text-2xl md:text-3xl font-bold text-client-accent mb-2">
                      <AnimatedCounter end={15} />%
                    </div>
                    <div className="text-client-text-primary font-medium mb-1">Annual Growth</div>
                    <div className="text-sm text-client-text-secondary">Projected trade expansion</div>
                  </div>
                </div>

                {/* Opportunity Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="client-card bg-client-bg p-6 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-3">
                      <FontAwesomeIcon icon={faChartBar} className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Growing Trade Volume</h4>
                    </div>
                    <p className="text-client-text-secondary">Expanding partnerships with Nigeria, Angola, and emerging producers</p>
                  </div>
                  
                  <div className="client-card bg-client-bg p-6 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-3">
                      <FontAwesomeIcon icon={faBullseye} className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Efficiency Potential</h4>
                    </div>
                    <p className="text-client-text-secondary">
                      $<AnimatedCounter end={340} />M-$<AnimatedCounter end={680} />M annual savings through payment optimization
                    </p>
                  </div>
                  
                  <div className="client-card bg-client-bg p-6 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-3">
                      <FontAwesomeIcon icon={faHandshake} className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Strategic Partnerships</h4>
                    </div>
                    <p className="text-client-text-secondary">Government-to-government agreements enabling direct settlements</p>
                  </div>
                </div>

                {/* Top African Oil Exporters Chart */}
                <div className="client-card bg-client-bg p-6 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-client-text-primary mb-4">Top African Oil Exporters to India (2024)</h4>
                  <TradeVolumeChart />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Solution Overview */}
          <section ref={el => sectionsRef.current[3] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <FontAwesomeIcon icon={faLayerGroup} className="w-8 h-8 text-blue-600" />
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
                      <FontAwesomeIcon icon={faGlobe} className="w-6 h-6 text-client-accent" />
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
                      <FontAwesomeIcon icon={faNetworkWired} className="w-6 h-6 text-client-accent" />
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
                      <FontAwesomeIcon icon={faCoins} className="w-6 h-6 text-client-accent" />
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
                      <FontAwesomeIcon icon={faZap} className="w-6 h-6 text-client-accent" />
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

          {/* Section 4: PAPSS Details */}
          <section ref={el => sectionsRef.current[4] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-purple-50 rounded-2xl">
                <FontAwesomeIcon icon={faGlobe} className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">PAPSS: The Pan-African Payment Solution</h2>
                <p className="client-text mb-6">
                  The Pan-African Payment and Settlement System represents Africa's most ambitious 
                  financial infrastructure project, enabling seamless cross-border payments across the continent.
                </p>
                
                {/* Key Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-client-bg p-4 rounded-xl text-center">
                    <FontAwesomeIcon icon={faClock} className="w-6 h-6 text-client-accent mx-auto mb-2" />
                    <h4 className="font-semibold text-client-text-primary mb-1">Real-Time Settlement</h4>
                    <p className="text-sm text-client-text-secondary">120 seconds average</p>
                  </div>
                  
                  <div className="bg-client-bg p-4 rounded-xl text-center">
                    <FontAwesomeIcon icon={faCoins} className="w-6 h-6 text-client-accent mx-auto mb-2" />
                    <h4 className="font-semibold text-client-text-primary mb-1">Local Currency</h4>
                    <p className="text-sm text-client-text-secondary">Direct transactions</p>
                  </div>
                  
                  <div className="bg-client-bg p-4 rounded-xl text-center">
                    <FontAwesomeIcon icon={faShield} className="w-6 h-6 text-client-accent mx-auto mb-2" />
                    <h4 className="font-semibold text-client-text-primary mb-1">Built-in Compliance</h4>
                    <p className="text-sm text-client-text-secondary">Automated screening</p>
                  </div>
                  
                  <div className="bg-client-bg p-4 rounded-xl text-center">
                    <FontAwesomeIcon icon={faNetworkWired} className="w-6 h-6 text-client-accent mx-auto mb-2" />
                    <h4 className="font-semibold text-client-text-primary mb-1">ISO 20022</h4>
                    <p className="text-sm text-client-text-secondary">Global messaging</p>
                  </div>
                </div>

                {/* Coverage Map */}
                <div className="bg-client-bg p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-client-text-primary mb-4">Key Oil Exporters Coverage</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-client-text-secondary">Nigeria - Active</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-client-text-secondary">Algeria - Active</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-client-text-secondary">Egypt - Active</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-client-text-secondary">Ghana - Pilot</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-client-text-secondary">Tunisia - Pilot</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-client-text-secondary">Morocco - Planned</span>
                    </div>
                  </div>
                </div>

                {/* India Gateway Potential */}
                <div className="bg-gradient-to-r from-client-accent/10 to-purple-500/10 p-6 rounded-xl border border-client-accent/30">
                  <h4 className="font-semibold text-client-text-primary mb-3">India Gateway Integration Potential</h4>
                  <p className="text-client-text-secondary mb-4">
                    RBI discussions with AfCFTA Secretariat suggest potential for India-PAPSS gateway, 
                    enabling direct INR-to-African currency settlements through the continental payment system.
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-client-accent rounded-full"></div>
                    <span className="text-sm text-client-text-secondary">Expected timeline: Q2 2025 pilot program</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Blockchain Solutions */}
          <section ref={el => sectionsRef.current[5] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-indigo-50 rounded-2xl">
                <FontAwesomeIcon icon={faNetworkWired} className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Enterprise Blockchain Payment Platforms</h2>
                <p className="client-text mb-6">
                  Enterprise-grade blockchain platforms provide secure, compliant, and scalable infrastructure 
                  for cross-border oil trade settlements with institutional-level security and regulatory features.
                </p>
                
                {/* Platform Comparison Table */}
                <div className="bg-client-bg p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-client-text-primary mb-4">Platform Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-client-border">
                          <th className="text-left py-3 text-client-text-primary font-medium">Platform</th>
                          <th className="text-left py-3 text-client-text-primary font-medium">Key Strength</th>
                          <th className="text-left py-3 text-client-text-primary font-medium">Settlement Time</th>
                          <th className="text-left py-3 text-client-text-primary font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-client-border/50">
                          <td className="py-3 font-medium text-client-text-primary">Fireblocks</td>
                          <td className="py-3 text-client-text-secondary">Multi-party computation security</td>
                          <td className="py-3 text-client-text-secondary">2-5 minutes</td>
                          <td className="py-3"><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">Available</span></td>
                        </tr>
                        <tr className="border-b border-client-border/50">
                          <td className="py-3 font-medium text-client-text-primary">BitGo</td>
                          <td className="py-3 text-client-text-secondary">Institutional custody & compliance</td>
                          <td className="py-3 text-client-text-secondary">1-3 minutes</td>
                          <td className="py-3"><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">Available</span></td>
                        </tr>
                        <tr className="border-b border-client-border/50">
                          <td className="py-3 font-medium text-client-text-primary">Circle</td>
                          <td className="py-3 text-client-text-secondary">USDC stablecoin integration</td>
                          <td className="py-3 text-client-text-secondary">10-30 seconds</td>
                          <td className="py-3"><span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">Available</span></td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium text-client-text-primary">Nuvei</td>
                          <td className="py-3 text-client-text-secondary">Local payment method integration</td>
                          <td className="py-3 text-client-text-secondary">5-15 minutes</td>
                          <td className="py-3"><span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs">Beta</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Advantages */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <FontAwesomeIcon icon={faLock} className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Enterprise-Grade Security</h4>
                    </div>
                    <p className="text-client-text-secondary">Multi-signature wallets, hardware security modules, and institutional custody standards</p>
                  </div>
                  
                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <FontAwesomeIcon icon={faNetworkWired} className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Interoperability</h4>
                    </div>
                    <p className="text-client-text-secondary">Cross-chain compatibility and traditional banking system integration</p>
                  </div>
                  
                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <FontAwesomeIcon icon={faShield} className="w-6 h-6 text-client-accent" />
                      <h4 className="font-semibold text-client-text-primary">Regulatory Compliance</h4>
                    </div>
                    <p className="text-client-text-secondary">Built-in AML/KYC, transaction monitoring, and regulatory reporting</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Implementation */}
          <section ref={el => sectionsRef.current[6] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-orange-50 rounded-2xl">
                <FontAwesomeIcon icon={faLayerGroup} className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Implementation Roadmap</h2>
                <p className="client-text mb-8">
                  A structured 4-phase approach ensures successful deployment of alternative payment rails 
                  with minimal disruption to existing oil trade operations.
                </p>
                
                {/* Timeline Phases */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-client-accent rounded-full flex items-center justify-center text-client-card-bg font-bold">1</div>
                      <div className="w-px h-16 bg-client-border mt-2"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="font-semibold text-client-text-primary mb-2">Assessment Phase (Weeks 1-4)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">Regulatory Analysis</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• RBI compliance requirements</li>
                            <li>• African regulatory frameworks</li>
                            <li>• Cross-border compliance mapping</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">Volume Assessment</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• Historical transaction analysis</li>
                            <li>• Peak volume identification</li>
                            <li>• Cost-benefit modeling</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-client-accent rounded-full flex items-center justify-center text-client-card-bg font-bold">2</div>
                      <div className="w-px h-16 bg-client-border mt-2"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="font-semibold text-client-text-primary mb-2">Design Phase (Weeks 5-10)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">Architecture Design</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• System architecture blueprint</li>
                            <li>• Integration points mapping</li>
                            <li>• Failover mechanisms</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">Security Framework</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• Multi-signature setup</li>
                            <li>• Key management protocols</li>
                            <li>• Audit trail design</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-client-accent rounded-full flex items-center justify-center text-client-card-bg font-bold">3</div>
                      <div className="w-px h-16 bg-client-border mt-2"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="font-semibold text-client-text-primary mb-2">Implementation Phase (Weeks 11-20)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">Platform Configuration</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• Blockchain network setup</li>
                            <li>• Smart contract deployment</li>
                            <li>• API gateway configuration</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">System Integration</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• ERP system connectivity</li>
                            <li>• Banking system integration</li>
                            <li>• Real-time monitoring setup</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-client-accent rounded-full flex items-center justify-center text-client-card-bg font-bold">4</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-client-text-primary mb-2">Deployment Phase (Weeks 21-24)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">Team Training</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• Operations team certification</li>
                            <li>• Risk management training</li>
                            <li>• Emergency procedures</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-client-text-primary mb-2">Pilot Program</h4>
                          <ul className="text-sm text-client-text-secondary space-y-1">
                            <li>• Small-volume test transactions</li>
                            <li>• Performance monitoring</li>
                            <li>• Gradual volume scaling</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Note */}
                <div className="bg-client-bg p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-client-accent" />
                    <div>
                      <h4 className="font-medium text-client-text-primary">Typical Implementation Timeline</h4>
                      <p className="text-sm text-client-text-secondary">4-6 months for full deployment with parallel operation during transition period</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Value Proposition */}
          <section ref={el => sectionsRef.current[7] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-green-50 rounded-2xl">
                <FontAwesomeIcon icon={faArrowTrendUp} className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Key Advantages of Alternative Payment Rails</h2>
                <p className="client-text mb-8">
                  Alternative payment systems deliver measurable improvements across cost, speed, risk, 
                  and strategic dimensions for India-Africa oil trade operations.
                </p>
                
                {/* Main Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faDollarSign} className="w-6 h-6 text-green-600" />
                      <h3 className="font-semibold text-client-text-primary">Cost Reduction</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-client-text-secondary">Transaction fees</span>
                        <span className="text-sm font-medium text-green-600">-60% to -80%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-client-text-secondary">FX spreads</span>
                        <span className="text-sm font-medium text-green-600">-40% to -70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-client-text-secondary">Operational costs</span>
                        <span className="text-sm font-medium text-green-600">-50% to -60%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faZap} className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold text-client-text-primary">Speed Improvement</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-client-text-secondary">Settlement time</span>
                        <span className="text-sm font-medium text-blue-600">Minutes vs Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-client-text-secondary">Confirmation</span>
                        <span className="text-sm font-medium text-blue-600">Real-time</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-client-text-secondary">Working capital</span>
                        <span className="text-sm font-medium text-blue-600">3-5 day improvement</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faShield} className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold text-client-text-primary">Risk Mitigation</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Reduced counterparty risk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Lower sanctions exposure</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Operational resilience</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faLock} className="w-6 h-6 text-indigo-600" />
                      <h3 className="font-semibold text-client-text-primary">Compliance Automation</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Automated AML screening</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Real-time monitoring</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Regulatory reporting</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faGlobe} className="w-6 h-6 text-teal-600" />
                      <h3 className="font-semibold text-client-text-primary">Currency Sovereignty</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Direct INR-African currency</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Reduced USD dependency</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Local economy support</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faBullseye} className="w-6 h-6 text-red-600" />
                      <h3 className="font-semibold text-client-text-primary">Strategic Independence</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Alternative to SWIFT</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">Geopolitical resilience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-client-text-secondary">South-South cooperation</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI Highlight */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-client-text-primary mb-4">Return on Investment Projection</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">$340M - $680M</div>
                      <div className="text-sm text-client-text-secondary">Annual cost savings potential</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">6-12 months</div>
                      <div className="text-sm text-client-text-secondary">Payback period</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">300-500%</div>
                      <div className="text-sm text-client-text-secondary">3-year ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Next Steps */}
          <section ref={el => sectionsRef.current[8] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <FontAwesomeIcon icon={faUsers} className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="client-heading-md mb-4">Partner with Cointegrity</h2>
                <p className="client-text mb-8">
                  Transform your India-Africa oil trade operations with our comprehensive suite of 
                  consulting services and strategic partnership facilitation.
                </p>
                
                {/* Engagement Options */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-client-bg p-6 rounded-xl border-2 border-client-border hover:border-client-accent transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faChartBar} className="w-6 h-6 text-client-accent" />
                      <h3 className="font-semibold text-client-text-primary">Strategic Assessment</h3>
                    </div>
                    <p className="text-client-text-secondary mb-4">
                      Comprehensive analysis of your current payment infrastructure, regulatory requirements, 
                      and optimization opportunities.
                    </p>
                    <ul className="space-y-2 text-sm text-client-text-secondary">
                      <li>• Cost-benefit analysis</li>
                      <li>• Regulatory compliance audit</li>
                      <li>• Risk assessment</li>
                      <li>• Implementation roadmap</li>
                    </ul>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl border-2 border-client-border hover:border-client-accent transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faZap} className="w-6 h-6 text-client-accent" />
                      <h3 className="font-semibold text-client-text-primary">Proof of Concept</h3>
                    </div>
                    <p className="text-client-text-secondary mb-4">
                      Limited-scale pilot program to demonstrate alternative payment rail capabilities 
                      with your specific trade partners.
                    </p>
                    <ul className="space-y-2 text-sm text-client-text-secondary">
                      <li>• Small-volume test transactions</li>
                      <li>• Performance benchmarking</li>
                      <li>• Integration testing</li>
                      <li>• Results documentation</li>
                    </ul>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl border-2 border-client-border hover:border-client-accent transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faNetworkWired} className="w-6 h-6 text-client-accent" />
                      <h3 className="font-semibold text-client-text-primary">Partnership Facilitation</h3>
                    </div>
                    <p className="text-client-text-secondary mb-4">
                      Direct introductions and relationship management with African oil producers, 
                      payment platforms, and regulatory bodies.
                    </p>
                    <ul className="space-y-2 text-sm text-client-text-secondary">
                      <li>• Producer relationship development</li>
                      <li>• Platform vendor negotiations</li>
                      <li>• Regulatory engagement</li>
                      <li>• Contract structuring</li>
                    </ul>
                  </div>

                  <div className="bg-client-bg p-6 rounded-xl border-2 border-client-border hover:border-client-accent transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                      <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-client-accent" />
                      <h3 className="font-semibold text-client-text-primary">Executive Workshop</h3>
                    </div>
                    <p className="text-client-text-secondary mb-4">
                      Interactive sessions for your leadership team covering strategic implications, 
                      risk management, and implementation best practices.
                    </p>
                    <ul className="space-y-2 text-sm text-client-text-secondary">
                      <li>• Strategy alignment sessions</li>
                      <li>• Risk mitigation planning</li>
                      <li>• Technology deep-dives</li>
                      <li>• Implementation planning</li>
                    </ul>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-client-card-bg border border-client-border p-6 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-client-text-primary">Ready to Get Started?</h3>
                      <p className="text-client-text-secondary mb-4">
                        Schedule a confidential consultation to discuss your specific 
                        India-Africa oil trade payment transformation needs.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>+91-11-4567-8900</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                          <span>partnerships@cointegrity.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <button className="client-button mb-3 block w-full md:w-auto">
                        Schedule Consultation
                      </button>
                      <button className="client-button-secondary block w-full md:w-auto">
                        Download White Paper
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Regulatory Compliance */}
          <section ref={el => sectionsRef.current[9] = el} className="client-card">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-client-accent/10 rounded-2xl">
                <FontAwesomeIcon icon={faShield} className="w-8 h-8 text-client-accent" />
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
      <section className="bg-client-bg py-16">
        <div className="client-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-client-text-primary mb-6">
              Ready to Transform Your Oil Trade Payments?
            </h2>
            <p className="text-xl text-client-text-secondary mb-8">
              Partner with us to implement cutting-edge payment solutions that reduce costs, 
              increase efficiency, and ensure regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="client-button">
                Schedule Consultation
              </button>
              <button className="client-button-secondary flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <ClientFooter />
    </div>
  );
};

export default ClientHunitPage;