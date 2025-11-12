export function HierarchyDisplay({ title, data, onClear }: { title: string; data: string[]; onClear: (data: string[]) => void }) {
    return (
        <div className="flex-1 flex flex-col items-center gap-8 min-h-0 rounded-3xl border border-gray-200 p-6">
            <h2 className="text-2xl">{title}</h2>
            <button
                className="rounded-md border border-gray-200 px-4"
                onClick={clear()}>Clear Hierarchy
            </button>
            <div className="w-80 p-4 rounded-md border border-gray-200">
                <ul>
                    {data.map((item, index) => (
                        <li
                            style={{ whiteSpace: "pre-wrap" }}
                            key={index}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    function clear() {
        return () => {
            console.log("Clearing hierarchy display");
            onClear([]);
        };
    }
}