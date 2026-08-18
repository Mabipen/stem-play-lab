'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { apiGet, apiPost, ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Product, Service, CheckoutResponse } from '@/lib/types';
import styles from './page.module.css';

const CATEGORIES = ['All', 'Science', 'Robotics', 'Coding', 'Engineering', 'Creative Build'];
const AGE_FILTERS = ['All ages', '3–5', '5–9', '9–14'];

type CartItem = { product: Product; qty: number };

export default function ShopPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [subscriptions, setSubscriptions] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [category, setCategory] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All ages');
  const [sort, setSort] = useState('popular');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  const [subscribingId, setSubscribingId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));

    Promise.all([
      apiGet<Product[]>('/api/products'),
      apiGet<Service[]>('/api/services?type=subscription'),
    ])
      .then(([productData, serviceData]) => {
        setProducts(productData);
        setSubscriptions(serviceData);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, mounted]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === p.id);
      if (ex) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));
  const cartTotal = cart.reduce((sum, i) => sum + Number(i.product.price) * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => search === '' || p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc') return Number(a.price) - Number(b.price);
      if (sort === 'price-desc') return Number(b.price) - Number(a.price);
      return b.review_count - a.review_count;
    });

  const handleSubscribe = async (service: Service) => {
    if (!user) {
      router.push('/login?next=/shop');
      return;
    }
    setSubscribingId(service.id);
    try {
      const { checkout_url } = await apiPost<CheckoutResponse>('/api/subscriptions/checkout', { service_id: service.id });
      window.location.href = checkout_url;
    } catch (err) {
      setSubscribingId(null);
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        throw err;
      }
    }
  };

  return (
    <div className={styles.page}>
      {/* Page hero */}
      <div className={styles.pageHero}>
        <div className="container">
          <p className="eyebrow">Smart Toy Store</p>
          <h1 className={styles.heroTitle}>STEM learning, delivered to your door</h1>
          <p className={styles.heroSub}>Educator-approved kits and toys for children aged 3–14. Free delivery over £50.</p>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--color-cream)" /></svg>
        </div>
      </div>

      <div className={`${styles.layout} container`}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Category</h3>
            {CATEGORIES.map(c => (
              <button key={c} className={`${styles.sideBtn} ${category === c ? styles.sideBtnActive : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Age Range</h3>
            {AGE_FILTERS.map(a => (
              <button key={a} className={`${styles.sideBtn} ${ageFilter === a ? styles.sideBtnActive : ''}`} onClick={() => setAgeFilter(a)}>{a}</button>
            ))}
          </div>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Price Range</h3>
            <input type="range" min="0" max="50" className={styles.rangeInput} />
            <p className={styles.rangeLabel}>Up to £50</p>
          </div>

          {/* Subscription box teaser */}
          <div className={styles.subTeaser}>
            <div className={styles.subTeaserBadge}>📦 Subscribe & Save</div>
            <h4>Monthly STEM Boxes from £19.99</h4>
            <p>Delivered monthly. Cancel anytime.</p>
            <a href="#subscriptions" className={styles.subLink}>See plans →</a>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="search"
                placeholder="Search products..."
                className={styles.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.resultCount}>{filtered.length} products</span>
              <select className={styles.sortSelect} value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort by">
                <option value="popular">Most popular</option>
                <option value="price-asc">Price: low–high</option>
                <option value="price-desc">Price: high–low</option>
              </select>
            </div>
          </div>

          {loading && <div className={styles.empty}><p>Loading products…</p></div>}
          {!loading && loadError && <div className={styles.empty}><p>Couldn&apos;t load products right now. Please try again shortly.</p></div>}

          {/* Product grid */}
          {!loading && !loadError && (
            <div className={styles.grid}>
              {filtered.map(p => {
                const stockStatus = p.stock_quantity === 0 ? 'out' : p.stock_quantity <= 3 ? 'low' : 'in';
                const inCart = cart.some(i => i.product.id === p.id);
                const image = p.images?.[0];
                return (
                  <article key={p.id} className={styles.card}>
                    {p.is_featured && <div className={styles.featuredBadge}>⭐ Popular</div>}
                    <div className={styles.cardImgWrapper}>
                      {image && <img src={image} alt={p.title} className={styles.cardImg} />}
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardCat}>{p.category}</span>
                        <span className={`${styles.stockBadge} ${styles[`stock_${stockStatus}`]}`}>
                          {stockStatus === 'out' ? 'Out of stock' : stockStatus === 'low' ? 'Almost gone!' : 'In stock'}
                        </span>
                      </div>
                      <h3 className={styles.cardName}>{p.title}</h3>
                      {p.rating && (
                        <div className={styles.cardRating}>
                          {'★'.repeat(Math.floor(Number(p.rating)))} <span>{p.rating} ({p.review_count})</span>
                        </div>
                      )}
                      {(p.min_age != null && p.max_age != null) && <p className={styles.cardAge}>Ages {p.min_age}–{p.max_age}</p>}
                      <div className={styles.cardFoot}>
                        <span className={styles.cardPrice}>£{Number(p.price).toFixed(2)}</span>
                        <button
                          className={`${styles.addBtn} ${inCart ? styles.addBtnAdded : ''} ${stockStatus === 'out' ? styles.addBtnDisabled : ''}`}
                          onClick={() => stockStatus !== 'out' && addToCart(p)}
                          disabled={stockStatus === 'out'}
                          aria-label={`Add ${p.title} to cart`}
                        >
                          {inCart ? '✓ Added' : stockStatus === 'out' ? 'Sold out' : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading && !loadError && filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No products match your search. <button onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</button></p>
            </div>
          )}

          {/* Subscriptions section */}
          {!loading && !loadError && subscriptions.length > 0 && (
            <section id="subscriptions" className={styles.subSection}>
              <h2 className={styles.subTitle}>📦 Monthly STEM Box Subscriptions</h2>
              <p className={styles.subDesc}>Get a new box of STEM adventures delivered every month. Cancel anytime.</p>
              <div className={styles.subGrid}>
                {subscriptions.map((s, i) => (
                  <div key={s.id} className={`${styles.subCard} ${i === 1 ? styles.subCardPopular : ''}`}>
                    {i === 1 && <div className={styles.popularBadge}>Most Popular</div>}
                    <h3 className={styles.subName}>{s.title}</h3>
                    <p className={styles.subAge}>Ages {s.min_age}–{s.max_age}</p>
                    <p className={styles.subCardDesc}>{s.description}</p>
                    <div className={styles.subPrice}>£{Number(s.base_price).toFixed(2)}<span>/month</span></div>
                    <Button size="sm" onClick={() => handleSubscribe(s)} disabled={subscribingId === s.id}>
                      {subscribingId === s.id ? 'Redirecting…' : 'Subscribe Now'}
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Slide-over Cart */}
      <div className={`${styles.cartOverlay} ${cartOpen ? styles.cartOverlayOpen : ''}`} onClick={() => setCartOpen(false)} aria-hidden="true" />
      <aside className={`${styles.cart} ${cartOpen ? styles.cartOpen : ''}`} aria-label="Shopping cart" aria-modal="true">
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Your Cart ({cartCount})</h2>
          <button className={styles.cartClose} onClick={() => setCartOpen(false)} aria-label="Close cart">Close ✕</button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.cartEmpty}>
            <p>Your cart is empty</p>
            <p>Add some STEM toys to get started!</p>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map(item => (
                <div key={item.product.id} className={styles.cartItem}>
                  {item.product.images?.[0] && (
                    <img src={item.product.images[0]} alt={item.product.title} className={styles.cartItemImg} />
                  )}
                  <div className={styles.cartItemInfo}>
                    <p className={styles.cartItemName}>{item.product.title}</p>
                    <p className={styles.cartItemPrice}>£{Number(item.product.price).toFixed(2)} × {item.qty}</p>
                  </div>
                  <button className={styles.cartItemRemove} onClick={() => removeFromCart(item.product.id)} aria-label="Remove item">✕</button>
                </div>
              ))}
            </div>
            <div className={styles.cartFooter}>
              {cartTotal >= 50 && <div className={styles.freeDelivery}>✅ Free delivery included!</div>}
              {cartTotal < 50 && <p className={styles.deliveryNote}>Add £{(50 - cartTotal).toFixed(2)} more for free delivery</p>}
              <div className={styles.cartTotal}>
                <span>Total</span>
                <span>£{cartTotal.toFixed(2)}</span>
              </div>
              <Button href="/checkout" size="lg">Proceed to Checkout →</Button>
            </div>
          </>
        )}
      </aside>

      {/* Cart FAB */}
      {cartCount > 0 && !cartOpen && (
        <button className={styles.cartFab} onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}>
          🛒 <span className={styles.cartFabCount}>{cartCount}</span>
        </button>
      )}
    </div>
  );
}
