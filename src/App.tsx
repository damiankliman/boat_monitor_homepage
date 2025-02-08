import { HeaderContainer, MainContainer } from "./styles";
import BoatMonitor from "./components/BoatMonitor";

const BOATS_TO_DISPLAY = [
  {
    name: "Riva",
    thingSpeakChannelId: 2605389,
    monitors: [
      {
        title: "Battery Voltage",
        key: "Voltage",
        unitPostfix: "v",
      },
      {
        title: "Temperature",
        key: "Temperature",
        unitPostfix: "°F",
      },
    ],
  },
];

function App() {
  // const { data } = useThingSpeakData(2605389, "2025-02-08T07:40:25Z");

  return (
    <>
      <HeaderContainer>
        <h1>B IS FOR BOAT MONITOR</h1>
      </HeaderContainer>
      <MainContainer>
        {BOATS_TO_DISPLAY.map((boat) => (
          <BoatMonitor boat={boat} />
        ))}
      </MainContainer>
    </>
  );
}

export default App;
