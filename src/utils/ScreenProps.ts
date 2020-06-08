import {StackNavigationProp} from '@react-navigation/stack';
import {
  RouteProp,
  ParamListBase,
  CompositeNavigationProp,
} from '@react-navigation/native';

export interface ScreenNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export interface NestedScreenNavigationProp<
  RootParamList extends ParamListBase,
  ParamList extends ParamListBase,
  RouteName extends string
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ParamList, RouteName>,
    StackNavigationProp<RootParamList>
  >;
  route: RouteProp<ParamList, RouteName>;
}
