"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-05-01", confirmed: 33 },
  { date: "2024-05-02", confirmed: 12 },
  { date: "2024-05-03", confirmed: 47 },
  { date: "2024-05-04", confirmed: 6 },
  { date: "2024-05-05", confirmed: 28 },
  { date: "2024-05-05", confirmed: 44 },
  { date: "2024-05-07", confirmed: 19 },
  { date: "2024-05-08", confirmed: 39 },
  { date: "2024-05-09", confirmed: 2 },
  { date: "2024-05-10", confirmed: 25 },
  { date: "2024-05-11", confirmed: 8 },
  { date: "2024-05-12", confirmed: 50 },
  { date: "2024-05-13", confirmed: 14 },
  { date: "2024-05-14", confirmed: 37 },
  { date: "2024-05-15", confirmed: 21 },
  { date: "2024-05-16", confirmed: 3 },
  { date: "2024-05-17", confirmed: 46 },
  { date: "2024-05-18", confirmed: 10 },
  { date: "2024-05-19", confirmed: 32 },
  { date: "2024-05-20", confirmed: 5 },
  { date: "2024-05-21", confirmed: 27 },
  { date: "2024-05-22", confirmed: 41 },
  { date: "2024-05-23", confirmed: 17 },
  { date: "2024-05-24", confirmed: 48 },
  { date: "2024-05-25", confirmed: 7 },
  { date: "2024-05-26", confirmed: 36 },
  { date: "2024-05-27", confirmed: 15 },
  { date: "2024-05-28", confirmed: 1 },
  { date: "2024-05-29", confirmed: 22 },
  { date: "2024-05-30", confirmed: 43 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  confirmed: {
    label: "Đã xác nhận",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("30d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-05-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Đơn hàng</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30d" className="rounded-lg">
              30 ngày qua
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              7 ngày qua
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-confirmed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-confirmed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("vi-VN", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="canceled"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-canceled)"
              stackId="a"
            />
            <Area
              dataKey="confirmed"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-confirmed)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
