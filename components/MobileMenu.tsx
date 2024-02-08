import React, { useEffect, useRef } from 'react';

interface MobileMenuProps {
  visible?: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, toggleMobileMenu }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        toggleMobileMenu();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMobileMenu]);

  if (!visible) return null;

  return (
    <div
      className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex"
      ref={wrapperRef}
    >
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">Series</div>
        <div className="px-3 text-center text-white hover:underline">Films</div>
        <div className="px-3 text-center text-white hover:underline">New & Popular</div>
        <div className="px-3 text-center text-white hover:underline">My List</div>
        <div className="px-3 text-center text-white hover:underline">Browse by Languages</div>
      </div>
    </div>
  );
};

export default MobileMenu;
