// __mocks__/@gorhom/bottom-sheet.js
import React from "react";
import { View } from "react-native";

const BottomSheet = React.forwardRef(({ children }, ref) => {
  return <View ref={ref}>{children}</View>;
});

export const BottomSheetView = ({ children, testID, ...props }) => {
  return <View {...props} testID={testID}>{children}</View>;
};

export default BottomSheet;