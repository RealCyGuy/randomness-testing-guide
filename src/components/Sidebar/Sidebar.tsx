"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileHeader } from "@/src/components/Sidebar/MobileHeader/MobileHeader";
import { SidebarContents } from "@/src/components/Sidebar/SidebarContents/SidebarContents";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAppendixOpen, setIsAppendixOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleAppendix = () => setIsAppendixOpen(!isAppendixOpen);

  return (
    <>
      <MobileHeader
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 top-[57px]"
          onClick={closeMenu}
        />
      )}
      <SidebarContents
        pathname={pathname}
        isOpen={isOpen}
        closeMenu={closeMenu}
        isAppendixOpen={isAppendixOpen}
        toggleAppendix={toggleAppendix}
      />
    </>
  );
}
