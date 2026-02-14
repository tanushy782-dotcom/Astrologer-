import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { useLanguage } from '../../hooks/useLanguage';

const ImageUploader = ({ onImageSelect, isLoading = false }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onImageSelect(file, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        capture="environment" // Forces camera on mobile often
      />

      <div className="relative">
        {preview ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-lg"
          >
            <img src={preview} alt="Palm Preview" className="w-full h-full object-cover" />
            
            {!isLoading && (
              <button
                onClick={() => {
                  setPreview(null);
                  onImageSelect(null, null);
                }}
                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 transition-colors"
              >
                ✕
              </button>
            )}
            
            {/* Scanning Effect Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-accent-cyan/10 z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-accent-cyan shadow-[0_0_15px_#00d2ff] animate-[scanLine_2s_ease-in-out_infinite]" />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            onClick={() => fileInputRef.current.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              w-full aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${dragActive 
                ? 'border-accent-cyan bg-accent-cyan/10 scale-[1.02]' 
                : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'
              }
            `}
          >
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <span className="text-4xl">📸</span>
            </div>
            <p className="text-white/80 font-medium mb-1">
              {t('palm.upload_btn')}
            </p>
            <p className="text-xs text-white/40">
              Tap or drag photo here
            </p>
          </motion.div>
        )}
      </div>

      {/* Retake Button if preview exists but not loading */}
      {preview && !isLoading && (
        <div className="mt-4">
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={() => fileInputRef.current.click()}
          >
            Retake Photo
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
