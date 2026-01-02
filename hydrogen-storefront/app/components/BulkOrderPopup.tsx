import {useState, useEffect, FormEvent} from 'react';

interface BulkOrderPopupProps {
  delayMs?: number; // Delay before showing popup (default: 120000 = 2 minutes)
  whatsappNumber?: string; // WhatsApp number in format: 919876543210
}

export function BulkOrderPopup({
  delayMs = 120000,
  whatsappNumber = '919876543210',
}: BulkOrderPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: '',
    details: '',
  });
  const [errors, setErrors] = useState<{phone?: string}>({});

  // Show popup after delay
  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('bulkPopupShown');
    if (popupShown) return;

    const timeout = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('bulkPopupShown', 'true');
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [delayMs]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    // Clear error when user starts typing
    if (name === 'phone' && errors.phone) {
      setErrors((prev) => ({...prev, phone: undefined}));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate phone number
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setErrors({phone: 'Please enter a valid 10-digit phone number'});
      return;
    }

    // Create WhatsApp message
    const message = `Hi Daily Loom,

I'm interested in your services.

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Interest: ${formData.interest}
${formData.details ? `\n*Additional Details:*\n${formData.details}` : ''}

Looking forward to hearing from you!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Reset form and close popup
    setFormData({name: '', phone: '', interest: '', details: ''});
    closePopup();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-box">
        <button className="popup-close-btn" onClick={closePopup} aria-label="Close">
          ×
        </button>

        <h2 className="popup-heading">
          Interested in Bulk Orders?
          <br />
          or Custom Sizes?
        </h2>
        <p className="popup-subtitle">Tell us what you need and we'll get back to you</p>

        <form onSubmit={handleSubmit} className="popup-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="customerName">
              Your Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="customerName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="customerPhone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your 10-digit phone number"
              pattern="[0-9]{10}"
              required
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          {/* Interest Dropdown */}
          <div className="form-group">
            <label htmlFor="interest">
              What are you interested in? <span className="required">*</span>
            </label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Bulk Bedsheets (100+ units)">Bulk Bedsheets (100+ units)</option>
              <option value="Bulk Duvets (50+ units)">Bulk Duvets (50+ units)</option>
              <option value="Bulk Towels (100+ units)">Bulk Towels (100+ units)</option>
              <option value="Custom Bedsheet Sizes">Custom Bedsheet Sizes</option>
              <option value="Custom Duvet Sizes">Custom Duvet Sizes</option>
              <option value="Custom Towel Sizes">Custom Towel Sizes</option>
              <option value="Mixed Requirements">Mixed Requirements</option>
            </select>
          </div>

          {/* Details Textarea */}
          <div className="form-group">
            <label htmlFor="details">Tell us more about your needs</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="Custom sizes? Specific quantities? Special colors? Any other requirements?"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="popup-submit-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Send via WhatsApp
          </button>

          <p className="popup-help-text">
            💬 We'll open WhatsApp with your information. You can review and send.
          </p>
        </form>
      </div>
    </div>
  );
}
