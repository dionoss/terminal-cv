"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { parseHtmlContent } from "@/lib/html-parser"

interface HtmlParserProps {
  htmlContent: string
}

export default function HtmlParser({ htmlContent }: HtmlParserProps) {
  const [content, setContent] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    setContent(parseHtmlContent(htmlContent))
  }, [htmlContent])

  if (!content) {
    return <div>Loading...</div>
  }

  return <>{content}</>
}
