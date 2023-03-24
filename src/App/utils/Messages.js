import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Messages({ statu, msg, loader }) {
  if (statu === "error") {
    return (
      <div className="display display justify-c" style={{ zIndex: 9 }}>
        <div className="">
          <div
            className="shadow border border-r-04 display justify-c gap p-lr-1 shadow margin-auto p-1"
            style={{ background: "var(--red-secondary)" }}
          >
            <span className="display">
              <ExclamationTriangleIcon width={28} className="c-red" />
            </span>
            <div>
              <span>{msg}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (statu === "success") {
    return (
      <div className="sucess-message display justify-c">
        <div className="border-green-light">
          <div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18.5C12.1217 18.5 14.1566 17.6571 15.6569 16.1569C17.1571 14.6566 18 12.6217 18 10.5C18 8.37827 17.1571 6.34344 15.6569 4.84315C14.1566 3.34285 12.1217 2.5 10 2.5C7.87827 2.5 5.84344 3.34285 4.34315 4.84315C2.84285 6.34344 2 8.37827 2 10.5C2 12.6217 2.84285 14.6566 4.34315 16.1569C5.84344 17.6571 7.87827 18.5 10 18.5V18.5ZM13.707 9.207C13.8892 9.0184 13.99 8.7658 13.9877 8.5036C13.9854 8.2414 13.8802 7.99059 13.6948 7.80518C13.5094 7.61977 13.2586 7.5146 12.9964 7.51233C12.7342 7.51005 12.4816 7.61084 12.293 7.793L9 11.086L7.707 9.793C7.5184 9.61084 7.2658 9.51005 7.0036 9.51233C6.7414 9.5146 6.49059 9.61977 6.30518 9.80518C6.11977 9.99059 6.0146 10.2414 6.01233 10.5036C6.01005 10.7658 6.11084 11.0184 6.293 11.207L8.293 13.207C8.48053 13.3945 8.73484 13.4998 9 13.4998C9.26516 13.4998 9.51947 13.3945 9.707 13.207L13.707 9.207V9.207Z"
                fill="#1dd1a1"
              />
            </svg>
          </div>
          <div>
            <span className="f-s-14">{msg}</span>
          </div>
        </div>
      </div>
    );
  }

  if (loader === true) {
    return (
      <div className="loader-spinner display justify-c">
        <div className="loader-spinner">
          <img alt="loader" src="/images/loader.svg"></img>
        </div>
      </div>
    );
  }
}
