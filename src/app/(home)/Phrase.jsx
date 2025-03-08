import Image from "next/image";
import React from "react";

const Phrase = ({ text, src, id }) => {
  return (
    <div className={"phrases"}>
      <div className={"phrase"} id={id}>
        {Array(40)
          .fill(0)
          .map((_, i) => (
            <div key={`phrase${i}`}>
              <p className="">{text}</p>

              <span className="">
                <img loading="eager" style={{ objectFit: "cover" }} src={src} alt="image" />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Phrase;
