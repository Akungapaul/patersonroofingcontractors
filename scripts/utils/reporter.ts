/**
 * Audit Reporter
 *
 * Shared result formatting for all audit scripts.
 * Produces consistent PASS/FAIL/WARN output and controls exit codes.
 */

export interface AuditResult {
  category: string
  status: 'PASS' | 'FAIL' | 'WARN'
  message: string
  details?: string[]
}

const STATUS_ICONS: Record<AuditResult['status'], string> = {
  PASS: '[OK]',
  WARN: '[!!]',
  FAIL: '[XX]',
}

/**
 * Prints audit results to stdout with consistent formatting, then exits.
 * - exit(0) if all results are PASS or WARN
 * - exit(1) if any result is FAIL
 */
export function printResults(results: AuditResult[]): void {
  const passCount = results.filter((r) => r.status === 'PASS').length
  const warnCount = results.filter((r) => r.status === 'WARN').length
  const failCount = results.filter((r) => r.status === 'FAIL').length

  console.log('')
  console.log('=== Audit Results ===')
  console.log(`PASS: ${passCount} | WARN: ${warnCount} | FAIL: ${failCount}`)
  console.log('')

  for (const result of results) {
    const icon = STATUS_ICONS[result.status]
    console.log(`${icon} ${result.category}: ${result.message}`)

    if (result.details && result.details.length > 0) {
      for (const detail of result.details) {
        console.log(`     ${detail}`)
      }
    }
  }

  console.log('')

  if (failCount > 0) {
    console.log(`AUDIT FAILED -- ${failCount} check(s) failed.`)
    process.exit(1)
  } else {
    console.log('AUDIT PASSED -- all checks passed.')
    process.exit(0)
  }
}
