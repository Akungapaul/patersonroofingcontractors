/**
 * Calculate read time from HTML content.
 * Strips HTML tags, counts words, assumes 250 words per minute.
 */
export function calculateReadTime(htmlContent: string): number {
  const text = htmlContent.replace(/<[^>]*>/g, '')
  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.ceil(wordCount / 250)
}

/**
 * Calculate total read time for a guide by combining all section and subsection content.
 */
export function calculateGuideReadTime(
  sections: readonly {
    contentHtml: string
    subsections?: readonly { contentHtml: string }[]
  }[]
): number {
  const totalHtml = sections
    .map((s) => {
      let html = s.contentHtml
      if (s.subsections) {
        html += s.subsections.map((sub) => sub.contentHtml).join('')
      }
      return html
    })
    .join('')
  return calculateReadTime(totalHtml)
}
