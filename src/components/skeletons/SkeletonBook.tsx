export default function SkeletonBook() {
  return (
  <div className="skeleton-book">
      <div className="skeleton-left">
        <div className="skeleton-rect large" />
        <div className="skeleton-rect medium" />
        <div className="skeleton-rect small" />
        <div className="skeleton-rect large" />
        <div className="skeleton-rect large" />
        <div className="skeleton-rect small" />

        <div className="skeleton-rect medium" />
        <div className="skeleton-rect large" />

        <div className="skeleton-rect paragraph" />
        <div className="skeleton-rect medium" />
        <div className="skeleton-rect paragraph" />

      </div>
      <div className="skeleton-right">
        <div className="skeleton-rect cover" />
      </div>
    </div>
  );
}

