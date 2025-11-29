"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import type { User } from "./columns";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

export default function User() {
  const { accessToken } = useUser();
  const [data, setData] = useState<User[]>([]);

  async function getData(): Promise<User[]> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/get-all`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      setData(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, [accessToken]);

  return (
    <>
      <div className="container mx-auto py-10">
        <Button variant="ghost" onClick={() => getData()}>
          Tải lại
        </Button>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
