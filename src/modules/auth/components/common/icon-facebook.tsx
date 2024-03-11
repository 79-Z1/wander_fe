import React, {FC} from 'react';

import {IComponentBaseProps} from '@/common/interfaces';

type IconFacebookProps = IComponentBaseProps;

const IconFacebook: FC<IconFacebookProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <g clipPath="url(#clip0_4853_61373)">
        <path
          d="M24.25 12C24.25 5.37258 18.8774 0 12.25 0C5.62258 0 0.25 5.37258 0.25 12C0.25 17.9895 4.6382 22.954 10.375 23.8542V15.4688H7.32812V12H10.375V9.35625C10.375 6.34875 12.1666 4.6875 14.9076 4.6875C16.2201 4.6875 17.5938 4.92188 17.5938 4.92188V7.875H16.0806C14.59 7.875 14.125 8.80008 14.125 9.75V12H17.4531L16.9211 15.4688H14.125V23.8542C19.8618 22.954 24.25 17.9895 24.25 12Z"
          fill="#1877F2"
        />
        <path
          d="M16.9211 15.4688L17.4531 12H14.125V9.75C14.125 8.80102 14.59 7.875 16.0806 7.875H17.5938V4.92188C17.5938 4.92188 16.2205 4.6875 14.9076 4.6875C12.1666 4.6875 10.375 6.34875 10.375 9.35625V12H7.32812V15.4688H10.375V23.8542C11.6174 24.0486 12.8826 24.0486 14.125 23.8542V15.4688H16.9211Z"
          fill="#F9FAFB"
        />
      </g>
      <defs>
        <clipPath id="clip0_4853_61373">
          <rect width="24" height="24" fill="white" transform="translate(0.25)" />
        </clipPath>
      </defs>
    </svg>
  );
};

IconFacebook.displayName = 'IconFacebook';

export default IconFacebook;
