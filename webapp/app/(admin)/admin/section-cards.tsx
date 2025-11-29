import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormatCurrency } from "@/hooks/format-currency";

interface StatData {
  value: number;
  percentChange: number;
}

async function getData(): Promise<StatData[]> {
  const urls = ["revenue", "new-customer", "account-active", "grow-percent"];

  const res = await Promise.all(
    urls.map(async (endpoint) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/statistics/${endpoint}`,
      );
      return res.json();
    }),
  );
  return res;
}

export async function SectionCards() {
  const [revenue, newCustomer, accountActive, growPercent] = await getData();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng Doanh Thu</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {FormatCurrency(revenue.value)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {revenue.percentChange >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {revenue.percentChange >= 0 ? "+" : ""}
              {revenue.percentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Khách Hàng Mới</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {newCustomer.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {newCustomer.percentChange >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {newCustomer.percentChange >= 0 ? "+" : ""}
              {newCustomer.percentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tài Khoản Hoạt Động</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {accountActive.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {accountActive.percentChange >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {accountActive.percentChange >= 0 ? "+" : ""}
              {accountActive.percentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tỷ Lệ Tăng Trưởng</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {growPercent.value}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {growPercent.percentChange >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {growPercent.percentChange >= 0 ? "+" : ""}
              {growPercent.percentChange}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
