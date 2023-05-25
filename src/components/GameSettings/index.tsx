import { Context } from "../../contexts/Context";
import { useContext } from "react";
import * as C from "./styles";

type DataType = {
  id: number;
  name: string;
};

type GameSettingsProps = {
  data?: DataType;
  active: boolean;
  onClick: () => void;
};

export function GameSettings({ data, active, onClick }: GameSettingsProps) {
  const { state, dispatch } = useContext(Context);
  return (
    <C.Container theme={state.theme.theme} onClick={onClick} active={active}>
      <C.Label theme={state.theme.theme} active={active}>
        {data?.name}
      </C.Label>
    </C.Container>
  );
}
