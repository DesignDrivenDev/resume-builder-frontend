import React from "react";

const Loader = () => {
  return (
    <div className="h-screen fixed inset-0 bg-white/40 ">
      <div>
        <div className="flex items-center justify-center h-screen">
          <p className="font-bold text-3xl">Generating</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
