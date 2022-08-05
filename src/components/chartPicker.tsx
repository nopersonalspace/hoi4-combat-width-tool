import React, { useState, useEffect } from "react";
import { Tabs, NativeSelect } from "@mantine/core";

export const ChartPicker: React.FC = () => {
  const [tabs, setTabs] = useState(["tab-1"]);
  const [activeTab, setActiveTab] = useState<string | null>("first");

  useEffect(() => {
    const newTab = `tab-${tabs.length + 1}`;
    if (activeTab === "plus") {
      setTabs(tabs.concat([newTab]));
      setActiveTab(newTab);
    }
  }, [activeTab]);

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab value={tab}>
            {tab}
            <button
              onClick={() => {
                var index = tabs.indexOf(tab);
                if (index !== -1) {
                  tabs.splice(index, 1);
                }
                setActiveTab(tabs[0]);
              }}
            >
              x
            </button>
          </Tabs.Tab>
        ))}

        <Tabs.Tab value="plus">+</Tabs.Tab>
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel value={tab}>Page for {tab}</Tabs.Panel>
      ))}
    </Tabs>
  );
};
