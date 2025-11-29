"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import type { Product } from "./columns";
import { columns } from "./columns";

export default function Product() {
  const { accessToken } = useUser();
  const [data, setData] = useState<Product[]>([]);
  async function getData(accessToken: string): Promise<Product[]> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/get-all-admin`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      setData(data);
      return data;
    } catch (error) {
      console.error(error);
      setData([]);
      return [];
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await getData(accessToken!);
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" onClick={() => getData(accessToken!)}>
        Tải lại
      </Button>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
