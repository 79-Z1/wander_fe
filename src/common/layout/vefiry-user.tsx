// 'use client';
// import {FC, useEffect, useState} from 'react';
// import {useSession} from 'next-auth/react';

// import UserApi from '@/modules/users/api/users.api';

// import {usePathname} from '@/navigation';

// import {IComponentBaseProps} from '@/common/interfaces/component.interface';

// type VerifyUserProps = IComponentBaseProps;

// const VerifyUser: FC<VerifyUserProps> = () => {
//   const pathName = usePathname();
//   const sessionState = useSession();

//   const [isBlockUpdated, setIsBlockUpdated] = useState(false);

//   useEffect(() => {
//     setIsBlockUpdated(false);
//   }, [pathName]);

//   useEffect(() => {
//     if (!isBlockUpdated && sessionState.status === 'authenticated') {
//       UserApi.verify()
//         .then(({data}) => sessionState.update(data.data))
//         .catch()
//         .finally(() => setIsBlockUpdated(true));
//     }
//   }, [sessionState, isBlockUpdated]);

//   return null;
// };

// export default VerifyUser;
