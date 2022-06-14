/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {useMutation, useLazyQuery, useReactiveVar} from '@apollo/client';
import {
  SEND_CREATE_CARD,
  SEND_LOG_IN_WITH_EMAIL,
} from './src/graphql/mutations';
import {token, cards} from './src/reactiveVariables/index';
import {Card} from './src/components/card';
import {GET_CARDS} from './src/graphql/queries';
import {colors} from './src/colors';
import {Header} from './src/components/header';

const App: () => Node = () => {
  const [getCards, {data: cardsData, error: cardsError}] = useLazyQuery(
    GET_CARDS,
    {fetchPolicy: 'no-cache'},
  );

  const [login, {error: loginError, data: loginData}] = useMutation(
    SEND_LOG_IN_WITH_EMAIL,
    {
      variables: {
        email: 'user@email.com',
        password: 'bestPassword',
      },
    },
  );

  const [createCard, {error: createCardError, data: createCardData}] =
    useMutation(SEND_CREATE_CARD);

  const tokenVar = useReactiveVar(token);
  const cardsVar = useReactiveVar(cards);

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    if (loginData) {
      token(loginData.loginWithEmail.accessToken);
    }
  }, [loginData]);

  useEffect(() => {
    if (tokenVar) {
      getCards();
    }
  }, [tokenVar]);

  useEffect(() => {
    cards(cardsData?.cards);
  }, [cardsData]);

  const mockedData = {
    name: 'My Food Style',
    minPrice: null,
    maxPrice: null,
    locationTypeIds: [],
    locationCuisineTypeIds: [],
    dishTypeIds: [],
    courseTypeIds: [],
    dietIds: [],
    excludedIngredientIds: [],
  };

  const createCardFunc = async data => {
    if (tokenVar) {
      await createCard({
        variables: {
          name: data.name,
          minPrice: data.minPrice,
          maxPrice: data.maxPrice,
          locationTypeIds: data.locationTypeIds,
          locationCuisineTypeIds: data.locationCuisineTypeIds,
          dishTypeIds: data.dishTypeIds,
          courseTypeIds: data.courseTypeIds,
          dietIds: data.dietIds,
          excludedIngredientIds: data.excludedIngredientIds,
        },
      });
    }
    await getCards();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.srollStyle}>
        {cardsVar?.map(item => (
          <Card text={item.name} id={item.id} />
        ))}
      </ScrollView>
      <Pressable
        style={styles.addItem}
        onPress={() => createCardFunc(mockedData)}>
        <Image source={require('./src/images/add.png')} />
        <Text style={styles.addItemText}>New Food Style</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  srollStyle: {
    paddingHorizontal: 18,
    marginTop: -70,
  },
  addItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 6,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18,
    paddingRight: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 6,
    shadowColor: colors.GREYISH_40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
    marginLeft: 18,
    marginRight: 18,
  },
  addItemText: {
    fontFamily: 'ProximaNovaA-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.GREYISH_BROWN,
  },
});

export default App;
