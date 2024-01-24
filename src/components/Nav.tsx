import { MagnifyingGlass, X } from '@phosphor-icons/react'
import logo from '../images/icon.png'

const Nav = () => {
  // Variables with descriptive names
  const navContainerStyles =
    'w-full bg-white flex h-[57px] shadow-md items-center'
  const logoContainerStyles = 'gap-7 flex ms-4 items-center'
  const logoImageStyles = 'w-[36.31px] h-[36.31px]'
  const logoTextStyles = 'flex items-center text-lg gap-4'
  const searchInputContainerStyles =
    'flex items-center flex-1 lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem]'
  const searchInputStyles = 'flex-1 outline-none p-2'
  const buttonContainerStyles = 'flex items-center flex-1 justify-end me-3'

  return (
    <nav className={navContainerStyles}>
      <div className={logoContainerStyles}>
        <div className={logoTextStyles}>
          <img src={logo} className={logoImageStyles} alt="Logo" />
          <span>CoreNotes</span>
        </div>
        <div className={searchInputContainerStyles}>
          <input
            type="text"
            className={searchInputStyles}
            placeholder="Search notes"
          />
          <button>
            <MagnifyingGlass size={20} color="#9E9E9E" />
          </button>
        </div>
      </div>
      <div className={buttonContainerStyles}>
        <button>
          <X size={20} />
        </button>
      </div>
    </nav>
  )
}

export default Nav
