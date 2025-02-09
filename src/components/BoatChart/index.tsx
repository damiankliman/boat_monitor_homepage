import { FC } from "react";
import Card from "@/components/Card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export type ChartData = {
  date: Date;
  value: number;
};

type BoatChartProps = {
  title: string;
  data: ChartData[];
  unitPostfix?: string;
};

const LINE_COLOR = "#df0505";

const BoatChart: FC<BoatChartProps> = ({ title, data, unitPostfix }) => {
  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            dataKey="value"
            stroke={LINE_COLOR}
            dot={{ stroke: LINE_COLOR, fill: LINE_COLOR }}
          />
          <CartesianGrid stroke="#ccc" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(value: Date) => value.toLocaleString()}
          />
          <YAxis unit={unitPostfix} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BoatChart;
