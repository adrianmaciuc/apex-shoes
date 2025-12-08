interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
  "data-testid"?: string;
}

const Skeleton = ({
  className = "",
  variant = "rectangular",
  width,
  height,
  "data-testid": testId,
}: SkeletonProps) => {
  const baseClasses =
    "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer";

  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style = {
    backgroundSize: "200% 100%",
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      data-testid={testId || "skeleton"}
    />
  );
};

export default Skeleton;
