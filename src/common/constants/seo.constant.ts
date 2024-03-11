import {merge} from 'lodash-es';

export const WEBSITE_NAME = 'QuizNe';
export const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const WEBSITE_DESCRIPTION =
  'Elevate your learning experience with QuizNe - where education meets excitement. Join, create, and play interactive quizzes for an engaging journey of knowledge discovery!';
export const WEBSITE_SLOGAN = 'Your Knowledge Playground for Fun Learning';
export const COMPANY_NAME = 'ABC Software Solutions';
export const COMPANY_URL = 'https://abcsoftwarecompany.com';
export const COMPANY_SOCIAL = {
  facebook: 'https://www.facebook.com/abcsoftwaresolutionscompany',
  twitter: 'https://www.linkedin.com/company/abc-software-solutions-company'
};

const companyApps = [
  ...Object.values(COMPANY_SOCIAL),
  'https://voteuserstory.com',
  'https://pickonename.com',
  'https://todooy.com'
];

const organizationDefault = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  founder: 'Khanh Mai',
  url: COMPANY_URL,
  logo: `${COMPANY_URL}/android-chrome-512x512.png`,
  image: `${COMPANY_URL}/og-img.png`,
  description: '',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Vietnam',
    addressRegion: 'Khanh Hoa',
    addressLocality: 'Nha Trang',
    postalCode: '650000'
  }
};

const websiteDefault = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  datePublished: 'May 2023',
  url: WEBSITE_URL,
  sameAs: companyApps.filter(x => x !== WEBSITE_URL)
};

export const siteConfigs = {
  appName: WEBSITE_NAME,
  appSlogan: WEBSITE_SLOGAN,
  appNameSlogan: WEBSITE_NAME + ' | ' + WEBSITE_SLOGAN,
  companyName: COMPANY_NAME,
  logo: `${WEBSITE_URL}/android-chrome-512x512.png`,
  cover: {url: `${WEBSITE_URL}/og-img.jpg`, width: 1200, height: 680, alt: WEBSITE_NAME},
  url: WEBSITE_URL,
  language: 'vi',
  author: {
    name: COMPANY_NAME,
    websiteUrl: COMPANY_URL,
    email: 'hello@abcsoftwarecompany.com',
    socials: COMPANY_SOCIAL
  },
  description: WEBSITE_DESCRIPTION,
  keyword: 'react, next, vecel, template, boilerplate',
  schemaJsonLd: {
    organization: merge(organizationDefault, {name: COMPANY_NAME}),
    website: merge(websiteDefault, {name: WEBSITE_NAME})
  }
};
