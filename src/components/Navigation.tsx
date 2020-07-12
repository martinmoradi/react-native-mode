import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type Routes = {
  Onboarding: undefined;
  Welcome: undefined;
};

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}
