"use client";

import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";

const TABS = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

export function ProfileTabs() {
  return (
    <div className="flex justify-between mt-4">
      <Tabs aria-label="Tabs variants" variant={"underlined"}>
        {TABS.map((tab) => (
          <Tab key={tab} title={tab} />
        ))}
      </Tabs>
    </div>
  );
}
