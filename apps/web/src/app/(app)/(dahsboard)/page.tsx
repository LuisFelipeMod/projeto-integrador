"use client";

import { Button, Tabs, Tab, Tooltip } from "@nextui-org/react";
import { OverviewTab } from "./_components/overview";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Tooltip content="Em breve...">
          <Button isDisabled={true} color="primary">
            Download
          </Button>
        </Tooltip>
      </div>

      <Tabs aria-label="Dashboard Tabs" className="space-y-4">
        <Tab key="overview" title="Overview">
          <OverviewTab />
        </Tab>
      </Tabs>
    </div>
  );
}
