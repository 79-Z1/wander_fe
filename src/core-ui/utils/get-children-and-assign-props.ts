import React, {ReactNode} from 'react';

export function getChildrenAddAssignProps(children: ReactNode, props: object) {
  const childrenArray = React.Children.toArray(children);

  const childrenItem = childrenArray.map(child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {...child.props, ...props});
    }

    return null;
  });

  return childrenItem;
}
