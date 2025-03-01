import { FC, useEffect, useState } from "react";
import { DATA_UPDATE_INTERVAL } from "@/constants";
import {
  BoatMonitorContainer,
  ChartsContainer,
  ChartsFooterContainer,
  ChartsHeaderContainer,
  StyledButton,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { createChartDataFromKey } from "@/helpers/chartData";
import { getOffsetDate } from "@/helpers/date";
import { useThingSpeakData } from "@/hooks/useThingSpeakData";
import BoatChart from "@/components/BoatChart";
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
  const [dataStartTime, setDataStartTime] = useState<Date | null>(null);
  const [queryAttempt, setQueryAttempt] = useState(0);

  const { dataQuery, lastEntryQuery } = useThingSpeakData(
    thingSpeakChannelId,
    dataStartTime?.toISOString()
  );

  const {
    isPending: dataQueryIsPending,
    isFetching: dataQueryIsFetching,
    data,
    refetch: refetchData,
  } = dataQuery;

  const {
    isPending: lastEntryQueryIsPending,
    isFetching: lastEntryQueryIsFetching,
    data: lastEntryData,
  } = lastEntryQuery;

  useEffect(() => {
    // Initial setup from last entry query
    if (lastEntryData && !dataStartTime) {
      const lastFeedDate = new Date(lastEntryData.created_at);
      const queryStartTime = getOffsetDate(
        lastFeedDate,
        Number(DATE_RANGE_OPTIONS_MAP[selectedDateRange].value)
      );
      setDataStartTime(queryStartTime);
    }
  }, [lastEntryData, selectedDateRange, dataStartTime]);

  useEffect(() => {
    // Set up next query based on full data response
    if (data?.feeds?.length) {
      const lastFeedDate = new Date(
        data.feeds[data.feeds.length - 1].created_at
      );
      const nextQueryTime = new Date(
        lastFeedDate.getTime() + DATA_UPDATE_INTERVAL
      );
      const delay = nextQueryTime.getTime() - Date.now();

      // If next query time is in the past, fall back to standard interval
      const actualDelay = delay > 0 ? delay : DATA_UPDATE_INTERVAL;

      const queryStartTime = getOffsetDate(
        lastFeedDate,
        Number(DATE_RANGE_OPTIONS_MAP[selectedDateRange].value)
      );

      const timeout = setTimeout(() => {
        // Only call refetch if the start time hasn't changed
        if (dataStartTime?.getTime() === queryStartTime.getTime()) {
          refetchData();
          setQueryAttempt((prev) => prev + 1);
        } else {
          setDataStartTime(queryStartTime);
        }
      }, actualDelay);

      return () => clearTimeout(timeout);
    }
  }, [data, selectedDateRange, dataStartTime, refetchData, queryAttempt]);

  const getLastUpdateDate = () => {
    const lastFeed = data?.feeds[data.feeds.length - 1];

    if (!lastFeed) {
      return null;
    }

    return new Date(lastFeed?.created_at).toLocaleString();
  };

  const handleDateRangeChange = (value: DATE_RANGE_OPTIONS) => {
    if (data?.feeds?.length) {
      const lastFeedDate = new Date(
        data.feeds[data.feeds.length - 1].created_at
      );
      const queryStartTime = getOffsetDate(
        lastFeedDate,
        Number(DATE_RANGE_OPTIONS_MAP[value].value)
      );
      setDataStartTime(queryStartTime);
    }
    setSelectedDateRange(value);
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
          onSelect={handleDateRangeChange}
        >
          <StyledButton>
            {DATE_RANGE_OPTIONS_MAP[selectedDateRange].label}
            <FontAwesomeIcon icon={faChevronDown} />
          </StyledButton>
        </Dropdown>
      </ChartsHeaderContainer>
      <ChartsContainer>
        {monitors.map(({ title, key, unitPostfix }, index) => {
          const chartData = createChartDataFromKey(key, data);
          return (
            <BoatChart
              key={`chart_${key}_${index}`}
              title={title}
              data={chartData}
              isPending={dataQueryIsPending || lastEntryQueryIsPending}
              isFetching={dataQueryIsFetching || lastEntryQueryIsFetching}
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
