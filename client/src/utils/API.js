const { useMutation, useQuery } = ('@apollo/client');
import { ADD_USER, LOGIN_USER, SAVE_BOOK, REMOVE_BOOK } from './mutations'; // Import GraphQL queries and mutations
import { GET_ME } from './queries'

// Use the Apollo Client hooks for queries and mutations

export const useGetMe = () => {
  return useQuery(GET_ME);
};

export const useCreateUser = () => {
  return useMutation(ADD_USER);
};

export const useLoginUser = () => {
  return useMutation(LOGIN_USER);
};

export const useSaveBook = () => {
  return useMutation(SAVE_BOOK);
};

export const useDeleteBook = () => {
  return useMutation(REMOVE_BOOK);
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
