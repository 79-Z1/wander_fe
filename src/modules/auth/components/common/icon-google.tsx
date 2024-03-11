import React, {FC} from 'react';

import {IComponentBaseProps} from '@/common/interfaces';

type IIconGoogleProps = IComponentBaseProps;

const IconGoogle: FC<IIconGoogleProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <g clipPath="url(#clip0_4853_61376)">
        <path
          d="M24.5163 12.2764C24.5163 11.4607 24.4501 10.6406 24.309 9.83807H12.9902V14.4591H19.472C19.203 15.9494 18.3388 17.2678 17.0733 18.1056V21.1039H20.9403C23.2111 19.0139 24.5163 15.9274 24.5163 12.2764Z"
          fill="#4285F4"
        />
        <path
          d="M12.9901 24.0008C16.2266 24.0008 18.9559 22.9382 20.9445 21.1039L17.0776 18.1055C16.0017 18.8375 14.6127 19.252 12.9945 19.252C9.86388 19.252 7.20946 17.1399 6.25705 14.3003H2.2666V17.3912C4.30371 21.4434 8.4529 24.0008 12.9901 24.0008Z"
          fill="#34A853"
        />
        <path
          d="M6.25277 14.3003C5.75011 12.8099 5.75011 11.1961 6.25277 9.70575V6.61481H2.26674C0.564734 10.0056 0.564734 14.0004 2.26674 17.3912L6.25277 14.3003Z"
          fill="#FBBC04"
        />
        <path
          d="M12.9901 4.74966C14.7009 4.7232 16.3544 5.36697 17.5934 6.54867L21.0195 3.12262C18.8501 1.0855 15.9708 -0.034466 12.9901 0.000808666C8.4529 0.000808666 4.30371 2.55822 2.2666 6.61481L6.25264 9.70575C7.20064 6.86173 9.85947 4.74966 12.9901 4.74966Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_4853_61376">
          <rect width="24" height="24" fill="white" transform="translate(0.75)" />
        </clipPath>
      </defs>
    </svg>
  );
};

IconGoogle.displayName = 'IconGoogle';

export default IconGoogle;
