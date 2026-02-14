import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/ui/Button';
import CosmicBackground from '../components/ui/CosmicBackground';
import GlassCard from '../components/layout/GlassCard';

const ProfileSetupScreen = () => {
  const { goTo } = useNavigation();
  const { updateUserProfile } = useApp();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    time: '',
    gender: 'female'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.dob) {
      updateUserProfile(formData);
      goTo('/home');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-6 relative">
      <CosmicBackground intensity="normal" />

      <div className="z-10 flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto flex items-center justify-center text-4xl mb-4 shadow-lg shadow-purple-500/30">
            👤
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            {t('profile.title')}
          </h1>
          <p className="text-white/60 text-sm">
            {t('profile.desc')}
          </p>
        </div>

        <GlassCard className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs text-white/50 uppercase tracking-wide ml-1">
                {t('profile.name_label')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('profile.name_placeholder')}
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="text-xs text-white/50 uppercase tracking-wide ml-1">
                {t('profile.dob_label')}
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="text-white"
              />
            </div>

            {/* Time of Birth */}
            <div className="space-y-1">
              <label className="text-xs text-white/50 uppercase tracking-wide ml-1">
                {t('profile.time_label')}
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-xs text-white/50 uppercase tracking-wide ml-1">
                {t('profile.gender_label')}
              </label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
              >
                <option value="female">{t('profile.gender_female')}</option>
                <option value="male">{t('profile.gender_male')}</option>
                <option value="other">{t('profile.gender_other')}</option>
              </select>
            </div>

            <div className="pt-4">
              <Button 
                variant="primary" 
                fullWidth 
                size="lg"
                type="submit"
              >
                {t('profile.setup_btn')}
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default ProfileSetupScreen;
