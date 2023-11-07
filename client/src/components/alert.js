import React, { useEffect, useState } from "react";

export const Alert = ({ bgcolor, title, desc, bool, onClose }) => {
  const [showAlert, setShowAlert] = useState(bool);

  useEffect(() => {
    setShowAlert(bool);
    if (bool) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [bool, onClose]);

  return (
    <>
      
      <div
  className={`fixed top-0 left-0 right-0 p-4 transition-transform ${
    showAlert ? 'transform translate-y-0' : 'transform -translate-y-full'
  }`}
>
  <div
    className={`border-0 p-4 rounded bg-${bgcolor}-500 bg-gradient-to-r from-${bgcolor}-600 to-${bgcolor}-400 text-white flex items-center justify-between`}
  >
    <div className="flex items-center">
      <span className="text-xl inline-block align-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </span>
      <span className="inline-block ml-3">
        <b className="capitalize">{title}!</b> {desc}
      </span>
    </div>
    <button className="text-2xl font-semibold" onClick={onClose}>
      <span>×</span>
    </button>
  </div>
</div>

      
    </>
  );
};
