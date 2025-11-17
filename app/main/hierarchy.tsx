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
                    {
                        // iterate over data and display each word
                        data.map((word, index) => (
                            <li
                                // this is gross but it preserves whitespace for display purposes
                                style={{ whiteSpace: "pre-wrap" }}
                                key={index}
                            >
                                {word}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );

    function clear() {
        return () => {
            onClear([]);
        };
    }
}