import React from "react";

const Piece = (props: React.SVGProps<SVGSVGElement>) => {
  const { fill, style, onClick, className } = props;
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 744.09 1052.4"
      style={style}
      className={className}
    >
      <path
        d="M304.66 1.707c-111.06 0-201.06 85.329-201.06 190.64 0 78.193 49.628 145.36 120.66 174.78l-69.527 172.97-153.03 381.05h1.434c-.79 2.357-1.195 4.724-1.195 7.136 0 44.187 135.38 79.97 302.48 79.97s302.6-35.782 302.6-79.97c0-.653-.06-1.277-.12-1.926h.837l-1.792-4.53c-.358-1.177-.766-2.351-1.314-3.512l-146.93-375.63-69.17-177.04c69.18-30.15 117.31-96.38 117.31-173.31 0-105.3-90.11-190.63-201.18-190.63z"
        color="#000"
        stroke="#000"
        strokeWidth="3.413"
        fill={fill}
      />
    </svg>
  );
};

export default Piece;
