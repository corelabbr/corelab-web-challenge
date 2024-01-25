'use client';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleButtonClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleDocumentClick = React.useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        isMenuVisible &&
        target.closest('#user-dropdown') === null &&
        target.closest('#user-menu-button') === null
      ) {
        setIsMenuVisible(false);
      }
    },
    [isMenuVisible]
  );

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.refresh();
  }

  const getInitials = (fullName: string): string => {
    
    if (!fullName) {
      return 'User';
    }

    const nameParts = fullName.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';

    return `${firstInitial}${lastInitial}`;
  };

  return (
    <nav>
      <div className='md:h-48 flex items-start md:items-center justify-between mx-auto p-4'>
        <h1 className='text-2xl font-semibold whitespace-nowrap text-floralWhite'>
          To-Do`s
        </h1>

        <div className='relative flex flex-col items-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          {status !== 'loading' && (
            <button
              type='button'
              className='flex text-sm bg-softGray rounded-full md:me-0 focus:ring-4 focus:ring-floralWhite'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'
              onClick={handleButtonClick}
            >
              <div
                className='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-softGray
              rounded-full'
              >
                <span className='font-medium text-floralWhite'>
                  {getInitials(session?.user.name || '')}
                </span>
              </div>
            </button>
          )}

          <div
            className={`${
              isMenuVisible ? 'active' : 'hidden'
            } absolute top-7 z-50 my-4 text-base list-none bg-floralWhite divide-y divide-softGray rounded-lg overflow-hidden shadow`}
            id='user-dropdown'
          >
            <div className='px-4 py-3'>
              <span className='block text-sm'>{session?.user.name}</span>
              <span className='block text-sm  text-softGray truncate'>
                {session?.user.email}
              </span>
            </div>
            <ul aria-labelledby='user-menu-button'>
              <li>
                <button
                  onClick={() => logout()}
                  className='w-full px-4 py-2.5 text-sm text-left hover:text-floralWhite hover:bg-softGray'
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
