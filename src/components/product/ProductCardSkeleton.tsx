import Skeleton from "../ui/Skeleton";

interface ProductCardSkeletonProps {
  variant?: "default" | "compact" | "featured";
}

const ProductCardSkeleton = ({
  variant = "default",
}: ProductCardSkeletonProps) => {
  if (variant === "compact") {
    return (
      <div
        className="card overflow-hidden"
        data-testid="product-card-skeleton-compact"
      >
        <Skeleton
          className="w-full aspect-square"
          data-testid="skeleton-image-compact"
        />
        <div className="p-4 space-y-3">
          <Skeleton className="h-3 w-16" data-testid="skeleton-brand-compact" />
          <Skeleton className="h-5 w-3/4" data-testid="skeleton-name-compact" />
          <Skeleton className="h-6 w-20" data-testid="skeleton-price-compact" />
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className="card overflow-hidden"
        data-testid="product-card-skeleton-featured"
      >
        <Skeleton
          className="w-full aspect-[4/3]"
          data-testid="skeleton-image-featured"
        />
        <div className="p-8 space-y-4">
          <Skeleton
            className="h-4 w-24"
            data-testid="skeleton-brand-featured"
          />
          <Skeleton
            className="h-7 w-2/3"
            data-testid="skeleton-name-featured"
          />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" data-testid="skeleton-desc-1" />
            <Skeleton className="h-4 w-5/6" data-testid="skeleton-desc-2" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <Skeleton
              className="h-8 w-24"
              data-testid="skeleton-price-featured"
            />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" data-testid="skeleton-colors" />
              <Skeleton className="h-4 w-16" data-testid="skeleton-sizes" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className="card overflow-hidden"
      data-testid="product-card-skeleton-default"
    >
      <Skeleton
        className="w-full aspect-square"
        data-testid="skeleton-image-default"
      />
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-20" data-testid="skeleton-brand-default" />
        <Skeleton className="h-6 w-3/4" data-testid="skeleton-name-default" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" data-testid="skeleton-desc-1" />
          <Skeleton className="h-3 w-2/3" data-testid="skeleton-desc-2" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-20" data-testid="skeleton-price-default" />
          <Skeleton
            className="h-4 w-16"
            data-testid="skeleton-colors-default"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
