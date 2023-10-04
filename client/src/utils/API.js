const { useMutation, useQuery } = ('@apollo/client');
import { ADD_USER, LOGIN_USER, SAVE_BOOK, REMOVE_BOOK } from './mutations'; // Import GraphQL queries and mutations
import { GET_ME } from './queries'

// Use the Apollo Client hooks for queries and mutations
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};


export {ADD_USER, LOGIN_USER, SAVE_BOOK, REMOVE_BOOK, GET_ME, useMutation, useQuery}
