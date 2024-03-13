import React, {FC, ReactNode} from 'react';

import {siteConfigs} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

type HtmlProps = IComponentBaseProps & {
  children?: ReactNode;
  locale?: string;
};

const Html: FC<HtmlProps> = ({children, locale = siteConfigs.language}) => {
  return (
    <html className="scrollbar h-full" lang={locale}>
      {children}
    </html>
  );
};

export default Html;
