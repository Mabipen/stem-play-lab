'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiDelete } from '@/lib/api';
import type { Service } from '@/lib/types';
import Button from '@/components/Button';
import ServiceForm from './ServiceForm';
import styles from '@/components/dashboard/DashboardUI.module.css';

export default function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSaved = () => {
    setShowAddForm(false);
    setEditingService(null);
    router.refresh();
  };

  const handleDelete = async (service: Service) => {
    if (!confirm(`Delete "${service.title}"?`)) return;
    setDeletingId(service.id);
    try {
      await apiDelete(`/api/admin/services/${service.id}`);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {initialServices.length === 0 && !showAddForm && (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>🧪</span>
          <p>No services yet.</p>
        </div>
      )}

      {initialServices.length > 0 && (
        <table className={styles.table} style={{ marginBottom: 'var(--space-6)' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Ages</th>
              <th>Active</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {initialServices.map((service) =>
              editingService?.id === service.id ? (
                <tr key={service.id}>
                  <td colSpan={6}>
                    <ServiceForm service={service} onSaved={handleSaved} onCancel={() => setEditingService(null)} />
                  </td>
                </tr>
              ) : (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td style={{ textTransform: 'capitalize' }}>{service.type}</td>
                  <td>£{Number(service.base_price).toFixed(2)}</td>
                  <td>{service.min_age}–{service.max_age}</td>
                  <td>{service.is_active ? 'Yes' : 'No'}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {service.type !== 'subscription' && (
                      <>
                        <Link href={`/admin/services/${service.id}`}>Sessions</Link>
                        {' · '}
                      </>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => setEditingService(service)}>Edit</Button>
                    {' '}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(service)}
                      disabled={deletingId === service.id}
                    >
                      {deletingId === service.id ? 'Deleting…' : 'Delete'}
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {showAddForm ? (
        <ServiceForm onSaved={handleSaved} onCancel={() => setShowAddForm(false)} />
      ) : (
        <Button onClick={() => setShowAddForm(true)}>Add Service</Button>
      )}
    </div>
  );
}
