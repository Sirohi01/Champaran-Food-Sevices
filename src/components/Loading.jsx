const Loading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="bg-white/70 backdrop-blur border rounded-2xl p-4 shadow-sm">
          <div className="h-4 w-28 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite] rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite] rounded"></div>
            <div className="h-3 w-5/6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite] rounded"></div>
            <div className="h-3 w-2/3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite] rounded"></div>
          </div>
        </div>
      </div>
      <style>{`@keyframes shimmer { 0% { background-position: -468px 0 } 100% { background-position: 468px 0 } }`}</style>
    </div>
  );
};

export default Loading;


