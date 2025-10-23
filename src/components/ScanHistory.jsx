import React from 'react';
import { FaTimes, FaCopy, FaTrash, FaExternalLinkAlt, FaEnvelope, FaPhone, FaDownload, FaUpload } from 'react-icons/fa';
import { detectDataType, getActionForDataType } from '../utils/dataDetector';

const ScanHistory = ({ isOpen, onClose, history, onClearHistory, onDeleteItem, onSelectItem, onExport, onImport }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'url':
        return <FaExternalLinkAlt className="text-blue-500" />;
      case 'email':
        return <FaEnvelope className="text-green-500" />;
      case 'phone':
        return <FaPhone className="text-purple-500" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Scan History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FaTimes className="dark:text-white" />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
          >
            <FaDownload /> Export
          </button>
          <label className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm cursor-pointer">
            <FaUpload /> Import
            <input
              type="file"
              accept=".json"
              onChange={onImport}
              className="hidden"
            />
          </label>
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm ml-auto"
          >
            <FaTrash /> Clear All
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {history.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No scan history yet. Start scanning QR codes!
            </p>
          ) : (
            <div className="space-y-2">
              {history.map((item) => {
                const dataType = detectDataType(item.data);
                const action = getActionForDataType(dataType, item.data);

                return (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getIcon(dataType)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p
                          className="text-sm dark:text-white break-all cursor-pointer hover:text-blue-500"
                          onClick={() => onSelectItem(item.data)}
                        >
                          {item.data}
                        </p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleCopy(item.data)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                          title="Copy"
                        >
                          <FaCopy className="text-gray-600 dark:text-gray-300 text-sm" />
                        </button>
                        {action && (
                          <button
                            onClick={action.action}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                            title={action.label}
                          >
                            {getIcon(dataType)}
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-red-500 text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;
