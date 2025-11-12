import type { Route } from "./+types/home";
import { Main } from "../main/main";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Derek's React Code Challenge" },
  ];
}

export default function Home() {
  return <Main />;
}
