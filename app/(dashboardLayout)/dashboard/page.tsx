import { ArrowUpRight, Users, ShoppingCart, DollarSign, ShoppingBag } from "lucide-react";

const stats = [
  {
    title: "Total Sales",
    value: "$24,560",
    change: "+12.5%",
    icon: DollarSign,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "New Users",
    value: "1,245",
    change: "+8.2%",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Products Sold",
    value: "500",
    change: "+6.1%",
    icon: ShoppingBag,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Orders",
    value: "320",
    change: "+4.1%",
    icon: ShoppingCart,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

export default function StatisticCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 m-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group  rounded-2xl border border-gray-200 p-6 
                       shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between md:w-64 md:h-32   xl:w-84 xl:h-32">
              <div>
                <p className="text-sm ">{stat.title}</p>
                <h3 className="text-2xl font-bold  mt-1">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl
                            ${stat.iconBg} ${stat.iconColor}
                            group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm font-semibold text-emerald-600">
                {stat.change}
              </span>
              <span className="text-sm text-gray-500">vs last month</span>

              <ArrowUpRight className="w-4 h-4 text-emerald-600 ml-auto" />
            </div>
          </div>
        );
      })}
    </div>
  );
}