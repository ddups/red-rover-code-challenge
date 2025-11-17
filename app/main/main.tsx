import { Form } from "./form";
import { HierarchyDisplay } from "./hierarchy";
import { useState } from "react";

export function Main() {
  const [defaultHierarchy, setDefaultHierarchy] = useState<string[]>([]);
  const [alphaHierarchy, setAlphaHierarchy] = useState<string[]>([]);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="text-6xl flex flex-col items-center gap-9">
          React Code Challenge
        </header>

        <div className="max-w-[800px] w-full space-y-6 px-4">
          <Form
            onParseDefault={(hierarchy) => setDefaultHierarchy(hierarchy)}
            onParseAlpha={(hierarchy) => setAlphaHierarchy(hierarchy)}
          />
          <div className="flex gap-4 min-h-0">
            <HierarchyDisplay
              title="Default Hierarchy"
              data={defaultHierarchy}
              onClear={() => setDefaultHierarchy([])}
            />
            <HierarchyDisplay
              title="Alphabetical Hierarchy"
              data={alphaHierarchy}
              onClear={() => setAlphaHierarchy([])}
            />
          </div>
        </div>
      </div>
    </main>
  );
}