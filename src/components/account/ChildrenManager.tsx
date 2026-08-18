'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiDelete } from '@/lib/api';
import type { Child } from '@/lib/types';
import Button from '@/components/Button';
import ChildForm from './ChildForm';
import styles from '@/components/dashboard/DashboardUI.module.css';

function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

export default function ChildrenManager({ initialChildren }: { initialChildren: Child[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSaved = () => {
    setShowAddForm(false);
    setEditingChild(null);
    router.refresh();
  };

  const handleDelete = async (child: Child) => {
    if (!confirm(`Remove ${child.first_name} ${child.last_name}'s profile?`)) return;
    setDeletingId(child.id);
    try {
      await apiDelete(`/api/children/${child.id}`);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {initialChildren.length === 0 && !showAddForm && (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>👶</span>
          <p>No child profiles yet. Add one to start booking sessions.</p>
        </div>
      )}

      {initialChildren.length > 0 && (
        <table className={styles.table} style={{ marginBottom: 'var(--space-6)' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Allergies</th>
              <th>Medical notes</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {initialChildren.map((child) =>
              editingChild?.id === child.id ? (
                <tr key={child.id}>
                  <td colSpan={5}>
                    <ChildForm child={child} onSaved={handleSaved} onCancel={() => setEditingChild(null)} />
                  </td>
                </tr>
              ) : (
                <tr key={child.id}>
                  <td>{child.first_name} {child.last_name}</td>
                  <td>{calculateAge(child.date_of_birth)}</td>
                  <td>{child.allergies || '—'}</td>
                  <td>{child.medical_notes || '—'}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Button size="sm" variant="ghost" onClick={() => setEditingChild(child)}>Edit</Button>
                    {' '}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(child)}
                      disabled={deletingId === child.id}
                    >
                      {deletingId === child.id ? 'Removing…' : 'Remove'}
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {showAddForm ? (
        <ChildForm onSaved={handleSaved} onCancel={() => setShowAddForm(false)} />
      ) : (
        <Button onClick={() => setShowAddForm(true)}>Add Child</Button>
      )}
    </div>
  );
}
