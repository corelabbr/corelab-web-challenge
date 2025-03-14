import { MagnifyingGlass, X } from '@phosphor-icons/react'
import logo from '../assets/images/icon.png'
import { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'
import './Nav.css'

const Nav = () => {
    const { search, setSearch } = useContext(TaskContext)

    return (
        <nav className='nav-container'>
            <div className='nav-left-elements'>
                <div className='nav-log-elements'>
                    <img src={logo} className='nav-logo-icon' alt='Logo' />
                    <span className='nav-text'>CoreNotes</span>
                </div>
                <div className='search-container'>
                    <input
                        type='text'
                        className='search-input'
                        placeholder='Pesquisar notas'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button>
                        <MagnifyingGlass className='search-icon' />
                    </button>
                </div>
            </div>
            <div className='nav-close-icon'>
                <button>
                    <X className='nav-button-close-icon' />
                </button>
            </div>
        </nav>
    )
}

export default Nav
