// pages
import Home from "./pages/Home/Home";
import ControlPanel from "./pages/ControlPanel/ControlPanel";
import Board from "./pages/Board/Board";

// other
import { FC } from "react";

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: Home,
  },
  {
    key: "control-panel-route",
    title: "Control Panel",
    path: "/control-panel",
    enabled: true,
    component: ControlPanel,
  },
  {
    key: "board-route",
    title: "Board",
    path: "/board",
    enabled: true,
    component: Board,
  },
];
