import Image from "next/image";
import React from "react";

const Phrase = ({ text, src, id }) => {
  return (
    <div className={"phrases"}>
      <div className={"phrase"} id={id}>
        {Array(22)
          .fill(0)
          .map(() => (
            <>
              <p className="">{text}</p>

              <span className="">
                <img style={{ objectFit: "cover" }} src={src} alt="image" />
              </span>
            </>
          ))}
      </div>
    </div>
  );
};

export default Phrase;
