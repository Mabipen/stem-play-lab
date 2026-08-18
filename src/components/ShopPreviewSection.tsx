import Image from 'next/image';
import Button from './Button';
import styles from './ShopPreviewSection.module.css';

const PRODUCTS = [
  { id: 1, name: 'Junior Robot Builder Kit', price: 29.99, age: '5–9', tag: 'Robotics', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80', stock: 'in_stock' },
  { id: 2, name: 'Chemistry Lab Starter Set', price: 24.99, age: '7–12', tag: 'Science', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80', stock: 'in_stock' },
  { id: 3, name: 'Coding Cubes — Ages 4+', price: 19.99, age: '4–7', tag: 'Coding', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', stock: 'low_stock' },
  { id: 4, name: 'Little Engineers Build Box', price: 34.99, age: '6–11', tag: 'Build', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80', stock: 'in_stock' },
];

const stockLabel = (s: string) =>
  s === 'low_stock' ? { text: 'Only a few left!', cls: 'low' } : { text: 'In stock', cls: 'in' };

export default function ShopPreviewSection() {
  return (
    <section className={styles.section} aria-label="Smart toy store preview">
      <div className={`${styles.inner} container`}>
        <div className={styles.header}>
          <div>
            <p className="eyebrow">Smart Toy Store</p>
            <h2 className={styles.title}>STEM learning at home too</h2>
            <p className={styles.subtitle}>
              Curated kits and toys that extend the lab experience into your living room.
              Age-filtered, educator-approved, and posted to your door.
            </p>
          </div>
          <div className={styles.headerImg}>
            <div className={styles.headerImgWrapper}>
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
                alt="STEM toy products"
                className={styles.shopImg}
              />
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map(p => {
            const { text, cls } = stockLabel(p.stock);
            return (
              <article key={p.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.productImgWrapper}>
                    <img src={p.image} alt={p.name} className={styles.productImg} />
                  </div>
                  <div className={`${styles.stockBadge} ${styles[`stock_${cls}`]}`}>{text}</div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.subjectTag}>{p.tag}</div>
                  <h3 className={styles.productName}>{p.name}</h3>
                  <div className={styles.meta}>
                    <span className={styles.ageTag}>Ages {p.age}</span>
                    <span className={styles.price}>£{p.price.toFixed(2)}</span>
                  </div>
                  <Button href="/shop" size="sm" variant="secondary">View in Store</Button>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.cta}>
          <Button href="/shop" size="lg">Browse All Products</Button>
          <p className={styles.ctaNote}>Free delivery on orders over £50 · 30-day returns</p>
        </div>
      </div>
    </section>
  );
}
