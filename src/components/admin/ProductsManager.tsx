'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiDelete } from '@/lib/api';
import type { Product } from '@/lib/types';
import Button from '@/components/Button';
import ProductForm from './ProductForm';
import styles from '@/components/dashboard/DashboardUI.module.css';

export default function ProductsManager({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSaved = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    router.refresh();
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.title}"?`)) return;
    setDeletingId(product.id);
    try {
      await apiDelete(`/api/admin/products/${product.id}`);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {initialProducts.length === 0 && !showAddForm && (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>🧸</span>
          <p>No products yet.</p>
        </div>
      )}

      {initialProducts.length > 0 && (
        <table className={styles.table} style={{ marginBottom: 'var(--space-6)' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {initialProducts.map((product) =>
              editingProduct?.id === product.id ? (
                <tr key={product.id}>
                  <td colSpan={6}>
                    <ProductForm product={product} onSaved={handleSaved} onCancel={() => setEditingProduct(null)} />
                  </td>
                </tr>
              ) : (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.sku}</td>
                  <td>{product.category ?? '—'}</td>
                  <td>£{Number(product.price).toFixed(2)}</td>
                  <td>{product.stock_quantity}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Button size="sm" variant="ghost" onClick={() => setEditingProduct(product)}>Edit</Button>
                    {' '}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? 'Deleting…' : 'Delete'}
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {showAddForm ? (
        <ProductForm onSaved={handleSaved} onCancel={() => setShowAddForm(false)} />
      ) : (
        <Button onClick={() => setShowAddForm(true)}>Add Product</Button>
      )}
    </div>
  );
}
