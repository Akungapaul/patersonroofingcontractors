import { Lightbulb } from 'lucide-react'

interface ExpertTipsProps {
  tips: readonly string[]
}

export function ExpertTips({ tips }: ExpertTipsProps) {
  return (
    <div className="my-8 rounded-r-lg border-l-4 border-l-amber bg-amber/5 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-6 w-6 text-amber" aria-hidden="true" />
        <h3 className="font-heading text-2xl font-bold text-navy">
          Expert Tips
        </h3>
      </div>
      <ul className="list-disc pl-6 marker:text-amber">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="py-1 text-lg leading-relaxed text-gray-700"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}
