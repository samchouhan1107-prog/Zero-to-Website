import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-app-active';

  const variantClasses = {
    text: 'rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? (variant === 'text' ? '1em' : '100%'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export const LessonCardSkeleton = () => (
  <div className="panel-surface p-5 space-y-3">
    <LoadingSkeleton variant="text" width="60%" height="1.2em" />
    <LoadingSkeleton variant="text" width="90%" height="0.9em" />
    <LoadingSkeleton variant="text" width="75%" height="0.9em" />
    <div className="flex gap-2 pt-2">
      <LoadingSkeleton variant="rectangular" width="80px" height="32px" />
      <LoadingSkeleton variant="rectangular" width="80px" height="32px" />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="mx-auto w-full max-w-[1550px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 space-y-8">
    <div className="panel-surface p-8 sm:p-12 lg:p-16 min-h-[600px] space-y-4">
      <LoadingSkeleton variant="text" width="40%" height="2.5em" />
      <LoadingSkeleton variant="text" width="70%" height="1.2em" />
      <LoadingSkeleton variant="text" width="50%" height="1em" />
      <div className="flex flex-wrap gap-3 pt-4">
        <LoadingSkeleton variant="rectangular" width="160px" height="48px" />
        <LoadingSkeleton variant="rectangular" width="160px" height="48px" />
      </div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <LessonCardSkeleton key={i} />
      ))}
    </div>
  </div>
);
