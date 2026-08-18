'use client';

import { useState, type FormEvent } from 'react';
import { apiPost, apiPut, ApiError } from '@/lib/api';
import type { Product } from '@/lib/types';
import Button from '@/components/Button';
import formStyles from '@/components/auth/AuthForm.module.css';

interface ProductFormProps {
  product?: Product;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSaved, onCancel }: ProductFormProps) {
  const [title, setTitle] = useState(product?.title ?? '');
  const [sku, setSku] = useState(product?.sku ?? '');
  const [price, setPrice] = useState(product?.price ?? '');
  const [stockQuantity, setStockQuantity] = useState(String(product?.stock_quantity ?? 0));
  const [category, setCategory] = useState(product?.category ?? '');
  const [minAge, setMinAge] = useState(product?.min_age != null ? String(product.min_age) : '');
  const [maxAge, setMaxAge] = useState(product?.max_age != null ? String(product.max_age) : '');
  const [imageUrl, setImageUrl] = useState(product?.images?.[0] ?? '');
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [error, setError] = useState<ApiError | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      title,
      sku,
      price: Number(price),
      stock_quantity: Number(stockQuantity),
      category: category || null,
      min_age: minAge ? Number(minAge) : null,
      max_age: maxAge ? Number(maxAge) : null,
      images: imageUrl ? [imageUrl] : [],
      is_featured: isFeatured,
    };

    try {
      if (product) {
        await apiPut(`/api/admin/products/${product.id}`, payload);
      } else {
        await apiPost('/api/admin/products', payload);
      }
      onSaved();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        throw err;
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ background: 'var(--color-cream)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
      {error && !error.errors && <p className={formStyles.formError}>{error.message}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="title">Title</label>
          <input id="title" className={formStyles.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
          {error?.fieldError('title') && <p className={formStyles.fieldError}>{error.fieldError('title')}</p>}
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="sku">SKU</label>
          <input id="sku" className={formStyles.input} value={sku} onChange={(e) => setSku(e.target.value)} required />
          {error?.fieldError('sku') && <p className={formStyles.fieldError}>{error.fieldError('sku')}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="price">Price (£)</label>
          <input id="price" type="number" step="0.01" min="0" className={formStyles.input} value={price} onChange={(e) => setPrice(e.target.value)} required />
          {error?.fieldError('price') && <p className={formStyles.fieldError}>{error.fieldError('price')}</p>}
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="stock_quantity">Stock quantity</label>
          <input id="stock_quantity" type="number" min="0" className={formStyles.input} value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
          {error?.fieldError('stock_quantity') && <p className={formStyles.fieldError}>{error.fieldError('stock_quantity')}</p>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="category">Category</label>
          <input id="category" className={formStyles.input} value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="min_age">Min age</label>
          <input id="min_age" type="number" min="0" className={formStyles.input} value={minAge} onChange={(e) => setMinAge(e.target.value)} />
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="max_age">Max age</label>
          <input id="max_age" type="number" min="0" className={formStyles.input} value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
        </div>
      </div>

      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="image_url">Image URL</label>
        <input id="image_url" className={formStyles.input} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
        Featured product
      </label>

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : product ? 'Save Changes' : 'Add Product'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
