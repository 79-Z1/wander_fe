import {FC, useCallback, useEffect, useState, useTransition} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import classNames from 'classnames';

import {Button, Icon} from '@/core-ui';

import {sidebarMenuItems} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

interface ISideBarNavigation extends IComponentBaseProps {
  isExpand: boolean;
}

const SideBarNavigation: FC<ISideBarNavigation> = ({isExpand = true, className, ...rest}) => {
  const router = useRouter();
  const path = usePathname();
  const [isPending, startTransition] = useTransition();
  const [activePath, setActivePath] = useState<string | null>(null);

  const handleSidebarItemClick = useCallback(
    (item: any) => {
      if (item.path) {
        startTransition(() => {
          router.push(item.path);
          setActivePath(item.path);
        });
      }
    },
    [router]
  );

  useEffect(() => {
    setActivePath(path);
  }, [path, isPending]);

  return (
    <div className={classNames('sidebar-nav space-y-4', className)} data-testid="sidebar-navigation" {...rest}>
      <div className={`flex flex-col justify-center gap-y-3 ${isExpand ? '' : 'items-center'}`}>
        {sidebarMenuItems.map((item, idx) => {
          const isActive = activePath?.includes(item.path);
          return (
            <div
              key={idx}
              className="flex w-full flex-col items-center justify-center gap-4 transition-all duration-500"
            >
              <Button
                className={classNames(
                  'flex w-full cursor-pointer items-center rounded-lg p-2 font-medium text-gray-400',
                  {
                    'bg-orange-500 !text-[#fcfcfc] hover:bg-orange-700': isActive,
                    'bg-transparent': !isActive,
                    'justify-between': isExpand,
                    'justify-center': !isExpand
                  }
                )}
                variant="default"
                onClick={() => handleSidebarItemClick(item)}
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon name={`ico-${item.icon}`} />
                  <span
                    className={classNames('whitespace-nowrap transition-all duration-200', {
                      block: isExpand,
                      hidden: !isExpand
                    })}
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
