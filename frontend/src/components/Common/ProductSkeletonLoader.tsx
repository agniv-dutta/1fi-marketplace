interface ProductSkeletonLoaderProps {
  columns?: number;
  rows?: number;
}

const ProductSkeletonLoader = ({ columns = 3, rows = 2 }: ProductSkeletonLoaderProps) => {
  const gridClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'sm:grid-cols-2'
        : columns === 3
          ? 'sm:grid-cols-2 xl:grid-cols-3'
          : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className="grid gap-5">
      <div className={`grid gap-5 ${gridClass}`}>
        {Array.from({ length: columns * rows }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-soft"
          >
            <div className="aspect-square animate-pulse bg-gray-200" />
            <div className="space-y-4 p-5">
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-4/5 animate-pulse rounded-full bg-gray-200" />
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-gray-200" />
              <div className="flex items-end justify-between gap-4">
                <div className="h-6 w-1/3 animate-pulse rounded-full bg-gray-200" />
                <div className="h-5 w-1/4 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="h-11 w-full animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeletonLoader;