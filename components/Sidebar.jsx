import React, { useState } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';

const Sidebar = ({ expand, setexpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  return (
    <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}>
      <div>
        <div className={`flex items-center ${expand ? 'flex-row gap-10' : 'flex-col gap-8'}`}>
          {/* Logo */}
          <Image
            className={expand ? "w-40" : "w-10"}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt={expand ? "Logo Text" : "Logo Icon"}
          />

          {/* Toggle Button */}
          <div
            onClick={() => setexpand(!expand)}
            className='group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'
            role="button"
            tabIndex={0}
            aria-expanded={expand}
          >
            <Image
              src={assets.menu_icon}
              alt='Menu icon'
              className='md:hidden'
            />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt='Sidebar toggle icon'
              className='hidden md:block w-7'
            />

            {/* Tooltip */}
            <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap'>
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div className='w-3 h-3 absolute bg-black rotate-45 left-1/2 -top-1.5 -translate-x-1/2'></div>
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          type="button"
          className={`mt-8 ${expand ? "flex items-center justify-center bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max" : "group relative flex items-center justify-center h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"}`}
        >
          <Image
            className={expand ? 'w-10' : 'w-10'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt='Chat icon'
          />
          {!expand && (
            <div className='absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none'>
              New Chat
              <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
            </div>
          )}
          {expand && <p className='text-white font-medium'>New Chat</p>}
        </button>

        {/* Recents */}
        <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
          <p className='my-1'>Recents</p>
          <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        </div>
      </div>

      {/* QR Section with Button and Profile */}
      <div className="pb-4">
        {expand && (
          <div className="mt-6 text-center">
            {/* Get App Button */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleQR}
                className="flex items-center justify-start gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-all duration-300 shadow-md"
              >
                <Image src={assets.phone_icon} alt='Phone Icon' className="w-6 h-6" />
                Get App
              </button>

              {/* QR Code on Click */}
              {showQR && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-[18rem] w-60 rounded-xl backdrop-blur-md bg-[#1e1e1ed9] p-4 shadow-2xl border border-white/10 z-50">
                  <Image
                    src={assets.qrcode}
                    alt='QR Code'
                    className='w-full h-auto rounded'
                  />
                  <p className="text-white text-sm mt-3">Scan to get ThinkChat App</p>
                </div>
              )}
            </div>

            {/* Profile Icon + Text side by side */}
            <div
              onClick={() => {
                if (!user) openSignIn();
              }}
              className="mt-3 flex items-center justify-left gap-2 cursor-pointer"
            >
              {user ? (
                <UserButton />
              ) : (
                <Image
                  src={assets.profile_icon}
                  alt="Profile Icon"
                  className="w-10 h-10 rounded-full border border-white/20 hover:scale-105 transition-transform duration-300"
                />
              )}
              <p className="text-white text-sm font-medium">My Profile</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
