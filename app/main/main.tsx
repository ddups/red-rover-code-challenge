import { Form } from "./form";
import { HierarchyDisplay } from "./hierarchy";
import { useState } from "react";

export function Main() {
  const [hierarchy, setHierarchy] = useState<string[]>([]);

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="text-6xl flex flex-col items-center gap-9">
          React Code Challenge
        </header>

        <div className="max-w-[800px] w-full space-y-6 px-4">
          <Form onParse={(hierarchy) => setHierarchy(hierarchy)} />
          <HierarchyDisplay
            title="Hierarchy Display"
            data={hierarchy}
            onClear={() => setHierarchy([])}
          />
        </div>
      </div>
    </main>
  );
}