import type { AnatomyPart } from "../types"

type AnatomyTableProps = {
    parts: AnatomyPart[]
}

/** The parts a component is made of, and what each one does. */
export function AnatomyTable({ parts }: AnatomyTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl ring-1 ring-separator/60">
            <table className="w-full border-collapse text-left text-subheadline">
                <thead className="bg-fill/50 text-footnote text-label-secondary">
                    <tr>
                        <th className="w-36 px-4 py-3 font-semibold">
                            Element
                        </th>
                        <th className="px-4 py-3 font-semibold">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {parts.map((part) => (
                        <tr
                            key={part.element}
                            className="border-separator/60 border-t align-top"
                        >
                            <td className="px-4 py-3 font-semibold text-label">
                                {part.element}
                            </td>
                            <td className="px-4 py-3 text-label-secondary">
                                {part.required && (
                                    <strong className="text-label">
                                        Required.{" "}
                                    </strong>
                                )}
                                {part.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
