import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { ChatPage } from "./components/ChatPage";
import { ChatDetail } from "./components/ChatDetail";
import { MarketPage } from "./components/MarketPage";
import { HistoryPage } from "./components/HistoryPage";
import { ProfilePage } from "./components/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "chat", Component: ChatPage },
      { path: "chat/:id", Component: ChatDetail },
      { path: "market", Component: MarketPage },
      { path: "history", Component: HistoryPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
