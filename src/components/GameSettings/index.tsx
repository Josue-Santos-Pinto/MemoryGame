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
  return (
    <C.Container onClick={onClick} active={active}>
      <C.Label active={active}>{data?.name}</C.Label>
    </C.Container>
  );
}
