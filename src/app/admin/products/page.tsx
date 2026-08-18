import type { Metadata } from 'next';
import { serverApiGet } from '@/lib/serverApi';
import type { Product } from '@/lib/types';
import ProductsManager from '@/components/admin/ProductsManager';
import styles from '@/components/dashboard/DashboardUI.module.css';

export const metadata: Metadata = {
  title: 'Products — Admin',
  description: 'Manage Smart Toy Store products.',
};

export default async function AdminProductsPage() {
  const products = await serverApiGet<Product[]>('/api/admin/products');

  return (
    <div>
      <h1 className={styles.pageTitle}>Products</h1>
      <p className={styles.pageSubtitle}>Manage the Smart Toy Store catalog.</p>
      <ProductsManager initialProducts={products} />
    </div>
  );
}
