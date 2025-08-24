function History() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">History</h1>
      <p className="text-gray-600 mb-6">
        Here is a record of medicines you have <span className="font-medium text-green-600">taken </span> 
        and <span className="font-medium text-red-600">missed</span>.
      </p>

      {/* Example section */}
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-800">Aspirin</h2>
          <p className="text-sm text-gray-500">08:00 AM – <span className="text-green-600">Taken</span></p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-800">Metformin</h2>
          <p className="text-sm text-gray-500">12:00 PM – <span className="text-red-600">Missed</span></p>
        </div>
      </div>
    </div>
  );
}

export default History;
