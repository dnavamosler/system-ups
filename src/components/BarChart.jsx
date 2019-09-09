import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000
//   },
//   {
//     name: "Page B",
//     uv: 3000
//   },
//   {
//     name: "Page C",
//     uv: 2000
//   },
//   {
//     name: "Page D",
//     uv: 2780
//   },
//   {
//     name: "Page E",
//     uv: 1890
//   },
//   {
//     name: "Page F",
//     uv: 2390
//   },
//   {
//     name: "Page G",
//     uv: 3490
//   }
// ];

const MyBarChart = ({ data, label = "" }) => {
  return (
    <BarChart
      width={400}
      height={270}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 15
      }}
    >
      <Legend
        iconType="diamond"
        wrapperStyle={{
          bottom: 0
        }}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />

      <Bar dataKey={label} fill="#82ca9d" />
    </BarChart>
  );
};
export default MyBarChart;
