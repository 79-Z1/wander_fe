import {merge} from 'lodash-es';

const WEBSITE_NAME = 'Quay số may mắn';
const WEBSITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const COMPANY_NAME = 'ABC Software Solutions';
const COMPANY_URL = 'https://abcsoftwarecompany.com';
const COMPANY_SOCIAL = {
  facebook: 'https://www.facebook.com/abcsoftwaresolutionscompany',
  twitter: 'https://www.linkedin.com/company/abc-software-solutions-company'
};

const companyApps = [
  ...Object.values(COMPANY_SOCIAL),
  'https://voteuserstory.com',
  'https://sharetodolist.com',
  'https://pickonename.com'
];

const organizationDefault = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  founder: 'Khanh Mai',
  url: COMPANY_URL,
  logo: `${COMPANY_URL}/android-chrome-512x512.png`,
  image: `${COMPANY_URL}/og-abc.png`,
  description: 'Simple solutions for complex problems. Improve work performance every day for your company',
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
  datePublished: 'September 2022',
  url: WEBSITE_URL,
  sameAs: companyApps.filter(x => x !== WEBSITE_URL)
};

export const siteSettings = {
  name: WEBSITE_NAME,
  logo: `${WEBSITE_URL}/android-chrome-512x512.png`,
  cover: {url: `${WEBSITE_URL}/og-img.jpg`, width: 1200, height: 630, alt: WEBSITE_NAME},
  url: WEBSITE_URL,
  defaultLanguage: 'en',
  author: {
    name: `${COMPANY_NAME} Company`,
    websiteUrl: COMPANY_URL,
    email: 'hello@abcsoftwarecompany.com',
    socials: COMPANY_SOCIAL
  },
  description:
    'A free wheel spinner for a random name picker, free random spinner wheels to help make decisions. Enter choices and spin the wheel to decide a random result.',
  keyword:
    'pick one name, wheel of decide, lucky wheel, wheel of fortune, random spin wheel, abc software solutions, wheel of names, name picker',
  schemaJsonLd: {
    organization: merge(organizationDefault, {name: COMPANY_NAME}),
    website: merge(websiteDefault, {name: WEBSITE_NAME})
  }
};
