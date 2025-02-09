import { FC, useEffect, useState } from "react";
import {
  BoatMonitorContainer,
  ChartsContainer,
  ChartsHeaderContainer,
} from "./styles";
import { createChartDataFromKey } from "@/helpers/chartData";
import { getOffsetDate } from "@/helpers/date";
import { useThingSpeakData } from "@/hooks/useThingSpeakData";
import BoatChart from "@/components/BoatChart";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/Dropdown";

type Monitor = {
  title: string;
  key: string;
  unitPostfix: string;
};

type Boat = {
  name: string;
  thingSpeakChannelId: number;
  monitors: Monitor[];
};

type BoatMonitorProps = {
  boat: Boat;
};

const UPDATE_INTERVAL = 1000 * 60 * 10;

const DATE_RANGE_OPTIONS = [
  { label: "Last 24 hours", value: "1" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
];

const BoatMonitor: FC<BoatMonitorProps> = ({ boat }) => {
  const { name, thingSpeakChannelId, monitors } = boat;
  const [selectedDateRange, setSelectedDateRange] = useState(
    DATE_RANGE_OPTIONS[0]
  );
  const [queryTime, setQueryTime] = useState(() =>
    getOffsetDate(Number(DATE_RANGE_OPTIONS[0].value))
  );

  useEffect(() => {
    setQueryTime(getOffsetDate(Number(selectedDateRange.value)));
  }, [selectedDateRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueryTime(getOffsetDate(Number(selectedDateRange.value)));
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [selectedDateRange]);

  const { data } = useThingSpeakData(
    thingSpeakChannelId,
    queryTime.toISOString()
  );

  return (
    <BoatMonitorContainer>
      <ChartsHeaderContainer>
        <h2>{name} Monitor</h2>
        <Dropdown
          options={DATE_RANGE_OPTIONS}
          selectedOption={selectedDateRange}
          onSelect={setSelectedDateRange}
        >
          <Button>{selectedDateRange.label}</Button>
        </Dropdown>
      </ChartsHeaderContainer>
      <ChartsContainer>
        {monitors.map(({ title, key, unitPostfix }) => {
          const chartData = createChartDataFromKey(key, data);
          return (
            <BoatChart
              title={title}
              data={chartData}
              unitPostfix={unitPostfix}
            />
          );
        })}
      </ChartsContainer>
    </BoatMonitorContainer>
  );
};

export default BoatMonitor;
