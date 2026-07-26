import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiOutlineCurrencyDollar,
  HiOutlineBriefcase,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlinePencil,
  HiOutlineSave,
} from 'react-icons/hi';
import { cn } from '../../utils/helpers';
import { mockProfileData } from '../../data/mockProfileData';

/**
 * ProfileCard — Personal Information card with interactive inline edit form mode.
 * Displays user profile fields (Full Name, Email, Phone, Country, Currency, Occupation)
 * and permits editing with Save/Cancel controls.
 */
const ProfileCard = ({
  user = mockProfileData.user,
  onSave,
  className = '',
  initialIsEditing = false,
}) => {
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    currency: user?.currency || '',
    occupation: user?.occupation || '',
  });
  const [savedNotification, setSavedNotification] = useState(false);

  // Sync state if user prop changes externally
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || '',
      currency: user?.currency || '',
      occupation: user?.occupation || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    setIsEditing(false);
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || '',
      currency: user?.currency || '',
      occupation: user?.occupation || '',
    });
    setIsEditing(false);
  };

  const fields = [
    {
      id: 'name',
      label: 'Full Name',
      value: formData.name,
      displayValue: user?.name,
      icon: HiOutlineUser,
      type: 'text',
      placeholder: 'e.g. Alex Morgan',
    },
    {
      id: 'email',
      label: 'Email Address',
      value: formData.email,
      displayValue: user?.email,
      icon: HiOutlineMail,
      type: 'email',
      placeholder: 'alex.morgan@subsense.ai',
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: formData.phone,
      displayValue: user?.phone,
      icon: HiOutlinePhone,
      type: 'tel',
      placeholder: '+1 (555) 234-5678',
    },
    {
      id: 'occupation',
      label: 'Occupation',
      value: formData.occupation,
      displayValue: user?.occupation,
      icon: HiOutlineBriefcase,
      type: 'text',
      placeholder: 'Senior Product Designer',
    },
    {
      id: 'country',
      label: 'Country / Region',
      value: formData.country,
      displayValue: user?.country,
      icon: HiOutlineGlobe,
      type: 'select',
      options: [
        'United States (USD $)',
        'India (INR ₹)',
        'United Kingdom (GBP £)',
        'Canada (CAD $)',
        'European Union (EUR €)',
        'Australia (AUD $)',
      ],
    },
    {
      id: 'currency',
      label: 'Default Currency',
      value: formData.currency,
      displayValue: user?.currency,
      icon: HiOutlineCurrencyDollar,
      type: 'select',
      options: [
        'USD ($)',
        'INR (₹)',
        'EUR (€)',
        'GBP (£)',
        'CAD ($)',
        'AUD ($)',
      ],
    },
  ];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl transition-all duration-300 md:p-8',
        className
      )}
    >
      {/* Header section with title and edit button */}
      <div className="flex items-center justify-between border-b border-glass-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Personal Details</h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Manage your personal profile information and regional preferences
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 rounded-xl border border-glass-border bg-glass/80 px-3.5 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <HiOutlinePencil className="h-3.5 w-3.5" />
            <span>Edit Info</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
            Editing Mode
          </span>
        )}
      </div>

      {/* Success Notification Toast */}
      {savedNotification && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-400">
          <div className="flex items-center gap-2">
            <HiOutlineCheck className="h-4 w-4" />
            <span>Personal details updated successfully!</span>
          </div>
          <button
            type="button"
            onClick={() => setSavedNotification(false)}
            className="text-emerald-400 hover:text-emerald-300"
          >
            <HiOutlineX className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Profile Form / Detail Grid */}
      <form onSubmit={handleSave} className="mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.id} className="space-y-1.5">
                <label
                  htmlFor={field.id}
                  className="flex items-center gap-1.5 text-xs font-semibold text-text-muted"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{field.label}</span>
                </label>

                {isEditing ? (
                  field.type === 'select' ? (
                    <select
                      id={field.id}
                      name={field.id}
                      value={field.value}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-glass-border bg-background-card/80 px-3.5 py-2 text-sm font-medium text-text-primary backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {field.options.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-background-card text-text-primary"
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      name={field.id}
                      value={field.value}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-glass-border bg-background-card/80 px-3.5 py-2 text-sm font-medium text-text-primary backdrop-blur-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  )
                ) : (
                  <div className="rounded-xl border border-glass-border/40 bg-glass/40 px-3.5 py-2 text-sm font-medium text-text-primary">
                    {field.displayValue || (
                      <span className="italic text-text-muted">Not specified</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls when in Edit Mode */}
        {isEditing && (
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-glass-border pt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded-xl border border-glass-border bg-glass/50 px-4 py-2 text-xs font-semibold text-text-secondary transition-all hover:bg-glass hover:text-text-primary"
            >
              <HiOutlineX className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/20 px-5 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/30 hover:shadow-glow"
            >
              <HiOutlineSave className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    occupation: PropTypes.string,
  }),
  onSave: PropTypes.func,
  className: PropTypes.string,
  initialIsEditing: PropTypes.bool,
};

export default ProfileCard;
