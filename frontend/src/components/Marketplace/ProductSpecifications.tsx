interface ProductSpecificationsProps {
  specifications: Record<string, string>;
}

const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
  return (
    <div className="mt-8 border-t border-gray-200 pt-5">
      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
        Specifications
      </h4>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="rounded-2xl bg-white p-4 shadow-soft">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{key}</dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProductSpecifications;