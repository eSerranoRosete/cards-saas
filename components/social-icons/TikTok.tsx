import React from "react";

import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

export const TikTok = ({ ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 5C0 2.23858 2.23858 0 5 0H27C29.7614 0 32 2.23858 32 5V27C32 29.7614 29.7614 32 27 32H5C2.23858 32 0 29.7614 0 27V5Z"
        fill="black"
      />
      <path
        d="M14.4984 14.3003V13.6774C14.285 13.6489 14.068 13.6311 13.844 13.6311C11.173 13.6276 9 15.8024 9 18.4792C9 20.1201 9.818 21.5724 11.0699 22.4516C10.2626 21.5867 9.76821 20.4227 9.76821 19.1484C9.76821 16.5108 11.8808 14.3608 14.4984 14.3003Z"
        fill="#25F4EE"
      />
      <path
        d="M14.6157 21.3624C15.8072 21.3624 16.7817 20.412 16.8244 19.2303L16.8279 8.66919H18.7555C18.7164 8.45206 18.6951 8.22781 18.6951 8H16.0633L16.0597 18.5611C16.017 19.7428 15.0425 20.6932 13.8511 20.6932C13.4812 20.6932 13.1327 20.6007 12.8233 20.4369C13.2216 20.9958 13.876 21.3624 14.6157 21.3624Z"
        fill="#25F4EE"
      />
      <path
        d="M22.3584 12.2536V11.6663C21.6222 11.6663 20.9393 11.4492 20.3632 11.0718C20.8753 11.6592 21.5688 12.0863 22.3584 12.2536Z"
        fill="#25F4EE"
      />
      <path
        d="M20.3631 11.0718C19.8012 10.4276 19.4633 9.58754 19.4633 8.66919H18.7592C18.9405 9.67297 19.538 10.5344 20.3631 11.0718Z"
        fill="#FE2C55"
      />
      <path
        d="M13.8475 16.2616C12.6276 16.2616 11.6354 17.2547 11.6354 18.4756C11.6354 19.3264 12.1191 20.0667 12.8232 20.4369C12.5601 20.0738 12.4036 19.6289 12.4036 19.1448C12.4036 17.9239 13.3958 16.9308 14.6158 16.9308C14.8434 16.9308 15.0638 16.9699 15.2701 17.034V14.343C15.0567 14.3145 14.8398 14.2967 14.6158 14.2967C14.5766 14.2967 14.541 14.3003 14.5019 14.3003V16.3648C14.2921 16.3007 14.0751 16.2616 13.8475 16.2616Z"
        fill="#FE2C55"
      />
      <path
        d="M22.3582 12.2536V14.3003C20.9925 14.3003 19.7264 13.8625 18.695 13.1221V18.4792C18.695 21.1524 16.522 23.3308 13.8475 23.3308C12.8161 23.3308 11.8558 23.0033 11.0698 22.4516C11.9554 23.402 13.218 24 14.6157 24C17.2866 24 19.4632 21.8251 19.4632 19.1484V13.7913C20.4946 14.5317 21.7607 14.9695 23.1264 14.9695V12.3355C22.8596 12.3355 22.6036 12.307 22.3582 12.2536Z"
        fill="#FE2C55"
      />
      <path
        d="M18.695 18.4792V13.1221C19.7264 13.8625 20.9925 14.3003 22.3582 14.3003V12.2536C21.5687 12.0863 20.8751 11.6592 20.363 11.0718C19.5379 10.5344 18.944 9.67297 18.7554 8.66919H16.8278L16.8243 19.2302C16.7816 20.412 15.8071 21.3624 14.6157 21.3624C13.8759 21.3624 13.2251 20.9958 12.8196 20.4405C12.1155 20.0667 11.6318 19.3299 11.6318 18.4792C11.6318 17.2583 12.624 16.2652 13.8439 16.2652C14.0715 16.2652 14.292 16.3043 14.4983 16.3684V14.3039C11.8807 14.3608 9.76816 16.5108 9.76816 19.1484C9.76816 20.4227 10.2625 21.5831 11.0698 22.4516C11.8558 23.0033 12.8161 23.3308 13.8475 23.3308C16.5184 23.3308 18.695 21.1524 18.695 18.4792Z"
        fill="white"
      />
    </svg>
  );
};
