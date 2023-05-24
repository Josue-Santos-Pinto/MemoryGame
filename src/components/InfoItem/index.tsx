import * as C from "./styles";

type PropsType = {
  label: string;
  value: string;
  isDark?: boolean;
};

export function InfoItem({ label, value, isDark }: PropsType) {
  return (
    <C.Container>
      {isDark != null && (
        <>
          <C.Label isDark={isDark}>{label}</C.Label>
          <C.Value isDark={isDark}>{value}</C.Value>
        </>
      )}
    </C.Container>
  );
}
