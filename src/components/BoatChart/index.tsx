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
  dateFormatter?: (value: Date) => string;
};

const LINE_COLOR = "#df0505";

const BoatChart: FC<BoatChartProps> = ({
  title,
  data,
  unitPostfix,
  dateFormatter,
}) => {
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
          <XAxis dataKey="date" tickFormatter={dateFormatter} />
          <YAxis unit={unitPostfix} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BoatChart;
