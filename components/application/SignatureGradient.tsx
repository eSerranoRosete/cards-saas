import React, { SVGProps } from "react";

const defaultProps = {
  width: "474",
  height: "173",
  viewBox: "0 0 474 173",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

export const SignatureGradient = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...defaultProps} {...props}>
      <g filter="url(#filter0_f_16_2)">
        <path
          d="M427.977 120.24C432.035 124.335 426.804 130.2 421.839 127.269C367.575 95.235 300.577 88 233 88C165.423 88 105.853 95.235 51.5893 127.269C46.6245 130.2 41.393 124.335 45.4511 120.24C94.2434 70.9992 150 44 236.714 44C323.428 44 379.185 70.9992 427.977 120.24Z"
          fill="url(#paint0_linear_16_2)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_16_2"
          x="0"
          y="0"
          width="473.428"
          height="172.06"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="22"
            result="effect1_foregroundBlur_16_2"
          />
        </filter>
        <linearGradient
          id="paint0_linear_16_2"
          x1="44"
          y1="67.8254"
          x2="429.028"
          y2="66.7126"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4F46E5" />
          <stop offset="0.489583" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  );
};
