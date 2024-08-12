/* eslint-disable import/no-anonymous-default-export */

import { getCookie } from "cookies-next";

import axiosClient from "@/lib/axios";

import { Note } from "../../@types/note";

export default () => {
  return {
    fetchNotes: async (userId: string) => {
      const response = await axiosClient.request({
        url: `/notes?user_id=${userId}`,
        method: "GET",
        headers: {
          user_id: getCookie("user_id"),
        },
      });
      return response.data;
    },
    createNote: async (note: Note) => {
      const response = await axiosClient.request({
        url: "/notes",
        method: "POST",
        data: note,
        headers: {
          user_id: getCookie("user_id"),
        },
      });
      return response.data;
    },
    updateNote: async (note: Note) => {
      const response = await axiosClient.request({
        url: `/notes/${note.id}`,
        method: "PUT",
        data: note,
        headers: {
          user_id: getCookie("user_id"),
        },
      });
      return response.data;
    },
    deleteNote: async (note: Note) => {
      const response = await axiosClient.request({
        url: `/notes/${note.id}`,
        method: "DELETE",
        headers: {
          user_id: getCookie("user_id"),
        },
      });
      return response;
    },
    searchNote: async (query: string) => {
      const response = await axiosClient.request({
        url: `/notes/search?q=${query}`,
        method: "GET",
        headers: {
          user_id: getCookie("user_id"),
        },
      });
      return response.data;
    },
    createUser: async () => {
      const response = await axiosClient.request({
        url: "/users",
        method: "POST",
      });
      return response.data.data;
    },
  };
};
