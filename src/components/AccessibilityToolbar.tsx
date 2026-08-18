'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './AccessibilityToolbar.module.css';

type FontSize = 'base' | 'lg' | 'xl';

export default function AccessibilityToolbar() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [open, setOpen] = useState(false);

  const applyPreferences = useCallback((hc: boolean, fs: FontSize, rm: boolean) => {
    const html = document.documentElement;
    html.classList.toggle('high-contrast', hc);
    html.classList.remove('font-size-lg', 'font-size-xl');
    if (fs !== 'base') html.classList.add(`font-size-${fs}`);
    html.classList.toggle('reduce-motion', rm);
  }, []);

  useEffect(() => {
    const stored = {
      hc: localStorage.getItem('spl-hc') === 'true',
      fs: (localStorage.getItem('spl-fs') as FontSize) || 'base',
      rm: localStorage.getItem('spl-rm') === 'true',
    };
    setHighContrast(stored.hc);
    setFontSize(stored.fs);
    setReduceMotion(stored.rm);
    applyPreferences(stored.hc, stored.fs, stored.rm);
  }, [applyPreferences]);

  const toggle = (key: 'hc' | 'rm') => {
    let hc = highContrast, rm = reduceMotion;
    if (key === 'hc') { hc = !hc; setHighContrast(hc); localStorage.setItem('spl-hc', String(hc)); }
    if (key === 'rm') { rm = !rm; setReduceMotion(rm); localStorage.setItem('spl-rm', String(rm)); }
    applyPreferences(hc, fontSize, rm);
  };

  const cycleFont = () => {
    const next: FontSize = fontSize === 'base' ? 'lg' : fontSize === 'lg' ? 'xl' : 'base';
    setFontSize(next);
    localStorage.setItem('spl-fs', next);
    applyPreferences(highContrast, next, reduceMotion);
  };

  const fontLabel = fontSize === 'base' ? 'A' : fontSize === 'lg' ? 'A+' : 'A++';

  return (
    <div className={styles.wrapper} role="region" aria-label="Accessibility options">
      <button
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        title="Accessibility options"
      >
        ♿
      </button>

      <div id="a11y-panel" className={`${styles.panel} ${open ? styles.panelOpen : ''}`} role="group">
        <button
          className={`${styles.btn} ${highContrast ? styles.active : ''}`}
          onClick={() => toggle('hc')}
          title="Toggle high contrast"
          aria-pressed={highContrast}
        >
          ◑
        </button>

        <button
          className={styles.btn}
          onClick={cycleFont}
          title={`Font size: ${fontLabel}`}
          aria-label={`Font size: ${fontLabel}. Click to increase.`}
        >
          {fontLabel}
        </button>

        <button
          className={`${styles.btn} ${reduceMotion ? styles.active : ''}`}
          onClick={() => toggle('rm')}
          title="Reduce motion"
          aria-pressed={reduceMotion}
        >
          ⏸
        </button>
      </div>
    </div>
  );
}
