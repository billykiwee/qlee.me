import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import "../../css/popup.css";
import { useStateProps } from "../../provider/ContextProvider";

export default function Popup() {
  const { popUp, show } = useStateProps().popUp;

  const { title, statu, message, valid, question, buttonText, buttonColor } =
    popUp;

  if (Object.values(popUp).length)
    return (
      <div className="frame-popup">
        <div className="fixed">
          <div className="grid white border-r-1 p-2 border-b gap-2rem">
            <div className="grid gap-1rem">
              <div className="display justify-s-b ">
                <div className="display gap">
                  {statu === "question" && (
                    <ExclamationTriangleIcon width={28} className="c-red" />
                  )}
                  <span className="f-s-20 f-w-500">{title}</span>
                </div>
                <div className="display">
                  <button
                    className="w-3 h-3 border-r-100 hover"
                    onClick={(e) => show({})}
                  >
                    <span className="display">
                      <XMarkIcon width={20} className="c-black" />
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid gap grey border-r-04 p-2">
                <div className="display justify-c">
                  {statu === "success" && (
                    <img
                      src="/images/success.svg"
                      width={44}
                      height={44}
                      alt=""
                    />
                  )}
                  <span className="f-s-2rem">
                    {statu === "error" ? "❌" : "🤔"}
                  </span>
                </div>
                <span className="text-align-c">{message}</span>
              </div>
            </div>
            <div className="grid gap">
              <div className="display justify-c">
                <small className="f-w-300 c-grey">{question}</small>
              </div>
              <button
                className={buttonColor + " blue h-4 border-r-1 border-b"}
                onClick={valid}
              >
                <span className="f-s-16" style={{ color: "white" }}>
                  {buttonText}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
