import { ProductsList } from "./(components)/ProductsList";
import { ProductsListHeader } from "./(components)/ProductsListHeader";

export default function ProductsPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <ProductsListHeader />
        <ProductsList />
      </div>
    </div>
  );
}
