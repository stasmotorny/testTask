import React, {useState} from 'react';
import {
  Text,
  View,
  Alert,
  Modal,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import {CardAction} from './cardAction';
import {colors} from '../colors';

export const Card = props => {
  const {text, id} = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <Modal
        style={styles.modal}
        presentationStyle={'overFullScreen'}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.textStyle} numberOfLines={2}>
              {text}
            </Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Image source={require('../images/close.png')} />
            </Pressable>
          </View>
          <CardAction
            text={'Share'}
            id={id}
            callback={() => setModalVisible(false)}
          />
          <CardAction
            text={'Duplicate'}
            id={id}
            callback={() => setModalVisible(false)}
          />
          <CardAction
            text={'Delete'}
            id={id}
            callback={() => setModalVisible(false)}
          />
        </View>
      </Modal>
      <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
        {text}
      </Text>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image source={require('../images/options.png')} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    paddingTop: 14,
    paddingBottom: 16,
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
  },
  textStyle: {
    width: '85%',
    fontFamily: 'ProximaNovaA-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    color: colors.GREYISH_BROWN,
  },
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
  modalContainer: {
    flex: 1,
    backgroundColor: colors.MODAL_BACKGROUND,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  modal: {
    flex: 1,
  },
});
