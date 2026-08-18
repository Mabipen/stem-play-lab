'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate an async form submission
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Get in touch</p>
          <h1 className={styles.heroTitle}>We&apos;d love to hear from you</h1>
          <p className={styles.heroSub}>
            Questions about sessions, birthday parties, holiday camps, or just want to say hello?
            Drop us a message and we&apos;ll get back to you within one working day.
          </p>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-cream)" /></svg>
        </div>
      </div>

      <div className={styles.content}>
        <div className={`${styles.grid} container`}>
          {/* Contact Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send us a message</h2>
            {submitted ? (
              <div className={styles.success}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#10b981"/><path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Thanks! We&apos;ll be in touch within one working day.
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">First name *</label>
                    <input id="firstName" className={styles.input} type="text" placeholder="e.g. Sarah" required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lastName">Last name *</label>
                    <input id="lastName" className={styles.input} type="text" placeholder="e.g. Williams" required />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email address *</label>
                  <input id="email" className={styles.input} type="email" placeholder="your@email.com" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">Phone number</label>
                  <input id="phone" className={styles.input} type="tel" placeholder="07700 000000" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="enquiry">What is your enquiry about?</label>
                  <select id="enquiry" className={styles.select}>
                    <option value="">Select a topic</option>
                    <option value="weekly-classes">Weekly Classes</option>
                    <option value="holiday-camps">Holiday Camps</option>
                    <option value="birthday-party">Birthday Party</option>
                    <option value="school-visit">School Visit</option>
                    <option value="other">Something else</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">Message *</label>
                  <textarea id="message" className={styles.textarea} placeholder="Tell us about your child's age, interests, or any questions you have…" required />
                </div>
                <Button type="submit" fullWidth loading={loading}>
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Info Panel */}
          <div className={styles.infoPanel}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Visit us</h2>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="STEM Play Lab building entrance" className={styles.mapImg} />
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span><strong>Address:</strong> 42 Experiment Street, Manchester, M14 5TQ</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span><strong>Tram:</strong> 5 mins from Fallowfield stop</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span><strong>Parking:</strong> Free at weekends on-site</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Contact details</h2>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span><strong>Phone:</strong> <a href="tel:01612345678">0161 234 5678</a></span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span><strong>Email:</strong> <a href="mailto:hello@stemplaylab.co.uk">hello@stemplaylab.co.uk</a></span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span><strong>Opening hours:</strong> Mon–Fri 9am–6pm, Sat 9am–4pm</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Quick links</h2>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span>Want to book straight away? <a href="/book">Book a free trial →</a></span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span>Planning a birthday? <a href="/services?type=party">See party packages →</a></span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.dot} />
                <span>School enquiries: <a href="mailto:schools@stemplaylab.co.uk">schools@stemplaylab.co.uk</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
