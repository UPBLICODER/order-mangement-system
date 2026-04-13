import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

export const statusConfig = [
  {
    key: "pending",
    label: "Pending",
    icon: Clock,
    textColor: "text-yellow-400",
    bg: "bg-yellow-500/10",
    bar: "bg-yellow-400",
  },
  {
    key: "in_progress",
    label: "In Progress",
    icon: Package,
    textColor: "text-blue-400",
    bg: "bg-blue-500/10",
    bar: "bg-blue-400",
    highlight: true,
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle,
    textColor: "text-green-400",
    bg: "bg-green-500/10",
    bar: "bg-green-400",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    textColor: "text-red-400",
    bg: "bg-red-500/10",
    bar: "bg-red-400",
  },
];
