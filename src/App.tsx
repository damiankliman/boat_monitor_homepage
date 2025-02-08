import { useThingSpeakData } from "@/hooks/useThingSpeakData";
import { HeaderContainer } from "./styles";

function App() {
  const { data } = useThingSpeakData(2605389, 10);
  console.log(data);

  return (
    <>
      <HeaderContainer>
        <h1>B IS FOR BOAT MONITOR</h1>
      </HeaderContainer>
    </>
  );
}

export default App;
