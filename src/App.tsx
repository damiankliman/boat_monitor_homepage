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
  return (
    <>
      <HeaderContainer>
        <h1>B IS FOR BOAT MONITOR</h1>
      </HeaderContainer>
      <MainContainer>
        {BOATS_TO_DISPLAY.map((boat, index) => (
          <BoatMonitor key={`monitor_${boat.name}_${index}`} boat={boat} />
        ))}
      </MainContainer>
    </>
  );
}

export default App;
