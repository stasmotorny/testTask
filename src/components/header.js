import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../colors';

export const Header = () => {
  return (
    <LinearGradient
      colors={[colors.COLOR_GRADIENT_FROM, colors.COLOR_GRADIENT_TO]}
      style={styles.linearGradient}
      locations={[0, 0.5]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Image source={require('../images/logo.png')} />
      <LinearGradient
        colors={[
          colors.OPACITY_GRADIENT_FROM,
          colors.OPACITY_GRADIENT_FIRST_POINT,
          colors.OPACITY_GRADIENT_SECOND_POINT,
          colors.OPACITY_GRADIENT_TO,
        ]}
        style={styles.linearGradientInner}
        locations={[0, 0.5, 0.8, 0.9]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradientInner: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: -18,
  },
  linearGradient: {
    // flex: 1,
    height: 157,
    marginHorizontal: -18,
    paddingLeft: 36,
    paddingRight: 36,
    paddingTop: 10,
  },
});
