import { signOut } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
  toggleAccountMenu: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, toggleAccountMenu }) => {
  const { data: currentUser } = useCurrentUser();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        toggleAccountMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleAccountMenu]);

  if (!visible) return null;

  return (
    <div
      className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex"
      ref={wrapperRef}
    >
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
          <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </div>
    </div>
  );
};

export default AccountMenu;
