export const detectDataType = (data) => {
  if (!data) return 'text';

  // URL detection
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (urlRegex.test(data)) {
    return 'url';
  }

  // Email detection
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(data)) {
    return 'email';
  }

  // Phone number detection (international format)
  const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
  if (phoneRegex.test(data.replace(/\s/g, ''))) {
    return 'phone';
  }

  // WiFi QR code detection
  if (data.startsWith('WIFI:')) {
    return 'wifi';
  }

  // VCard detection
  if (data.startsWith('BEGIN:VCARD')) {
    return 'vcard';
  }

  return 'text';
};

export const getActionForDataType = (type, data) => {
  switch (type) {
    case 'url':
      return {
        label: 'Open URL',
        action: () => window.open(data.startsWith('http') ? data : `https://${data}`, '_blank')
      };
    case 'email':
      return {
        label: 'Send Email',
        action: () => window.location.href = `mailto:${data}`
      };
    case 'phone':
      return {
        label: 'Call',
        action: () => window.location.href = `tel:${data}`
      };
    case 'wifi':
      return {
        label: 'WiFi Info',
        action: () => alert('WiFi configuration detected. Manual setup required.')
      };
    default:
      return null;
  }
};
