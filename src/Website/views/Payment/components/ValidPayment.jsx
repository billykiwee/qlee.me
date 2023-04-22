import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

export default function ValidPayment() {
  return (
    <div>
      <h2>Bienvenu chez toi !</h2>
      <div className="grid gap-1rem">
        <div className="grid gap white p-2 border-r-1 border">
          <div className="display justify-c">
            <CheckCircleIcon width={66} className="c-green" />
          </div>
          <span className="f-s-20 text-align-c">
            Le paiment à été réalisé avec succès !
          </span>
        </div>
        <Link to="/dashboard">
          <button className="blue border-r-1 h-4 p-1">
            <span className="f-s-20 c-white">Aller au dashboard</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
