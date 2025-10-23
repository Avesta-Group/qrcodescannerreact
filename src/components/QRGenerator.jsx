import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaTimes, FaDownload } from 'react-icons/fa';

const QRGenerator = ({ isOpen, onClose }) => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);

  const handleDownload = () => {
    const svg = document.getElementById('generated-qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Generate QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FaTimes className="dark:text-white" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL to generate QR code..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Size: {size}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {text && (
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG
                  id="generated-qr-code"
                  value={text}
                  size={size}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <FaDownload />
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
