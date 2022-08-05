import { Tabs, NativeSelect } from "@mantine/core";
import React, { useState } from "react";

import reactLogo from "./assets/react.svg";
import { Chart, ChartPicker } from "./components";
import { calculateSingleModifier, useModifierTableData } from "./engine";

const App: React.FC = () => {
  const [flankingDirections, setFlankingDirections] = useState(1);

  const [data, loading] = useModifierTableData({
    flankingDirections,
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {loading && <p>loading</p>}
        {data && (
          <div style={{ maxWidth: "75%" }}>
            <Chart
              labels={Array.from(Array(50).keys()).map((key) => key + 1)}
              data={[
                {
                  label: "1 Flanking Direction",
                  data,
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ]}
            />
          </div>
        )}
        <NativeSelect
          label="Flanking Directions"
          data={["1", "2", "3"]}
          value={flankingDirections}
          onChange={(event) =>
            setFlankingDirections(parseInt(event.currentTarget.value))
          }
        ></NativeSelect>

        <ChartPicker />
      </div>
    </div>
  );
};

export default App;
