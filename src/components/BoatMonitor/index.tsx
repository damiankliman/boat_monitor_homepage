import { FC, useEffect, useState } from "react";
import {
  BoatMonitorContainer,
  ChartsContainer,
  ChartsFooterContainer,
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

const UPDATE_INTERVAL = 11 * 60 * 1000;

enum DATE_RANGE_OPTIONS {
  LAST_24_HOURS = "1",
  LAST_7_DAYS = "7",
  LAST_30_DAYS = "30",
}

const DATE_RANGE_OPTIONS_MAP = {
  [DATE_RANGE_OPTIONS.LAST_24_HOURS]: {
    label: "Last 24 hours",
    value: DATE_RANGE_OPTIONS.LAST_24_HOURS,
    formatter: (value: Date) => value.toLocaleTimeString(),
  },
  [DATE_RANGE_OPTIONS.LAST_7_DAYS]: {
    label: "Last 7 days",
    value: DATE_RANGE_OPTIONS.LAST_7_DAYS,
    formatter: (value: Date) => value.toLocaleDateString(),
  },
  [DATE_RANGE_OPTIONS.LAST_30_DAYS]: {
    label: "Last 30 days",
    value: DATE_RANGE_OPTIONS.LAST_30_DAYS,
    formatter: (value: Date) => value.toLocaleDateString(),
  },
};

const BoatMonitor: FC<BoatMonitorProps> = ({ boat }) => {
  const { name, thingSpeakChannelId, monitors } = boat;
  const [selectedDateRange, setSelectedDateRange] = useState(
    DATE_RANGE_OPTIONS.LAST_24_HOURS
  );
  const [dataStartTime, setDataStartTime] = useState(() =>
    getOffsetDate(
      new Date(),
      Number(DATE_RANGE_OPTIONS_MAP[selectedDateRange].value)
    )
  );

  const { data, isPending } = useThingSpeakData(
    thingSpeakChannelId,
    dataStartTime.toISOString()
  );

  useEffect(() => {
    setDataStartTime(
      getOffsetDate(
        new Date(),
        Number(DATE_RANGE_OPTIONS_MAP[selectedDateRange].value)
      )
    );
  }, [selectedDateRange]);

  useEffect(() => {
    if (data?.feeds?.length) {
      const lastFeed = data.feeds[data.feeds.length - 1];
      const lastFeedDate = new Date(lastFeed.created_at);
      const nextQueryTime = new Date(lastFeedDate.getTime() + UPDATE_INTERVAL);
      const delay = nextQueryTime.getTime() - Date.now();

      const timeout = setTimeout(() => {
        setDataStartTime(
          getOffsetDate(
            nextQueryTime,
            Number(DATE_RANGE_OPTIONS_MAP[selectedDateRange].value)
          )
        );
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [data, selectedDateRange]);

  const getLastUpdateDate = () => {
    const lastFeed = data?.feeds[data.feeds.length - 1];

    if (!lastFeed) {
      return null;
    }

    return new Date(lastFeed?.created_at).toLocaleString();
  };

  return (
    <BoatMonitorContainer>
      <ChartsHeaderContainer>
        <h2>{name} Monitor</h2>
        <Dropdown
          options={Object.values(DATE_RANGE_OPTIONS_MAP).map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          selectedOption={selectedDateRange}
          onSelect={(value) => setSelectedDateRange(value)}
        >
          <Button>{DATE_RANGE_OPTIONS_MAP[selectedDateRange].label}</Button>
        </Dropdown>
      </ChartsHeaderContainer>
      <ChartsContainer>
        {monitors.map(({ title, key, unitPostfix }) => {
          const chartData = createChartDataFromKey(key, data);
          return (
            <BoatChart
              title={title}
              height={300}
              data={chartData}
              isPending={isPending}
              unitPostfix={unitPostfix}
              dateFormatter={
                DATE_RANGE_OPTIONS_MAP[selectedDateRange].formatter
              }
            />
          );
        })}
      </ChartsContainer>
      <ChartsFooterContainer>
        <p>Last update: {getLastUpdateDate() || "-"}</p>
      </ChartsFooterContainer>
    </BoatMonitorContainer>
  );
};

export default BoatMonitor;
