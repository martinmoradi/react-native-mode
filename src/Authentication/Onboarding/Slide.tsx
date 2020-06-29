import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
export const SLIDER_HEIGHT = height * 0.61;

const styles = StyleSheet.create({
  container: {
    width,
  },
  title: {
    fontFamily: "SFProText-Bold",
    fontSize: 80,
    lineHeight: 80,
    color: "white",
    textAlign: "center",
  },
});

interface SlideProps {
  label: string;
  right?: boolean;
}

const Slide = ({ label, right }: SlideProps) => {
  const transform = [
    { translateX: -height / 4 },
    { rotate: right ? "-90deg" : "90deg" },
    { translateX: right ? -height / 4 : height / 4 },
    { translateY: right ? width - 80 - 24 : 0 },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          width: SLIDER_HEIGHT,
          transform,
        }}
      >
        <Text style={styles.title}>{label}</Text>
      </View>
    </View>
  );
};

export default Slide;
