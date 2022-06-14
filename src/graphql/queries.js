import {gql} from '@apollo/client';

export const GET_CARDS = gql`
  query getCards {
    cards {
      id
      name
    }
  }
`;
