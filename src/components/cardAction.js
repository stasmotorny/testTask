import React from 'react';
import {Text, Alert, Share, Image, StyleSheet, Pressable} from 'react-native';
import {useMutation} from '@apollo/client';
import {
  SEND_SHARE_CARD,
  SEND_DUPLICATE_CARD,
  SEND_DELETE_CARD,
} from '../graphql/mutations';
import {cards} from '../reactiveVariables/index';
import {colors} from '../colors';

export const CardAction = props => {
  const {callback, id, text} = props;

  const [shareCard, {error: shareCardError, data: shareCardData}] = useMutation(
    SEND_SHARE_CARD,
    {
      variables: {
        id,
      },
    },
  );

  const [duplicateCard, {error: duplicateCardError, data: duplicateCardData}] =
    useMutation(SEND_DUPLICATE_CARD, {
      variables: {
        id,
      },
    });

  const [deleteCard, {error: deleteCardError, data: deleteCardData}] =
    useMutation(SEND_DELETE_CARD, {
      variables: {
        id,
      },
    });

  const shareMsg = async url => {
    const options = {
      title: 'Share',
      url: `https://cards.foodstyles.com/${url}`,
    };
    await Share.share(options);
  };

  const onSharePress = async () => {
    const link = await shareCard();
    await shareMsg(link?.data.shareCard);
  };

  const onDuplicatePress = async () => {
    const res = await duplicateCard();
    cards([...cards(), res?.data.duplicateCard]);
  };

  const onDeleteCard = async () => {
    const newCards = cards().filter(item => item.id !== id);
    cards(newCards);
    await deleteCard();
  };

  const onDeletePress = () => {
    Alert.alert(
      'Confirm delete',
      'This will delete the Food Style and all its settings.',
      [
        {
          text: 'Delete',
          onPress: () => onDeleteCard(),
          style: 'destructive',
          color: 'red',
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
    );
  };

  const action = async () => {
    if (text === 'Share') {
      await onSharePress();
    }
    if (text === 'Duplicate') {
      await onDuplicatePress();
      callback();
    }
    if (text === 'Delete') {
      onDeletePress();
      callback();
    }
  };

  const icon = () => {
    if (text === 'Share') {
      return <Image source={require('../images/share.png')} />;
    }
    if (text === 'Duplicate') {
      return <Image source={require('../images/duplicate.png')} />;
    }
    if (text === 'Delete') {
      return <Image source={require('../images/delete.png')} />;
    }
  };

  return (
    <Pressable style={styles.cardAction} onPress={action}>
      <Text style={styles.actionText}>{text}</Text>
      {icon()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'ProximaNovaA-Regular',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.GREEN_TEAL,
  },
});
