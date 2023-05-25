import { Context } from "../../contexts/Context";
import { useContext } from "react";
import * as C from "./styles";

type PropsType = {
  label: string;
  value: string;
};

export function InfoItem({ label, value }: PropsType) {
  const { state, dispatch } = useContext(Context);

  return (
    <C.Container>
      <C.Label theme={state.theme.theme}>{label}</C.Label>
      <C.Value theme={state.theme.theme}>{value}</C.Value>
    </C.Container>
  );
}
