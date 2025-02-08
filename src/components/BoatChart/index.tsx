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

const BoatChart: FC<BoatChartProps> = ({ title, data, unitPostfix }) => {
  console.log(data);

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line dataKey="value" stroke="#ffffff" />
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
