import type { ContentItem } from "@/data/cv-content"
import { terminalAppearance } from "@/data/appearance"

interface ContentRendererProps {
  content: ContentItem[]
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-2">
      {content.map((item, index) => {
        switch (item.type) {
          case "heading":
            return (
              <p key={index} className="font-bold" style={{ color: terminalAppearance.colors.sectionHeadings }}>
                {item.text}
              </p>
            )
          case "subheading":
            return (
              <p key={index} style={{ color: terminalAppearance.colors.sectionSubheadings }}>
                {item.text}
              </p>
            )
          case "paragraph":
            return <p key={index}>{item.text}</p>
          case "list":
            return (
              <ul key={index} className="list-disc list-inside">
                {item.items.map((listItem, listIndex) => (
                  <li key={`${index}-${listIndex}`}>{listItem}</li>
                ))}
              </ul>
            )
          case "keyValue":
            return (
              <p key={index}>
                {item.key}: {item.value}
              </p>
            )
          case "spacer":
            return <div key={index} className="h-2"></div>
          case "divider":
            return <hr key={index} className="border-t border-gray-700 my-2" />
          default:
            return null
        }
      })}
    </div>
  )
}
