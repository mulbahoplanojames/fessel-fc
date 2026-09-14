import React from "react";
import PlayerClient from "./player-client";
import { requireAdmin } from "@/lib/session";

const PlayerAdminPage = async () => {
  await requireAdmin();

  return <PlayerClient />;
};

export default PlayerAdminPage;
