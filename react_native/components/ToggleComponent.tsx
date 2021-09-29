import * as React from "react";
import { Switch } from "react-native-paper";

export const ToggleComponent = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState<boolean>(true);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Switch
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
      color="#E2C792"
      style={{ marginLeft: "auto" }}
    />
  );
};
