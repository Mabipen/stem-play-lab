'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiDelete } from '@/lib/api';
import type { ClassSession } from '@/lib/types';
import Button from '@/components/Button';
import ClassSessionForm from './ClassSessionForm';
import styles from '@/components/dashboard/DashboardUI.module.css';

export default function ClassSessionsManager({ serviceId, initialSessions }: { serviceId: number; initialSessions: ClassSession[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSaved = () => {
    setShowAddForm(false);
    setEditingSession(null);
    router.refresh();
  };

  const handleDelete = async (session: ClassSession) => {
    if (!confirm('Delete this session?')) return;
    setDeletingId(session.id);
    try {
      await apiDelete(`/api/admin/class-sessions/${session.id}`);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {initialSessions.length === 0 && !showAddForm && (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateIcon}>📅</span>
          <p>No sessions yet.</p>
        </div>
      )}

      {initialSessions.length > 0 && (
        <table className={styles.table} style={{ marginBottom: 'var(--space-6)' }}>
          <thead>
            <tr>
              <th>Date &amp; time</th>
              <th>Capacity</th>
              <th>Spots left</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {initialSessions.map((session) =>
              editingSession?.id === session.id ? (
                <tr key={session.id}>
                  <td colSpan={5}>
                    <ClassSessionForm serviceId={serviceId} session={session} onSaved={handleSaved} onCancel={() => setEditingSession(null)} />
                  </td>
                </tr>
              ) : (
                <tr key={session.id}>
                  <td>{new Date(session.start_time).toLocaleString('en-GB')}</td>
                  <td>{session.max_capacity}</td>
                  <td>{session.spots_remaining}</td>
                  <td>{session.status}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Button size="sm" variant="ghost" onClick={() => setEditingSession(session)}>Edit</Button>
                    {' '}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(session)}
                      disabled={deletingId === session.id}
                    >
                      {deletingId === session.id ? 'Deleting…' : 'Delete'}
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {showAddForm ? (
        <ClassSessionForm serviceId={serviceId} onSaved={handleSaved} onCancel={() => setShowAddForm(false)} />
      ) : (
        <Button onClick={() => setShowAddForm(true)}>Add Session</Button>
      )}
    </div>
  );
}
