import React, { useEffect, useState } from "react";

export const Alert = ({ bgcolor, title, desc, bool, onClose }) => {
  const [showAlert, setShowAlert] = useState(bool);

  useEffect(() => {
    setShowAlert(bool);
    if (bool) {
      setTimeout(() => {
        onClose();
      }, 10000);
    }
  }, [bool, onClose]);

  return (
    <>
      {showAlert && (
        <div className="fixed w-70 justify-center mt-4 mx-[40%] transform translate-y-4 ease-in-out">
          <div
            className={`w-96 p-3 border-0 rounded bg-${bgcolor}-500 bg-gradient-to-r from-${bgcolor}-600 to-${bgcolor}-400 text-white`}
          >
            <span className="text-xl inline-block align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </span>
            <span className="inline-block mr-8 ms-3">
              <b className="capitalize">{title}!</b> {desc}
            </span>
            <button
              className="text-2xl font-semibold"
              onClick={onClose}
            >
              <span>×</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
