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
        'rounded-2xl border border-white/10 bg-[#171F2F]/80 p-6 shadow-2xl backdrop-blur-xl md:p-8',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Personal Details</h2>
          <p className="mt-0.5 text-xs text-[#A1A8B5]">
            Manage your personal profile information and regional preferences
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#121A2F] px-3.5 py-1.5 text-xs font-mono font-bold text-[#5B8CFF] hover:border-[#5B8CFF]/40 transition-all cursor-pointer"
          >
            <HiOutlinePencil className="h-3.5 w-3.5" />
            <span>Edit Info</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/15 px-2.5 py-1 text-xs font-mono font-bold text-[#F59E0B]">
            Editing Mode
          </span>
        )}
      </div>

      {savedNotification && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/15 p-3 text-xs font-mono text-[#22C55E]">
          <div className="flex items-center gap-2">
            <HiOutlineCheck className="h-4 w-4" />
            <span>Personal details updated successfully!</span>
          </div>
          <button
            type="button"
            onClick={() => setSavedNotification(false)}
            className="text-[#22C55E] hover:text-white"
          >
            <HiOutlineX className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.id} className="space-y-1.5">
                <label
                  htmlFor={field.id}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#A1A8B5]"
                >
                  <Icon className="h-4 w-4 text-[#5B8CFF]" />
                  <span>{field.label}</span>
                </label>

                {isEditing ? (
                  field.type === 'select' ? (
                    <select
                      id={field.id}
                      name={field.id}
                      value={field.value}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-[#121A2F] px-3.5 py-2 text-sm text-white focus:border-[#5B8CFF] focus:outline-none"
                    >
                      {field.options.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          className="bg-[#121A2F] text-white"
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
                      className="w-full rounded-xl border border-white/10 bg-[#121A2F] px-3.5 py-2 text-sm text-white focus:border-[#5B8CFF] focus:outline-none"
                    />
                  )
                ) : (
                  <div className="rounded-xl border border-white/10 bg-[#121A2F] px-3.5 py-2.5 text-sm font-medium text-white">
                    {field.displayValue || (
                      <span className="italic text-[#64748B]">Not specified</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isEditing && (
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#121A2F] px-4 py-2 text-xs font-mono font-bold text-[#A1A8B5] hover:text-white"
            >
              <HiOutlineX className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl gradient-primary px-5 py-2 text-xs font-bold text-white shadow-glow-blue cursor-pointer"
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
