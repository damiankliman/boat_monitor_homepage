import { FC } from "react";
import {
  BoatMonitorContainer,
  ChartsContainer,
  ChartsHeaderContainer,
} from "./styles";
import { createChartDataFromKey } from "@/helpers/chartData";
import BoatChart from "@/components/BoatChart";
// import { useThingSpeakData } from "@/hooks/useThingSpeakData";

const EXAMPLE_API_RESPONSE = {
  channel: {
    id: 2605389,
    name: "Riva Battery \u0026 Temp Monitor",
    description: "Reading Voltage From Battery and Temperature",
    latitude: "0.0",
    longitude: "0.0",
    field1: "Voltage",
    field2: "Temperature",
    created_at: "2024-07-23T03:24:39Z",
    updated_at: "2025-01-31T03:22:28Z",
    last_entry_id: 17642,
  },
  feeds: [
    {
      created_at: "2025-02-08T07:40:25Z",
      entry_id: 17565,
      field1: "13.49",
      field2: "39.99",
    },
    {
      created_at: "2025-02-08T07:50:32Z",
      entry_id: 17566,
      field1: "13.47",
      field2: "39.88",
    },
    {
      created_at: "2025-02-08T08:00:40Z",
      entry_id: 17567,
      field1: "13.45",
      field2: "39.76",
    },
    {
      created_at: "2025-02-08T08:10:47Z",
      entry_id: 17568,
      field1: "13.44",
      field2: "39.65",
    },
    {
      created_at: "2025-02-08T08:20:54Z",
      entry_id: 17569,
      field1: "13.44",
      field2: "39.54",
    },
    {
      created_at: "2025-02-08T08:31:01Z",
      entry_id: 17570,
      field1: "13.44",
      field2: "39.54",
    },
    {
      created_at: "2025-02-08T08:41:08Z",
      entry_id: 17571,
      field1: "13.44",
      field2: "39.54",
    },
    {
      created_at: "2025-02-08T08:51:16Z",
      entry_id: 17572,
      field1: "13.44",
      field2: "39.42",
    },
    {
      created_at: "2025-02-08T09:01:23Z",
      entry_id: 17573,
      field1: "13.44",
      field2: "39.42",
    },
    {
      created_at: "2025-02-08T09:11:30Z",
      entry_id: 17574,
      field1: "13.44",
      field2: "39.42",
    },
    {
      created_at: "2025-02-08T09:21:37Z",
      entry_id: 17575,
      field1: "13.44",
      field2: "39.54",
    },
    {
      created_at: "2025-02-08T09:31:45Z",
      entry_id: 17576,
      field1: "13.44",
      field2: "39.42",
    },
    {
      created_at: "2025-02-08T09:41:52Z",
      entry_id: 17577,
      field1: "13.44",
      field2: "39.31",
    },
    {
      created_at: "2025-02-08T09:52:00Z",
      entry_id: 17578,
      field1: "13.44",
      field2: "39.20",
    },
    {
      created_at: "2025-02-08T10:02:07Z",
      entry_id: 17579,
      field1: "13.44",
      field2: "38.97",
    },
    {
      created_at: "2025-02-08T10:12:14Z",
      entry_id: 17580,
      field1: "13.44",
      field2: "38.75",
    },
    {
      created_at: "2025-02-08T10:22:21Z",
      entry_id: 17581,
      field1: "13.44",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T10:32:29Z",
      entry_id: 17582,
      field1: "13.44",
      field2: "38.75",
    },
    {
      created_at: "2025-02-08T10:42:36Z",
      entry_id: 17583,
      field1: "13.44",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T10:52:43Z",
      entry_id: 17584,
      field1: "13.44",
      field2: "38.75",
    },
    {
      created_at: "2025-02-08T11:02:50Z",
      entry_id: 17585,
      field1: "13.44",
      field2: "38.75",
    },
    {
      created_at: "2025-02-08T11:12:57Z",
      entry_id: 17586,
      field1: "13.44",
      field2: "38.53",
    },
    {
      created_at: "2025-02-08T11:23:04Z",
      entry_id: 17587,
      field1: "13.44",
      field2: "38.75",
    },
    {
      created_at: "2025-02-08T11:33:12Z",
      entry_id: 17588,
      field1: "14.20",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T11:43:19Z",
      entry_id: 17589,
      field1: "13.44",
      field2: "38.19",
    },
    {
      created_at: "2025-02-08T11:53:26Z",
      entry_id: 17590,
      field1: "13.52",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T12:03:33Z",
      entry_id: 17591,
      field1: "13.49",
      field2: "38.53",
    },
    {
      created_at: "2025-02-08T12:13:41Z",
      entry_id: 17592,
      field1: "13.48",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T12:23:48Z",
      entry_id: 17593,
      field1: "13.46",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T12:33:56Z",
      entry_id: 17594,
      field1: "13.44",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T12:44:03Z",
      entry_id: 17595,
      field1: "13.44",
      field2: "38.53",
    },
    {
      created_at: "2025-02-08T12:54:10Z",
      entry_id: 17596,
      field1: "13.44",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T13:04:17Z",
      entry_id: 17597,
      field1: "13.44",
      field2: "38.30",
    },
    {
      created_at: "2025-02-08T13:14:25Z",
      entry_id: 17598,
      field1: "13.44",
      field2: "38.08",
    },
    {
      created_at: "2025-02-08T13:24:32Z",
      entry_id: 17599,
      field1: "13.44",
      field2: "38.08",
    },
    {
      created_at: "2025-02-08T13:34:39Z",
      entry_id: 17600,
      field1: "13.44",
      field2: "38.19",
    },
    {
      created_at: "2025-02-08T13:44:46Z",
      entry_id: 17601,
      field1: "13.44",
      field2: "38.08",
    },
    {
      created_at: "2025-02-08T13:54:53Z",
      entry_id: 17602,
      field1: "13.44",
      field2: "38.19",
    },
    {
      created_at: "2025-02-08T14:05:00Z",
      entry_id: 17603,
      field1: "13.44",
      field2: "38.30",
    },
    {
      created_at: "2025-02-08T14:15:08Z",
      entry_id: 17604,
      field1: "13.44",
      field2: "38.08",
    },
    {
      created_at: "2025-02-08T14:25:15Z",
      entry_id: 17605,
      field1: "13.44",
      field2: "38.08",
    },
    {
      created_at: "2025-02-08T14:35:22Z",
      entry_id: 17606,
      field1: "13.44",
      field2: "38.19",
    },
    {
      created_at: "2025-02-08T14:45:29Z",
      entry_id: 17607,
      field1: "13.44",
      field2: "38.08",
    },
    {
      created_at: "2025-02-08T14:55:36Z",
      entry_id: 17608,
      field1: "13.44",
      field2: "38.19",
    },
    {
      created_at: "2025-02-08T15:05:44Z",
      entry_id: 17609,
      field1: "13.44",
      field2: "38.19",
    },
    {
      created_at: "2025-02-08T15:15:51Z",
      entry_id: 17610,
      field1: "13.44",
      field2: "38.30",
    },
    {
      created_at: "2025-02-08T15:25:58Z",
      entry_id: 17611,
      field1: "13.44",
      field2: "38.30",
    },
    {
      created_at: "2025-02-08T15:36:05Z",
      entry_id: 17612,
      field1: "13.44",
      field2: "38.30",
    },
    {
      created_at: "2025-02-08T15:46:12Z",
      entry_id: 17613,
      field1: "13.44",
      field2: "38.19",
    },
    {
      created_at: "2025-02-08T15:56:20Z",
      entry_id: 17614,
      field1: "13.44",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T16:06:27Z",
      entry_id: 17615,
      field1: "13.44",
      field2: "38.30",
    },
    {
      created_at: "2025-02-08T16:16:35Z",
      entry_id: 17616,
      field1: "13.51",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T16:26:42Z",
      entry_id: 17617,
      field1: "13.49",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T16:36:49Z",
      entry_id: 17618,
      field1: "13.47",
      field2: "38.30",
    },
    {
      created_at: "2025-02-08T16:46:56Z",
      entry_id: 17619,
      field1: "13.45",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T16:57:04Z",
      entry_id: 17620,
      field1: "13.44",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T17:07:11Z",
      entry_id: 17621,
      field1: "13.44",
      field2: "38.53",
    },
    {
      created_at: "2025-02-08T17:17:18Z",
      entry_id: 17622,
      field1: "13.44",
      field2: "38.53",
    },
    {
      created_at: "2025-02-08T17:27:25Z",
      entry_id: 17623,
      field1: "13.44",
      field2: "38.41",
    },
    {
      created_at: "2025-02-08T17:37:33Z",
      entry_id: 17624,
      field1: "13.44",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T17:47:40Z",
      entry_id: 17625,
      field1: "13.44",
      field2: "38.53",
    },
    {
      created_at: "2025-02-08T17:57:47Z",
      entry_id: 17626,
      field1: "13.44",
      field2: "38.64",
    },
    {
      created_at: "2025-02-08T18:07:54Z",
      entry_id: 17627,
      field1: "13.44",
      field2: "38.75",
    },
    {
      created_at: "2025-02-08T18:18:02Z",
      entry_id: 17628,
      field1: "13.44",
      field2: "38.86",
    },
    {
      created_at: "2025-02-08T18:28:09Z",
      entry_id: 17629,
      field1: "13.44",
      field2: "38.97",
    },
    {
      created_at: "2025-02-08T18:38:16Z",
      entry_id: 17630,
      field1: "13.44",
      field2: "39.31",
    },
    {
      created_at: "2025-02-08T18:48:24Z",
      entry_id: 17631,
      field1: "13.44",
      field2: "39.31",
    },
    {
      created_at: "2025-02-08T18:58:31Z",
      entry_id: 17632,
      field1: "13.44",
      field2: "39.42",
    },
    {
      created_at: "2025-02-08T19:08:38Z",
      entry_id: 17633,
      field1: "13.44",
      field2: "39.65",
    },
    {
      created_at: "2025-02-08T19:18:45Z",
      entry_id: 17634,
      field1: "13.44",
      field2: "39.76",
    },
    {
      created_at: "2025-02-08T19:28:52Z",
      entry_id: 17635,
      field1: "13.44",
      field2: "39.76",
    },
    {
      created_at: "2025-02-08T19:39:00Z",
      entry_id: 17636,
      field1: "13.44",
      field2: "39.65",
    },
    {
      created_at: "2025-02-08T19:49:07Z",
      entry_id: 17637,
      field1: "13.44",
      field2: "40.10",
    },
    {
      created_at: "2025-02-08T19:59:15Z",
      entry_id: 17638,
      field1: "13.44",
      field2: "40.10",
    },
    {
      created_at: "2025-02-08T20:09:22Z",
      entry_id: 17639,
      field1: "13.44",
      field2: "40.21",
    },
    {
      created_at: "2025-02-08T20:19:29Z",
      entry_id: 17640,
      field1: "13.52",
      field2: "39.99",
    },
    {
      created_at: "2025-02-08T20:29:37Z",
      entry_id: 17641,
      field1: "13.49",
      field2: "40.10",
    },
    {
      created_at: "2025-02-08T20:39:44Z",
      entry_id: 17642,
      field1: "13.48",
      field2: "40.33",
    },
  ],
};

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

const BoatMonitor: FC<BoatMonitorProps> = ({ boat }) => {
  const { name, thingSpeakChannelId, monitors } = boat;

  return (
    <BoatMonitorContainer>
      <ChartsHeaderContainer>
        <h2>{name} Monitor</h2>
        <div>range dropdown</div>
      </ChartsHeaderContainer>
      <ChartsContainer>
        {monitors.map(({ title, key, unitPostfix }) => {
          const chartData = createChartDataFromKey(EXAMPLE_API_RESPONSE, key);
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
