import React from 'react';

const shimmerStyle = {
  background:
    'linear-gradient(90deg, var(--color-skeleton) 25%, var(--color-skeleton-shine) 50%, var(--color-skeleton) 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite ease-in-out',
};

export function SkeletonLine({ width = '100%', height = '1rem', className = '' }) {
  return (
    <div
      className={`rounded-md ${className}`}
      style={{
        ...shimmerStyle,
        width,
        height,
      }}
    />
  );
}

export function SkeletonCircle({ size = '2.5rem', className = '' }) {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{
        ...shimmerStyle,
        width: size,
        height: size,
      }}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card rounded-xl p-6 ${className}`} style={{ transform: 'none' }}>
      <div className="flex items-start gap-4 mb-4">
        <SkeletonCircle size="3rem" />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="60%" height="1.25rem" />
          <SkeletonLine width="40%" height="0.875rem" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLine width="100%" height="0.875rem" />
        <SkeletonLine width="90%" height="0.875rem" />
        <SkeletonLine width="70%" height="0.875rem" />
      </div>
      <div className="flex gap-2 mt-4">
        <SkeletonLine width="4rem" height="1.75rem" className="rounded-full" />
        <SkeletonLine width="4rem" height="1.75rem" className="rounded-full" />
        <SkeletonLine width="4rem" height="1.75rem" className="rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4, columns = 2 }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
