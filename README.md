# QR Code Scanner React App

A modern, feature-rich QR code scanner and generator application built with React, Vite, and Tailwind CSS.

## Features

### Core Functionality
- **QR Code Scanner**: Scan QR codes using your device camera
- **QR Code Generator**: Create custom QR codes from any text or URL
- **Smart Data Detection**: Automatically detects URLs, emails, phone numbers, WiFi credentials, and vCards
- **Camera Selection**: Switch between front and rear cameras

### History & Data Management
- **Scan History**: All scanned QR codes are automatically saved with timestamps
- **Export History**: Download your scan history as JSON
- **Import History**: Import previously exported scan history
- **History Management**: View, search, and delete individual history items

### User Experience
- **Dark Mode**: Toggle between light and dark themes
- **Copy to Clipboard**: Quick copy functionality for scanned results
- **Smart Actions**:
  - Open URLs directly in browser
  - Compose emails
  - Initiate phone calls
  - View WiFi configuration details
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Persistent Settings**: Dark mode preference and history stored in localStorage

## Technology Stack

- **React 18.3.1** - UI Framework
- **Vite 5.3.1** - Build Tool & Dev Server
- **Tailwind CSS 3.4.4** - Styling
- **@yudiel/react-qr-scanner 2.0.4** - QR Code Scanning
- **qrcode.react** - QR Code Generation
- **react-icons 5.2.1** - Icon Library

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Scanning QR Codes
1. Click the "Scan" button
2. Allow camera permissions if prompted
3. Point your camera at a QR code
4. The scanned data will appear in the input field
5. Use the "Switch Camera" button to toggle between cameras

### Generating QR Codes
1. Click the "Generate" button
2. Enter your text or URL
3. Adjust the size using the slider
4. Click "Download QR Code" to save as PNG

### Managing History
1. Click the "History" button to view all scans
2. Click on any item to load it into the input field
3. Use the copy, action, or delete buttons for each item
4. Export history as JSON for backup
5. Import previously exported history

### Dark Mode
Click the moon/sun icon in the top right to toggle dark mode. Your preference is saved automatically.

## File Structure

```
src/
├── components/
│   ├── QRGenerator.jsx      # QR code generation component
│   └── ScanHistory.jsx       # Scan history management
├── hooks/
│   └── useLocalStorage.js    # Custom hook for localStorage
├── pages/
│   └── search.jsx            # Main scanner page
├── utils/
│   └── dataDetector.js       # Data type detection utilities
├── App.jsx                   # Root component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers with camera support

## Permissions Required

- **Camera Access**: Required for scanning QR codes
- **Clipboard Access**: Required for copy functionality (granted automatically)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
