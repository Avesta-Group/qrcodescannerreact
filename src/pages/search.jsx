import React, { useState, useEffect } from 'react';
import {
  FaQrcode,
  FaCopy,
  FaHistory,
  FaMoon,
  FaSun,
  FaPlus,
  FaCamera,
  FaExternalLinkAlt,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { detectDataType, getActionForDataType } from '../utils/dataDetector';
import QRGenerator from '../components/QRGenerator';
import ScanHistory from '../components/ScanHistory';

const SearchBar = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [history, setHistory] = useLocalStorage('qr-scan-history', []);
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);
  const [showHistory, setShowHistory] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('environment'); // 'environment' or 'user'
  const [copySuccess, setCopySuccess] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleScan = (result) => {
    if (result && result[0]?.rawValue) {
      const scannedData = result[0].rawValue;
      setScanResult(scannedData);
      setIsScanning(false);

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        data: scannedData,
        timestamp: new Date().toISOString(),
        type: detectDataType(scannedData)
      };
      setHistory([newHistoryItem, ...history]);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleCopy = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const toggleCamera = () => {
    setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all scan history?')) {
      setHistory([]);
    }
  };

  const handleDeleteItem = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  const handleSelectFromHistory = (data) => {
    setScanResult(data);
    setShowHistory(false);
  };

  const handleExportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-scan-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportHistory = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          if (Array.isArray(importedData)) {
            setHistory([...importedData, ...history]);
            alert('History imported successfully!');
          }
        } catch (error) {
          alert('Error importing history. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const dataType = detectDataType(scanResult);
  const smartAction = getActionForDataType(dataType, scanResult);

  const previewStyle = {
    height: 320,
    width: 320,
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 dark:bg-gray-900 transition-colors">
      {/* Header with Dark Mode Toggle */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">QR Code Scanner</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
        </button>
      </div>

      {/* Main Search Bar */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Scan or enter text..."
            value={scanResult}
            onChange={(e) => setScanResult(e.target.value)}
            className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          />

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            disabled={!scanResult}
            className={`p-3 rounded-lg transition-colors ${
              copySuccess
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title="Copy to clipboard"
          >
            <FaCopy />
          </button>
        </div>

        {/* Smart Action Button */}
        {scanResult && smartAction && (
          <div className="mb-4">
            <button
              onClick={smartAction.action}
              className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              {dataType === 'url' && <FaExternalLinkAlt />}
              {dataType === 'email' && <FaEnvelope />}
              {dataType === 'phone' && <FaPhone />}
              <span>{smartAction.label}</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setIsScanning(true)}
            className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaQrcode />
            <span className="hidden md:inline">Scan</span>
          </button>

          <button
            onClick={() => setShowGenerator(true)}
            className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <FaPlus />
            <span className="hidden md:inline">Generate</span>
          </button>

          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center justify-center gap-2 p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <FaHistory />
            <span className="hidden md:inline">History</span>
            {history.length > 0 && (
              <span className="bg-white text-purple-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {history.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setScanResult('')}
            className="flex items-center justify-center gap-2 p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Data Type Indicator */}
        {scanResult && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Detected Type:</span>{' '}
              <span className="capitalize">{dataType}</span>
            </p>
          </div>
        )}
      </div>

      {/* Scanner Modal */}
      {isScanning && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md mx-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-bold dark:text-white">Scan QR Code</h3>
              <button
                onClick={toggleCamera}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title={`Switch to ${cameraFacing === 'environment' ? 'front' : 'rear'} camera`}
              >
                <FaCamera className="dark:text-white" />
              </button>
            </div>

            <Scanner
              onScan={handleScan}
              onError={handleError}
              constraints={{
                facingMode: cameraFacing
              }}
              styles={{
                container: { width: '100%' }
              }}
            />

            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => setIsScanning(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={toggleCamera}
              >
                Switch Camera
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Generator Modal */}
      <QRGenerator
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
      />

      {/* Scan History Modal */}
      <ScanHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteItem}
        onSelectItem={handleSelectFromHistory}
        onExport={handleExportHistory}
        onImport={handleImportHistory}
      />
    </div>
  );
};

export default SearchBar;
