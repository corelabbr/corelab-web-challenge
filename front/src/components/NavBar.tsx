import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

import logo from '../assets/logo.png';
import '../styles/navbar.scss';

import { useForm } from 'react-hook-form';

import { ISearch } from '../types/Search';
import { schemaGeneric } from '../middlewares/schemaGeneric';
import { useDispatch } from 'react-redux';
import { setSearch } from '../features/params';

const Navbar = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<ISearch>({
    resolver: yupResolver(schemaGeneric),
  });

  const onSubmit = (data: ISearch) => {
    const customParam = `color=${data.search}&&title=${data.search}`;
    dispatch(setSearch(customParam));
  };

  return (
    <header
      className="w-100 d-flex bg-white position-relative"
      style={{
        height: '50px',
      }}
    >
      <nav
        className="w-100 navbar navbar-light bg-light d-flex position-fixed"
        style={{
          zIndex: 9,
        }}
      >
        <div className="d-flex align-items-center w-75 mx-2">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              className="mx-4"
              src={logo}
              alt="Icon"
              width="30"
              height="30"
            />
            <span className="ml-2">CoreNotes</span>
          </a>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-none d-md-flex form-search w-50 d-flex align-items-center mx-4"
          >
            <input
              className="w-100"
              placeholder="Pesquisar notas"
              aria-label="Search"
              {...register('search')}
            />
            <button
              className="bg-transparent border-0 my-2 my-sm-0 border-0"
              type="submit"
            >
              <FaSearch size={20} fill="#979797" />
            </button>
          </form>
        </div>
        <IoMdClose
          size={25}
          title="Limpar busca"
          className="d-none d-md-flex mx-2"
          onClick={() => {
            dispatch(setSearch(''));
            reset();
          }}
        />
      </nav>
    </header>
  );
};

export default Navbar;
