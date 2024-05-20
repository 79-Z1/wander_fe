import {FC, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import classNames from 'classnames';

import {Button, Icon} from '@/core-ui';

import useGlobalState from '@/common/hooks/use-global-state';

import {sidebarMenuItems} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

interface ISideBarNavigation extends IComponentBaseProps {
  isExpand: boolean;
}

const SideBarNavigation: FC<ISideBarNavigation> = ({isExpand = true, className, ...rest}) => {
  const router = useRouter();
  const path = usePathname();
  const {setLoading} = useGlobalState();

  const [activePath, setActivePath] = useState<string | null>(null);

  function handleSidebarItemClick(item: any) {
    if (item.path) {
      router.push(item.path);
      setActivePath(item.path);
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }

  useEffect(() => {
    setActivePath(path);
  }, [path]);

  return (
    <div className={classNames('sidebar-nav space-y-4', className)} data-testid="sidebar-navigation" {...rest}>
      <div className={`flex flex-col justify-center gap-y-3 ${isExpand ? '' : 'items-center'}`}>
        {sidebarMenuItems.map((item, idx) => {
          const activeMenuBackground =
            activePath === item.path ? 'bg-orange-500 hover:bg-orange-700 !text-[#fcfcfc]' : 'bg-transparent';
          return (
            <div
              key={idx}
              className={`flex w-full flex-col items-center justify-center gap-4
              transition-all duration-500`}
            >
              {/* ${item.isLogin && !session?.data?.user.email && 'hidden'} */}
              <Button
                className={classNames(
                  'flex w-full cursor-pointer items-center rounded-lg p-2 font-medium text-gray-400',
                  activeMenuBackground,
                  isExpand ? 'justify-between' : 'justify-center'
                )}
                variant="default"
                onClick={() => handleSidebarItemClick(item)}
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon name={`ico-${item.icon}`} />
                  <span
                    className={classNames(
                      'whitespace-nowrap transition-all duration-200',
                      isExpand ? 'block' : 'hidden'
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarNavigation;
