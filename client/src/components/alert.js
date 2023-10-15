import React from "react";

export const Alert = ({ bgcolor, title, desc, bool, onClose }) => {// Change the initial state to true

  return (
    <>
      {bool && ( // Render the alert only if showAlert is true
        <div className="flex items-center justify-center ">
          <div
            className={
              "md:w-[70%] w-full  px-4 py-2 border-0 rounded relative my-4 bg-" +
              bgcolor +
              "-500 bg-gradient-to-r from-" +
              bgcolor +
              "-600 to-" +
              bgcolor +
              "-400 text-white"
            }
          >
            <span className="text-xl inline-block md:mr-5 mb-3 md:mb-0 align-middle">
              <i className="fas fa-bell" />
            </span>
            <span className="inline-block align-middle md:mr-8">
              <b className="capitalize">{title}!</b> {desc}
            </span>
            <button
              className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
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
