import * as C from "./styles";

type PropsType = {
  label: string;
  value: string;
};

export function InfoItem({ label, value }: PropsType) {
  return (
    <C.Container>
      <C.Label>{label}</C.Label>
      <C.Value>{value}</C.Value>
    </C.Container>
  );
}
