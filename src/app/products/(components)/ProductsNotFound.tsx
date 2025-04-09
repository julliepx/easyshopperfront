export function ProductsNotFound() {
  return (
    <div className="pt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800">
            There are no products registered.
          </h3>
          <p className="text-gray-600 mt-2">
            If you can, try adding a new product.
          </p>
        </div>
      </div>
    </div>
  );
}
