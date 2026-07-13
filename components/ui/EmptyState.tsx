export function EmptyState({ title, message }: { title: string; message?: string }) {
  return (
    <div className="empty-state">
      <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--ink)" }}>{title}</p>
      {message ? <p className="sum" style={{ marginTop: "var(--space-2)" }}>{message}</p> : null}
    </div>
  );
}
