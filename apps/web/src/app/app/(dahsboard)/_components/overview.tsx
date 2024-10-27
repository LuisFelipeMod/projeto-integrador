import { Card, CardBody } from "@nextui-org/react";
import { DollarSign, User, ShoppingBag, Activity } from "lucide-react";

export function OverviewTab() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <Card>
          <CardBody className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Total Revenue</h2>
              <DollarSign className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold">$45,231.89</p>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </CardBody>
        </Card>

        {/* Subscriptions Card */}
        <Card>
          <CardBody className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Subscriptions</h2>
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold">+2350</p>
            <p className="text-xs text-gray-500">+180.1% from last month</p>
          </CardBody>
        </Card>

        {/* Sales Card */}
        <Card>
          <CardBody className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Sales</h2>
              <ShoppingBag className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold">+12,234</p>
            <p className="text-xs text-gray-500">+19% from last month</p>
          </CardBody>
        </Card>

        {/* Active Now Card */}
        <Card>
          <CardBody className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Active Now</h2>
              <Activity className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold">+573</p>
            <p className="text-xs text-gray-500">+201 since last hour</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
