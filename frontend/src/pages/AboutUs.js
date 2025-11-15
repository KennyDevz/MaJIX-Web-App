import React from 'react';
import '../styles/AboutUs.css'; 
import { useEffect } from 'react';

export default function AboutUs() {

    useEffect(() => { //scrolls to the top of component
          window.scrollTo(0, 0);
    }, []);

    return(
        <div className="about-us-container">
      <header className="about-us-header" style={{
          backgroundImage: `linear-gradient(rgba(0, 13, 42, 0.74), rgba(0, 13, 42, 0.74)), url('https://highxtar.com/wp-content/uploads/2022/10/thumb-esta-el-streetwear-pasado-de-moda.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '30vh',
          width: '100%',
        }}>
        <div classname="about-us-header-background"   >
          
        <h1>About MaJIX </h1>
        <p className="subtitle">Find clothes that matches your style</p>
        </div>
        
      </header>
      
      <section className="story-section">
        <h2>Our Story</h2>
        <div className="story-content">
          <p>
            <b>MaJIX</b> was born from a simple yet powerful idea, that clothing should be an authentic extension of the wearer. Tired of fast fashion and generic styles, Majix set out to create a collection of <i>meticulously crafted garments</i> designed to bring out your individuality and cater to your unique sense of style. MaJIX believe in quality over quantity, and timelessness over trends.
          </p>
          <p>
            Since our launch, we've focused on building a community that values <i>self-expression</i> and sustainable practices. Every piece MaJIX offer is a testament to our commitment to ethical sourcing and enduring design.
          </p>
        </div>
      </section>
      
      <hr className="divider" />
      
      <section className="mission-section">
        <h2>Our Mission</h2>
        <div className="mission-points">
          <div className="mission-card">
            <h3>Quality & Craftsmanship</h3>
            <p>To provide high-quality apparel that is durable, comfortable, and made with exceptional attention to detail.</p>
          </div>
          <div className="mission-card">
            <h3>Style & Individuality</h3>
            <p>To offer diverse ranges of clothing that empower our customers to find and express their unique personal style.</p>
          </div>
          <div className="mission-card">
            <h3>Sustainability</h3>
            <p>To commit to responsible sourcing, minimizing waste, and utilizing eco-friendly materials whenever possible.</p>
          </div>
        </div>
      </section>

      <hr className="divider" />
      
      <section className="cta-section">
        <p>Ready to discover your style?</p>
        <a href="/shop" className="cta-button">Shop Our Collections Now</a>
      </section>
    </div>
  );
}