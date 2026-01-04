"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconHomeFilled,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconTruckDelivery,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  navMain: [
    { title: "Dashboard", url: "/", icon: IconDashboard },
    { title: "Sản phẩm", url: "/admin/product", icon: IconListDetails },
    { title: "Người dùng", url: "/admin/user", icon: IconChartBar },
    { title: "Nhà hàng", url: "/admin/restaurant", icon: IconHomeFilled },
    { title: "Đơn hàng", url: "/admin/order", icon: IconTruckDelivery },
  ],

  navSecondary: [
    {
      title: "Cài Đặt",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Trợ Giúp",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Tìm Kiếm",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">U Food</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
