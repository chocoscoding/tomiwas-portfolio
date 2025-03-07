import AnimatedCursor from "react-animated-cursor";

const CustomCursor = () => {
  return (
    <AnimatedCursor
      color="#fff8db"
      innerSize={8}
      trailingSpeed={7}
      outerSize={20}
      innerScale={1}
      outerScale={1.4}
      outerAlpha={0}
      innerStyle={{
        backgroundColor: "var(--text)",
        mixBlendMode: "difference",
      }}
      outerStyle={{
        backgroundColor: "#fff8db96",
        mixBlendMode: "difference",
      }}
    />
  );
};

export default CustomCursor;
