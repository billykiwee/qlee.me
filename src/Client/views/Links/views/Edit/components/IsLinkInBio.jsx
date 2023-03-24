import { SwatchIcon } from "@heroicons/react/24/solid";
import React from "react";

export function IsLinkInBio({ Link }) {
  return (
    <>{Link.linkInBio && <SwatchIcon width={16} className="c-yellow" />}</>
  );
}
