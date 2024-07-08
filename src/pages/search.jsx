import React, { useState } from 'react';
import { FaSearch, FaQrcode } from 'react-icons/fa';
import { Scanner } from '@yudiel/react-qr-scanner';

const SearchBar = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result[0]?.rawValue);
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={scanResult || ''}
        className="md:w-96 w-full h-10 border border-gray-300 rounded-l-md p-2 ml-2"
      />
      <button
        className="ml-2 p-3 bg-gray-200 text-gray-700 rounded-md flex items-center mr-2"
        onClick={() => setIsScanning(true)}
      >
        <FaQrcode />
      </button>

      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <Scanner
              onScan={handleScan}
              onError={handleError}
              constraints={{
                facingMode: 'environment'
              }}
              style={previewStyle}
            />
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded-md"
              onClick={() => setIsScanning(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
