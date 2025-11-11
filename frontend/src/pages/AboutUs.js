import React from 'react';
import '../styles/AboutUs.css'; 


export default function AboutUs() {
    return(
        <div className="about-us-container">
      <header className="about-us-header">
        <h1>About MaJiX </h1>
        <p className="subtitle">Find clothes that matches your style</p>
      </header>
      
      <section className="story-section">
        <h2>Our Story</h2>
        <div className="story-content">
          <p>
            <b>MaJiX</b> was born from a simple yet powerful idea, that clothing should be an authentic extension of the wearer. Tired of fast fashion and generic styles, Majix set out to create a collection of <i>meticulously crafted garments</i> designed to bring out your individuality and cater to your unique sense of style. MaJIX believe in quality over quantity, and timelessness over trends.
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

      <section className="values-section">
        <h2>Our Core Values</h2>
        <ul>
          <li><b>Mindfulness in Material:</b> Commitment to sustainable sourcing and ethical production. We are mindful of our environmental impact and the quality/longevity of the materials we use.</li>
          <li><b>Authentic Expression:</b> Encouraging self-expression and individuality through our designs. Our apparel helps customers feel confident and true to themselves.</li>
          <li><b>Joyful Craftsmanship:</b> Taking pride and care in every stitch and design decision. We ensure high-quality construction and deliver products that bring joy to both the maker and the wearer.</li>
          <li><b>Inclusive Design:</b> Creating clothing that is accessible, comfortable, and flattering for a diverse range of body types and backgrounds. Fashion is for everyone.</li>
          <li><b>eXperience-Driven Service:</b> Focusing on a seamless, memorable, and personalized customer journey. From browsing to post-purchase support, we aim to exceed expectations.</li>
        </ul>
      </section>
      
      <section className="cta-section">
        <p>Ready to discover your style?</p>
        <a href="/shop" className="cta-button">Shop Our Collections Now</a>
      </section>
    </div>
  );
}