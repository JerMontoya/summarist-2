export default function SkeletonWheel() {
  return (
    <div className="for-you__recommended--books skeleton-wheel" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="for-you__recommended--books-link skeleton-wheel-item">
          <div className="skeleton-block img-card" />
          <div className="skeleton-block text-sm" style={{ marginTop: 8 }} />
          <div className="skeleton-block text-xs" style={{ marginTop: 6 }} />
          <div className="skeleton-block text-xs" style={{ marginTop: 6 }} />
          <div className="skeleton-block text-xs" style={{ marginTop: 6 }} />
        </div>
      ))}
    </div>
  );
}
