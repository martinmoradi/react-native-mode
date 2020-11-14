import React, { ReactNode, useCallback, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Transition,
  Transitioning,
  TransitioningView,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme, Box, RoundedIconButton, Text } from "../../components";
import { aspectRatio } from "../../components/Theme";

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
}

const { width } = Dimensions.get("window");
const finalDestination = width;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const transition = (
  <Transition.Together>
    <Transition.Out type="fade" />
    <Transition.In type="fade" />
  </Transition.Together>
);

const SwipeableRow = ({ children, onDelete }: SwipeableRowProps) => {
  const ref = useRef<TransitioningView>(null);
  const deleteItem = useCallback(() => {
    ref.current?.animateNextTransition();
    onDelete();
  }, [onDelete]);
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<{ x: number }>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: true,
        },
        () => {
          if (dest === finalDestination) {
            deleteItem();
          }
        }
      );
    },
  });
  const style = useAnimatedStyle(() => ({
    backgroundColor: theme.colors.background,
    transform: [{ translateX: translateX.value }],
  }));
  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));
  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));
  return (
    <Transitioning.View ref={ref} transition={transition}>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.danger, theme.colors.background]}
          start={[0, 0.5]}
          end={[1, 0.5]}
        />

        <Box
          justifyContent="space-evenly"
          width={editWidth}
          alignItems="center"
          flex={1}
        >
          <Text color="background" variant="header">
            Delete
          </Text>
        </Box>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, editStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.edit, theme.colors.background]}
          start={[1, 0.5]}
          end={[0.7, 0.5]}
        />
        <Box
          justifyContent="space-evenly"
          width={editWidth}
          alignSelf="flex-end"
          alignItems="center"
          flex={1}
        >
          <RoundedIconButton
            onPress={() => true}
            name="plus"
            size={24}
            color="background"
            backgroundColor="primary"
          />
          <RoundedIconButton
            onPress={() => true}
            name="minus"
            size={24}
            color="background"
            backgroundColor="danger"
          />
        </Box>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </Transitioning.View>
  );
};

export default SwipeableRow;
