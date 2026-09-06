import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronDown, ChevronRight, Clock, Facebook, Flower2, Leaf, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star, UserRound, Instagram, X } from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/6187418/pexels-photo-6187418.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600',
  interior: 'https://images.pexels.com/photos/4170175/pexels-photo-4170175.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  candle: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000',
};

const services = [
  {
    title: 'Dry Massage',
    text: 'A focused, oil-free massage that eases deep-seated tension and restores natural balance.',
    image: 'https://images.pexels.com/photos/38407786/pexels-photo-38407786.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    prices: [{ duration: '60 Minutes', price: '4,000 Tk' }, { duration: '90 Minutes', price: '5,000 Tk' }, { duration: '120 Minutes', price: '7,000 Tk' }],
  },
  {
    title: 'Thai Traditional Massage',
    text: 'Authentic Thai stretching and acupressure techniques to invigorate body and mind.',
    image: 'https://images.pexels.com/photos/34821383/pexels-photo-34821383.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    prices: [{ duration: '60 Minutes', price: '4,000 Tk' }, { duration: '90 Minutes', price: '5,500 Tk' }, { duration: '120 Minutes', price: '7,500 Tk' }],
  },
  {
    title: 'Aroma Oil Massage',
    text: 'A soothing aromatic oil massage that calms the senses and nourishes the skin.',
    image: 'https://images.pexels.com/photos/38407789/pexels-photo-38407789.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    prices: [{ duration: '60 Minutes', price: '4,000 Tk' }, { duration: '90 Minutes', price: '6,000 Tk' }, { duration: '120 Minutes', price: '7,500 Tk' }],
  },
  {
    title: 'Back & Shoulder Massage',
    text: 'Targeted relief for the back and shoulders, releasing knots and built-up stress.',
    image: 'https://images.pexels.com/photos/37719545/pexels-photo-37719545.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    prices: [{ duration: '60 Minutes', price: '4,000 Tk' }, { duration: '90 Minutes', price: '6,000 Tk' }, { duration: '120 Minutes', price: '7,500 Tk' }],
  },
  {
    title: 'Full Body Massage',
    text: 'A complete head-to-toe treatment designed for total relaxation and renewal.',
    image: 'https://images.pexels.com/photos/4599396/pexels-photo-4599396.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    prices: [{ duration: '60 Minutes', price: '4,000 Tk' }, { duration: '90 Minutes', price: '6,000 Tk' }, { duration: '120 Minutes', price: '7,500 Tk' }],
  },
  {
    title: 'Body to Body Massage',
    text: 'An intimate wellness experience combining flowing strokes for complete relaxation.',
    image: 'https://images.pexels.com/photos/37719647/pexels-photo-37719647.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    prices: [{ duration: '60 Minutes', price: '8,000 Tk' }, { duration: '90 Minutes', price: '11,000 Tk' }, { duration: '120 Minutes', price: '15,000 Tk' }],
  },
  {
    title: 'Four Hand Massage',
    text: 'Two therapists working in perfect harmony for a uniquely synchronized treatment.',
    image: 'https://images.pexels.com/photos/5888096/pexels-photo-5888096.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    prices: [{ duration: '60 Minutes', price: '11,000 Tk' }, { duration: '90 Minutes', price: '15,000 Tk' }, { duration: '120 Minutes', price: '20,000 Tk' }],
  },
];

const benefits = [
  { icon: Flower2, title: 'Premium Services', text: 'High-quality spa & wellness treatments.' },
  { icon: UserRound, title: 'Expert Therapists', text: 'Professional and experienced therapists.' },
  { icon: Leaf, title: 'Hygienic & Safe', text: 'A clean, comfortable environment.' },
  { icon: Star, title: 'Customer Satisfaction', text: 'Your comfort comes first.' },
];

const menuItems = ['HOME', 'ABOUT US', 'SERVICES', 'GALLERY', 'REVIEWS', 'CONTACT'];
const galleryImages = [
  { src: '/image1.png', alt: 'Nora Spa treatment room' },
  { src: '/image2.png', alt: 'Nora Spa reception lounge' },
  { src: '/image3.png', alt: 'Nora Spa reception area' },
  { src: '/image4.png', alt: 'Nora Spa massage products and towels' },
  { src: '/image5.png', alt: 'Nora Spa treatment room' },
  { src: '/image6.png', alt: 'Nora Spa treatment room' },
  { src: '/image7.png', alt: 'Nora Spa treatment room' },
];

const makeParticles = (count: number) => Array.from({ length: count }, (_, i) => ({
  id: i,
  left: `${Math.round(Math.random() * 100)}%`,
  top: `${Math.round(Math.random() * 100)}%`,
  size: 2 + Math.round(Math.random() * 3),
  delay: `${(Math.random() * 5).toFixed(1)}s`,
  duration: `${(3 + Math.random() * 5).toFixed(1)}s`,
}));

const heroParticles = makeParticles(14);
const menuParticles = makeParticles(18);

const makeFooterFireflies = (count: number) => Array.from({ length: count }, (_, i) => {
  const driftX = (Math.random() - 0.5) * 50;
  const driftY = -(15 + Math.random() * 55);
  const warm = Math.random() > 0.45;
  return {
    id: i,
    left: `${(Math.random() * 100).toFixed(1)}%`,
    top: `${(Math.random() * 100).toFixed(1)}%`,
    size: 2 + Math.round(Math.random() * 3),
    opacity: (0.25 + Math.random() * 0.45).toFixed(2),
    blur: Math.random() > 0.6 ? 0.5 : 1,
    dx: `${driftX.toFixed(0)}px`,
    dy: `${driftY.toFixed(0)}px`,
    glow: warm ? 'rgba(255, 248, 220, 0.5)' : 'rgba(255, 255, 255, 0.4)',
    delay: `${(Math.random() * 10).toFixed(1)}s`,
    duration: `${(6 + Math.random() * 14).toFixed(1)}s`,
  };
});
const footerOrbs = makeFooterFireflies(30);

const marqueeItems = [
  'DEEP MASSAGE', '✦', 'AROMA MASSAGE', '✦', 'THAI MASSAGE', '✦', 'SWEDISH MASSAGE', '✦',
  'FOOT MASSAGE', '✦', 'BODY SCRUB', '✦', 'RELAXATION', '✦', 'WELLNESS', '✦', 'SPA THERAPY', '✦',
];

const logoAsset = '/images/nora-spa-logo-white.png';

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const serviceSlugs = services.map((s) => slugify(s.title));

function Logo() {
  return <div className="brand-mark"><img src={logoAsset} alt="" aria-hidden="true" /><span>NORA <b>SPA</b></span></div>;
}

function LogoWatermark({ className = '' }: { className?: string }) {
  return <img className={`section-watermark ${className}`} src={logoAsset} alt="" aria-hidden="true" />;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const serviceGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const sectionIdMap: Record<string, string> = useMemo(() => ({
    'HOME': 'home',
    'ABOUT US': 'about-us',
    'SERVICES': 'services',
    'GALLERY': 'gallery',
    'REVIEWS': 'reviews',
    'CONTACT': 'contact',
  }), []);

  const navigateToSection = useCallback((id: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 320);
  }, []);

  useEffect(() => {
    const grid = serviceGridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.service-card'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          const index = cards.indexOf(card);
          setTimeout(() => card.classList.add('in-view'), index * 90);
          observer.unobserve(card);
          void i;
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <div className="topbar"><div><MapPin size={14} /> <a href="https://www.google.com/maps/place/Nora+Spa+Banani/@23.7931628,90.4010338,17z/data=!4m14!1m7!3m6!1s0x3755c72fff512205:0x1aa93951117c3e1e!2sNora+Spa+Banani!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4!3m5!1s0x3755c72fff512205:0x1aa93951117c3e1e!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4?entry=ttu" target="_blank" rel="noopener noreferrer">41 Road No. 17, Dhaka 1213</a> <span className="top-divider" /> <CalendarDays size={14} /> Open Daily: 10:00 AM - 10:00 PM</div><div className="social-mini"><Facebook size={13} /><Instagram size={13} /><a href="https://wa.me/8801353786450" target="_blank" rel="noopener noreferrer"><span className="tiktok">♪</span></a></div></div>
      <header className="header"><Logo /><nav>{menuItems.map((item) => <a key={item} className={item === 'HOME' ? 'active' : ''} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}{item === 'SERVICES' && <ChevronDown size={14} />}</a>)}</nav><button className="primary-btn header-btn">BOOK NOW <ArrowRight size={16} /></button><div className="mobile-actions"><button className="menu-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}><span /><span /><span /></button></div></header>

      {mobileOpen && <div className="mobile-panel"><div className="mobile-particles" aria-hidden="true">{menuParticles.map((p) => <span key={p.id} className="mobile-particle" style={{ left: p.left, top: p.top, width: `${p.size}px`, height: `${p.size}px`, animationDelay: p.delay, animationDuration: p.duration }} />)}</div><div className="mobile-panel-head"><Logo /><button className="icon-btn" onClick={() => setMobileOpen(false)}><X size={18} strokeWidth={1.25} /></button></div><div className="mobile-links">{menuItems.map((item) => <div key={item} className="mobile-link" onClick={() => { if (item === 'SERVICES') setServicesOpen(!servicesOpen); else navigateToSection(sectionIdMap[item]); }}><span>{item}</span>{item === 'SERVICES' ? <ChevronDown className={servicesOpen ? 'rotate' : ''} size={16} strokeWidth={1} /> : <ChevronRight size={16} strokeWidth={1} />}{item === 'SERVICES' && servicesOpen && <div className="mobile-submenu">{services.map((service, i) => <span key={service.title} onClick={(e) => { e.stopPropagation(); navigateToSection(serviceSlugs[i]); }}>{service.title}</span>)}</div>}</div>)}</div><div className="mobile-pamper"><Flower2 size={28} strokeWidth={1} /><div><h3>Pamper Yourself</h3><p>You Deserve It</p></div></div></div>}

      <main>
        <section className="hero" id="home"><div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} /><LogoWatermark className="hero-watermark" /><div className="hero-particles" aria-hidden="true">{heroParticles.map((p) => <span key={p.id} className="hero-particle" style={{ left: p.left, top: p.top, width: `${p.size}px`, height: `${p.size}px`, animationDelay: p.delay, animationDuration: p.duration }} />)}</div><div className="hero-copy"><p className="eyebrow">RELAX. REJUVENATE. RENEW</p><h1>Experience True <em>Relaxation</em></h1><div className="ornament"><span /> <Flower2 size={18} /> <span /></div><p className="hero-text">Discover a refined spa experience designed to relax your body, refresh your mind and restore your sense of well-being.</p><div className="hero-actions"><a className="primary-btn" href="#contact">BOOK AN APPOINTMENT <ArrowRight size={17} /></a><a className="outline-btn" href="https://wa.me/8801353786450" target="__blank" rel="noopener noreferrer"><MessageCircle size={17} /> WHATSAPP US</a></div></div></section>
        <div className="marquee" aria-hidden="true"><div className="marquee-track">{marqueeItems.map((item, i) => <span key={i}>{item}</span>)}</div><div className="marquee-track">{marqueeItems.map((item, i) => <span key={`b-${i}`}>{item}</span>)}</div></div>
        <section className="benefits">{benefits.map(({ icon: Icon, title, text }) => <div className="benefit" key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></div>)}</section>
        <section className="section services-section" id="services"><LogoWatermark className="services-watermark" /><div className="section-heading"><p className="eyebrow">OUR POPULAR SERVICES</p><h2>Personalized care for <em>complete relaxation.</em></h2><p>Thoughtfully designed treatments to relax your body, refresh your mind and renew your spirit.</p></div><div className="service-grid" ref={serviceGridRef}>{services.map((service, i) => <article className="service-card" id={serviceSlugs[i]} key={service.title}><div className="service-card-image"><img src={service.image} alt={service.title} loading="lazy" /><div className="service-card-overlay" /></div><div className="service-card-body"><h3>{service.title}</h3><p>{service.text}</p><div className="service-pricing">{service.prices.map((tier) => <div className="price-row" key={tier.duration}><span className="price-duration"><Clock size={13} /> {tier.duration}</span><span className="price-amount">{tier.price}</span></div>)}</div><a className="service-book-btn" href="#contact">BOOK NOW <ArrowRight size={14} /></a></div></article>)}</div></section>
        <section className="about section" id="about-us"><LogoWatermark className="about-watermark" /><div className="about-image"><img src={images.interior} alt="Nora Spa peaceful treatment room" loading="lazy" /><div className="image-badge"><Flower2 /><span>Wellness<br /><b>begins here</b></span></div></div><div className="about-copy"><p className="eyebrow">ABOUT NORA SPA</p><h2>A space designed for <em>your well-being.</em></h2><p>At NORA SPA, every detail is created to help you slow down, breathe deeply and feel restored. From our calming rooms to our thoughtful therapies, we bring a premium spa experience to customers seeking relaxation in Banani, Gulshan and across Dhaka.</p><p>Our professional team, hygienic spaces and personalized treatments make every visit feel like time set aside just for you.</p><button className="outline-btn">DISCOVER OUR STORY <ArrowRight size={16} /></button></div></section>
        <section className="experience section"><div className="experience-copy"><p className="eyebrow">THE NORA EXPERIENCE</p><h2>Come in tired.<br /><em>Leave renewed.</em></h2><p>A calm, considered approach to wellness, with everything you need to make space for yourself.</p><div className="experience-list"><span><ShieldCheck /> Peaceful environment</span><span><Sparkles /> Premium-quality products</span><span><UserRound /> Professional therapists</span><span><Leaf /> Personalized treatments</span></div></div><img src={images.candle} alt="Spa candle and fresh towels" loading="lazy" /></section>

        <section className="gallery section" id="gallery"><div className="section-heading"><p className="eyebrow">A GLIMPSE OF CALM</p><h2>Inside <em>NORA SPA.</em></h2></div><div className="gallery-grid">{galleryImages.map((image) => <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />)}</div></section>
        <section className="reviews section" id="reviews"><div className="section-heading"><p className="eyebrow">CLIENT LOVE</p><h2>What our <em>clients say.</em></h2><p>Sample experiences shown for layout preview. Replace with verified customer reviews before publishing.</p></div><div className="review-grid">{['An unforgettable experience. Calm, thoughtful and exactly what I needed after a long week.','The aromatherapy massage was heavenly. I left feeling refreshed and completely restored.','Beautifully clean, professional and peaceful. I will definitely visit again.'].map((text, index) => <article className="review-card" key={text}><div className="review-top"><div className="avatar">{['F', 'J', 'N'][index]}</div><div><h3>{['Farhana Islam', 'Jannatul Ferdaus', 'Nusrat Jahan'][index]}</h3><div className="stars">★★★★★</div></div><span className="quote">”</span></div><p>{text}</p><small>Sample review · Replace with verified date</small></article>)}</div></section>
        <section className="location section" id="contact"><div><p className="eyebrow">FIND YOUR WAY TO CALM</p><h2>Your premium spa experience <em>in Dhaka.</em></h2><p>Serving guests looking for a premium spa and wellness experience around Banani and Gulshan.</p><div className="contact-lines"><a className="contact-line-link" href="https://www.google.com/maps/place/Nora+Spa+Banani/@23.7931628,90.4010338,17z/data=!4m14!1m7!3m6!1s0x3755c72fff512205:0x1aa93951117c3e1e!2sNora+Spa+Banani!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4!3m5!1s0x3755c72fff512205:0x1aa93951117c3e1e!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4?entry=ttu" target="_blank" rel="noopener noreferrer"><MapPin /> 41 Road No. 17, Dhaka 1213</a><span><CalendarDays /> Open daily · 10:00 AM - 10:00 PM</span><a className="contact-line-link" href="tel:+8801353786450"><Phone /> 01353-786450</a></div><div className="contact-cta-row"><a className="primary-btn" href="https://www.google.com/maps/place/Nora+Spa+Banani/@23.7931628,90.4010338,17z/data=!4m14!1m7!3m6!1s0x3755c72fff512205:0x1aa93951117c3e1e!2sNora+Spa+Banani!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4!3m5!1s0x3755c72fff512205:0x1aa93951117c3e1e!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4?entry=ttu" target="_blank" rel="noopener noreferrer">GET DIRECTIONS <ArrowRight size={16} /></a><a className="outline-btn" href="https://wa.me/8801353786450" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> WHATSAPP US</a></div></div><a className="map-placeholder" href="https://www.google.com/maps/place/Nora+Spa+Banani/@23.7931628,90.4010338,17z/data=!4m14!1m7!3m6!1s0x3755c72fff512205:0x1aa93951117c3e1e!2sNora+Spa+Banani!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4!3m5!1s0x3755c72fff512205:0x1aa93951117c3e1e!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4?entry=ttu" target="_blank" rel="noopener noreferrer"><MapPin size={32} /><span>Google Maps integration placeholder</span><small>Banani · Gulshan · Dhaka</small></a></section>
        <section className="final-cta"><LogoWatermark className="cta-watermark" /><div><p className="eyebrow">YOUR TIME, YOUR RITUAL</p><h2>Ready to <em>relax?</em></h2><p>Reserve your spa experience and give yourself the relaxation you deserve.</p></div><div className="hero-actions"><a className="primary-btn" href="tel:+8801353786450">BOOK AN APPOINTMENT <ArrowRight size={17} /></a><a className="outline-btn" href="https://wa.me/8801353786450" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> WHATSAPP US</a></div></section>
      </main>
      <footer><div className="footer-glow" aria-hidden="true" /><div className="footer-fireflies" aria-hidden="true">{footerOrbs.map((p) => <span key={p.id} className="footer-firefly" style={{ left: p.left, top: p.top, width: `${p.size}px`, height: `${p.size}px`, '--ff-opacity': p.opacity, '--ff-blur': `${p.blur}px`, '--ff-dx': p.dx, '--ff-dy': p.dy, '--ff-glow': p.glow, animationDelay: p.delay, animationDuration: p.duration } as React.CSSProperties} />)}</div><div className="footer-main"><div className="footer-brand-col"><Logo /><p className="footer-note">A refined space for relaxation,<br />wellness and beautiful moments.</p></div><div className="footer-cols"><div><h4>Explore</h4><a href="#about-us">About Us</a><a href="#services">Services</a><a href="#gallery">Gallery</a></div><div><h4>Services</h4><span>Dry Massage</span><span>Thai Traditional Massage</span><span>Aroma Oil Massage</span><span>Back & Shoulder Massage</span><span>Full Body Massage</span><span>Body to Body Massage</span><span>Four Hand Massage</span></div><div><h4>Contact</h4><a href="https://www.google.com/maps/place/Nora+Spa+Banani/@23.7931628,90.4010338,17z/data=!4m14!1m7!3m6!1s0x3755c72fff512205:0x1aa93951117c3e1e!2sNora+Spa+Banani!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4!3m5!1s0x3755c72fff512205:0x1aa93951117c3e1e!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4?entry=ttu" target="_blank" rel="noopener noreferrer">41 Road No. 17, Dhaka 1213</a><a href="tel:+8801353786450">01353-786450</a><a href="https://wa.me/8801353786450" target="_blank" rel="noopener noreferrer">WhatsApp</a></div></div></div><div className="footer-bottom"><span>© NORA SPA. All Rights Reserved.</span><div className="footer-social"><a href="#" aria-label="Facebook"><Facebook /></a><a href="#" aria-label="Instagram"><Instagram /></a><a href="https://wa.me/8801353786450" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><span className="tiktok">♪</span></a></div></div></footer>
      <div className="sticky-bar"><a href="#contact"><CalendarDays /><span>BOOK NOW</span></a><a href="https://wa.me/8801353786450" target="_blank" rel="noopener noreferrer"><MessageCircle /><span>WHATSAPP</span></a><a href="tel:+8801353786450"><Phone /><span>CALL US</span></a><a href="https://www.google.com/maps/place/Nora+Spa+Banani/@23.7931628,90.4010338,17z/data=!4m14!1m7!3m6!1s0x3755c72fff512205:0x1aa93951117c3e1e!2sNora+Spa+Banani!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4!3m5!1s0x3755c72fff512205:0x1aa93951117c3e1e!8m2!3d23.7931628!4d90.4036087!16s%2Fg%2F11zf75b6k4?entry=ttu" target="_blank" rel="noopener noreferrer"><MapPin /><span>DIRECTIONS</span></a></div>
    </div>
  );
}

export default App;
