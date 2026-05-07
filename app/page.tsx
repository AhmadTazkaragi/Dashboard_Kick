import Image from "next/image";
import DashboardLayout from "./dashboard/layout";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
