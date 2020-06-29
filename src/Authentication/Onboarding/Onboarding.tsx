import React from "react";
import { View, Dimensions, StyleSheet, processColor } from "react-native";
import { useValue, onScrollEvent, interpolateColor } from "react-native-redash";
import Animated from "react-native-reanimated";

import Slide, { SLIDER_HEIGHT } from "./Slide";

const { width } = Dimensions.get("window");
const BORDER_RADIUS = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  slider: {
    height: SLIDER_HEIGHT,
    backgroundColor: "white",
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

const slides = [
  { label: "Relaxed", color: "#BFEAF5" },
  { label: "Playful", color: "#BEECC4" },
  { label: "Excentric", color: "#FFE4D9" },
  { label: "Funky", color: "#FFDDDD" },
];

const Onboarding = () => {
  const x = useValue(0);
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  const onScroll = onScrollEvent({ x });
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.View
          style={[
            styles.scrollView,
            {
              backgroundColor,
            },
          ]}
        >
          <Animated.ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            decelerationRate="fast"
            horizontal
            scrollEventThrottle={1}
            {...{ onScroll }}
          >
            {slides.map(({ label }, i) => (
              <Slide key={label} label={label} right={!(i % 2)} />
            ))}
          </Animated.ScrollView>
        </Animated.View>
      </View>
      <Animated.View style={{ flex: 1, backgroundColor }}>
        <View style={styles.footer} />
      </Animated.View>
    </View>
  );
};

export default Onboarding;
