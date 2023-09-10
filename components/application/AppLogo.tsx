import React, { SVGProps } from "react";

const defaultProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
};

export const AppLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...defaultProps} {...props}>
      <path
        d="M12.378 1.60198C12.2633 1.53503 12.1328 1.49976 12 1.49976C11.8672 1.49976 11.7367 1.53503 11.622 1.60198L3 6.63198L12 11.882L21 6.63198L12.378 1.60198ZM21.75 7.92998L12.75 13.18V22.18L21.378 17.148C21.4912 17.0819 21.5852 16.9873 21.6504 16.8736C21.7157 16.7599 21.75 16.6311 21.75 16.5V7.92998ZM11.25 22.18V13.18L2.25 7.92998V16.5C2.24996 16.6311 2.28429 16.7599 2.34956 16.8736C2.41483 16.9873 2.50877 17.0819 2.622 17.148L11.25 22.18Z"
        fill="currentColor"
      />
    </svg>
  );
};