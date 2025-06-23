'use client';

import { useState, useEffect } from 'react';

export default function PWAInstallGuide() {
  const [showGuide, setShowGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
    setIsAndroid(/Android/.test(userAgent));
  }, []);

  const handleShowGuide = () => {
    setShowGuide(true);
  };

  const handleHideGuide = () => {
    setShowGuide(false);
  };

  if (!showGuide) {
    return (
      <button
        onClick={handleShowGuide}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40"
        title="Install App"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Install Bollo</h2>
          <button
            onClick={handleHideGuide}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isIOS ? (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-gray-900 font-medium">Tap the Share button</p>
                <p className="text-gray-600 text-sm">Look for the square with an arrow pointing upward</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-gray-900 font-medium">Tap &quot;Add to Home Screen&quot;</p>
                <p className="text-gray-600 text-sm">Scroll down and tap this option</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="text-gray-900 font-medium">Tap &quot;Add&quot;</p>
                <p className="text-gray-600 text-sm">Confirm the installation</p>
              </div>
            </div>
          </div>
        ) : isAndroid ? (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-gray-900 font-medium">Tap the menu button</p>
                <p className="text-gray-600 text-sm">Look for the three dots in the top right</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-gray-900 font-medium">Tap &quot;Add to Home screen&quot;</p>
                <p className="text-gray-600 text-sm">Or &quot;Install app&quot; depending on your browser</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="text-gray-900 font-medium">Tap &quot;Add&quot; or &quot;Install&quot;</p>
                <p className="text-gray-600 text-sm">Confirm the installation</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-gray-900 font-medium">Look for the install button</p>
                <p className="text-gray-600 text-sm">It may appear in your browser&apos;s address bar or menu</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-gray-900 font-medium">Click &quot;Install&quot;</p>
                <p className="text-gray-600 text-sm">Follow your browser&apos;s installation prompts</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleHideGuide}
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
} 