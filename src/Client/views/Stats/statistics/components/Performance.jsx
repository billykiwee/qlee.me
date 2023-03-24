import React from "react";

export function Performance({ stat }) {
  return stat.type.map((item, i) => {
    if (!stat.type[0].data)
      return <small className="c-grey">Aucune données</small>;

    return (
      <div className="display justify-s-b" key={i}>
        <div className="display gap w-50p">
          <span>{item.title}</span>
        </div>
        <span>{item.data}</span>
      </div>
    );
  });
}
