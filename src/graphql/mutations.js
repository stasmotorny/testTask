import {gql} from '@apollo/client';

export const SIGN_UP_WITH_EMAIL = gql`
  mutation signUpWithEmail(
    $name: NonEmptyString!
    $email: EmailAddress!
    $password: Password!
  ) {
    signUpWithEmail(name: $name, email: $email, password: $password) {
      user {
        id
        email
        name
        facebookId
        googleId
        appleId
      }
      accessToken
      refreshToken
    }
  }
`;

export const SEND_LOG_IN_WITH_EMAIL = gql`
  mutation sendLogInWithEmail(
    $email: EmailAddress!
    $password: NonEmptyString!
  ) {
    loginWithEmail(email: $email, password: $password) {
      user {
        id
        email
        name
        facebookId
        googleId
        appleId
      }
      accessToken
      refreshToken
    }
  }
`;

export const SEND_CREATE_CARD = gql`
  mutation sendCreateCard(
    $name: NonEmptyString!
    $minPrice: Int
    $maxPrice: Int
    $locationTypeIds: [ID!]!
    $locationCuisineTypeIds: [ID!]!
    $dishTypeIds: [ID!]!
    $courseTypeIds: [ID!]!
    $dietIds: [ID!]!
    $excludedIngredientIds: [ID!]!
  ) {
    createCard(
      data: {
        name: $name
        minPrice: $minPrice
        maxPrice: $maxPrice
        locationTypeIds: $locationTypeIds
        locationCuisineTypeIds: $locationCuisineTypeIds
        dishTypeIds: $dishTypeIds
        courseTypeIds: $courseTypeIds
        dietIds: $dietIds
        excludedIngredientIds: $excludedIngredientIds
      }
    ) {
      id
      name
    }
  }
`;

export const SEND_SHARE_CARD = gql`
  mutation sendShareCard($id: ID!) {
    shareCard(id: $id)
  }
`;

export const SEND_DUPLICATE_CARD = gql`
  mutation sendDuplicateCard($id: ID!) {
    duplicateCard(id: $id) {
      id
      name
    }
  }
`;

export const SEND_DELETE_CARD = gql`
  mutation sendDeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;
