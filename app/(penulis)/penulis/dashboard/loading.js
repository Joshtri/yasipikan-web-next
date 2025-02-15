export default function Loading() {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 h-32 rounded-lg"></div>
            <div className="bg-gray-100 h-32 rounded-lg"></div>
            <div className="bg-gray-100 h-32 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }