'use client';

import React from 'react';

import {Portal} from '@/core-ui';

const BodyInjector = () => {
  return (
    <>
      <Portal.Anchor />
      <div className="transform-gpu"></div>
    </>
  );
};

export default BodyInjector;
