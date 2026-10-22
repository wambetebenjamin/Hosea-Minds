'use client'

import type { JournalEntry } from './types'
import { averageMood, buildInsights, computeStreak } from './insights'
import { formatDate } from './utils'

interface ExportInput {
  displayName: string | null
  entries: JournalEntry[]
  days: number
}

/**
 * Builds a tracker summary PDF entirely in the browser. Nothing is uploaded,
 * which keeps the export consistent with the privacy promises on the site.
 */
export async function exportTrackerPdf({ displayName, entries, days }: ExportInput) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 48
  let cursor = 64

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor('#091E3E')
  doc.text('Hosea Minds tracker summary', margin, cursor)

  cursor += 22
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor('#4A5B71')
  doc.text(`Prepared for ${displayName || 'Anonymous member'}`, margin, cursor)
  cursor += 14
  doc.text(`Generated ${new Date().toLocaleDateString('en-GB')}, covering the last ${days} days`, margin, cursor)

  cursor += 28
  doc.setDrawColor('#DBEAF2')
  doc.line(margin, cursor, pageWidth - margin, cursor)

  cursor += 26
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor('#091E3E')
  doc.text('At a glance', margin, cursor)

  cursor += 18
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  const streak = computeStreak(entries)
  const mood = averageMood(entries)
  doc.text(`Entries recorded: ${entries.length}`, margin, cursor)
  cursor += 16
  doc.text(`Average mood: ${mood ? `${mood.toFixed(1)} out of 5` : 'not enough entries yet'}`, margin, cursor)
  cursor += 16
  doc.text(`Current journaling streak: ${streak} day${streak === 1 ? '' : 's'}`, margin, cursor)

  cursor += 26
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('What your entries show', margin, cursor)
  cursor += 18
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  for (const insight of buildInsights(entries, days)) {
    const lines = doc.splitTextToSize(`- ${insight}`, pageWidth - margin * 2)
    for (const line of lines) {
      ensureSpace(doc, cursor)
      doc.text(line, margin, cursor)
      cursor += 15
    }
    cursor += 4
  }

  cursor += 12
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  ensureSpace(doc, cursor)
  doc.text('Entry log', margin, cursor)
  cursor += 18
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))
  for (const entry of sorted) {
    cursor = ensureSpace(doc, cursor, 44)
    doc.setTextColor('#091E3E')
    doc.setFont('helvetica', 'bold')
    doc.text(`${formatDate(entry.date)}  |  mood ${entry.mood}/5  |  energy ${entry.energy}/10`, margin, cursor)
    cursor += 13
    doc.setFont('helvetica', 'normal')
    doc.setTextColor('#4A5B71')
    const preview = entry.tags.length ? `${entry.text} (${entry.tags.join(', ')})` : entry.text
    const lines = doc.splitTextToSize(preview, pageWidth - margin * 2)
    for (const line of lines.slice(0, 3)) {
      doc.text(line, margin, cursor)
      cursor += 12
    }
    cursor += 8
  }

  ensureSpace(doc, cursor, 60)
  doc.setDrawColor('#DBEAF2')
  doc.line(margin, cursor, pageWidth - margin, cursor)
  cursor += 18
  doc.setFontSize(9)
  doc.setTextColor('#4A5B71')
  doc.text('This summary is generated from your own entries. It is not a clinical assessment.', margin, cursor)
  cursor += 12
  doc.text('If you are in danger, call 999. Befrienders Kenya 0800 723 253. Mathare Hospital 020 2052148.', margin, cursor)

  doc.save(`hosea-minds-tracker-${new Date().toISOString().slice(0, 10)}.pdf`)
}

function ensureSpace(doc: import('jspdf').jsPDF, cursor: number, needed = 24): number {
  const height = doc.internal.pageSize.getHeight()
  if (cursor + needed < height - 48) return cursor
  doc.addPage()
  return 56
}
