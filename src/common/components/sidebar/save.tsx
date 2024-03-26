// import {FC, useEffect, useState} from 'react';
// import {useSession} from 'next-auth/react';
// import classNames from 'classnames';
// import {useTranslations} from 'use-intl';
// import {ROUTES} from '@/common/configs/routes.config';

// import {Button, Collapse, Icon} from '@/core-ui';

// import {usePathname, useRouter} from '@/navigation';

// import {MENU_SLIDE_BAR} from '@/common/constants/home';

// import {IComponentBaseProps} from '@/common/interfaces';

// import Line from '../line';
// import TermsAndPrivacy from '../terms-and-privacy';

// interface ISideBarNavigation extends IComponentBaseProps {
//   isExpand: boolean;
// }

// const SideBarNavigation: FC<ISideBarNavigation> = ({isExpand = true, className, ...rest}) => {
//   const router = useRouter();
//   const path = usePathname();
//   const session = useSession();
//   const t = useTranslations();

//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [activePath, setActivePath] = useState<string | null>(null);

//   useEffect(() => {
//     setActivePath(path);
//   }, [path]);

//   return (
//     <div className={classNames('sidebar-nav space-y-4', className)} data-testid="sidebar-navigation" {...rest}>
//       <div className={`flex flex-col justify-center gap-y-2 ${isExpand ? '' : 'items-center'}`}>
//         {MENU_SLIDE_BAR.map((item, idx) => {
//           const isActiveParent = item.sub && item.sub.find(subItem => subItem.path === activePath);
//           const activeMenuBackground =
//             activePath === item.path || isActiveParent?.path === activePath
//               ? 'bg-violet-600 hover:bg-violet-800'
//               : 'bg-transparent';
//           const landingPage =
//             item.path === ROUTES.HOME && session.status === 'authenticated' && session.data.user.email;

//           return (
//             <div
//               key={idx}
//               className={`flex w-full flex-col items-center justify-center gap-4
//               ${item.isLogin && !session?.data?.user.email && 'hidden'}
//               ${landingPage && 'hidden'}
//               transition-all duration-500`}
//             >
//               <Button
//                 className={classNames(
//                   'flex w-full cursor-pointer items-center rounded-lg p-2 font-medium text-white',
//                   activeMenuBackground,
//                   isExpand ? 'justify-between' : 'justify-center'
//                 )}
//                 variant="default"
//                 onClick={() => {
//                   if (item.path) {
//                     router.push(item.path);
//                     setActivePath(item.path);
//                     setIsOpen(false);
//                   }
//                   if (item.sub?.[0].path) {
//                     setIsOpen(!isOpen);
//                     router.push(item.sub?.[0].path);
//                   }
//                 }}
//               >
//                 <div className="flex items-center justify-between gap-4">
//                   <Icon name={item.icon} size={20} />
//                   <span
//                     className={classNames(
//                       'whitespace-nowrap text-gray-50 transition-all duration-200',
//                       isExpand ? 'block' : 'hidden'
//                     )}
//                   >
//                     {t(item.title)}
//                   </span>
//                 </div>
//                 {isExpand && item?.sub && (
//                   <Icon name="ico-chevron-right" size={18} className={`${isOpen ? 'rotate-90' : 'rotate-0'}`} />
//                 )}
//               </Button>
//               {item?.sub &&
//                 item.sub?.map((subItem, subIdx) => {
//                   const activeSubText = activePath === subItem.path ? 'font-extrabold' : '';
//                   const activeSubIcon =
//                     activePath === subItem.path ? 'h-2 w-2 bg-violet-600 ml-0' : 'ml-0.5 h-1.5 w-1.5 bg-gray-50';

//                   return (
//                     <Collapse open={isExpand ? isOpen : false} key={subIdx} className="w-full">
//                       <Button
//                         className={`flex min-h-[20px] w-full cursor-pointer items-center
//                         justify-start rounded-lg py-0 pl-4 transition-all duration-300 ${activeSubText}`}
//                         variant="default"
//                         onClick={() => {
//                           if (subItem.path) {
//                             router.push(subItem.path);
//                           }
//                         }}
//                       >
//                         <div className={`rounded-full transition-all duration-300 ${activeSubIcon}`}></div>
//                         <span
//                           className={classNames(
//                             'whitespace-nowrap text-gray-50 transition-all duration-200',
//                             isExpand ? 'opacity-100' : 'opacity-0'
//                           )}
//                         >
//                           {t(subItem.title)}
//                         </span>
//                       </Button>
//                     </Collapse>
//                   );
//                 })}
//             </div>
//           );
//         })}
//       </div>
//       <Line className="my-4 border-gray-700" />
//       <TermsAndPrivacy isExpand={isExpand} />
//     </div>
//   );
// };

// export default SideBarNavigation;
