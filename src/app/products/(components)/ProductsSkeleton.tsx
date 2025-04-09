export function ProductsSkeleton() {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
