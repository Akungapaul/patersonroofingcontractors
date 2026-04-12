import type { ServiceContent } from '../types'

// Repair & Maintenance (10)
import { roofRepair } from './roof-repair'
import { roofLeakRepair } from './roof-leak-repair'
import { stormDamageRoofRepair } from './storm-damage-roof-repair'
import { hailDamageRoofRepair } from './hail-damage-roof-repair'
import { windDamageRoofRepair } from './wind-damage-roof-repair'
import { emergencyRoofRepair } from './emergency-roof-repair'
import { roofInspection } from './roof-inspection'
import { roofMaintenancePrograms } from './roof-maintenance-programs'
import { roofCleaningMossRemoval } from './roof-cleaning-moss-removal'
import { roofPatching } from './roof-patching'

// Residential Roofing (9)
import { residentialRoofInstallation } from './residential-roof-installation'
import { asphaltShingleRoofing } from './asphalt-shingle-roofing'
import { slateRoofInstallationRepair } from './slate-roof-installation-repair'
import { woodShakeRoofing } from './wood-shake-roofing'
import { metalRoofInstallationRepair } from './metal-roof-installation-repair'
import { flatRoofInstallationRepair } from './flat-roof-installation-repair'
import { tileRoofInstallationRepair } from './tile-roof-installation-repair'
import { cedarShakeRoofing } from './cedar-shake-roofing'
import { rubberRoofingEpdm } from './rubber-roofing-epdm'

const serviceContentMap: Record<string, ServiceContent> = {
  // Repair & Maintenance
  'roof-repair': roofRepair,
  'roof-leak-repair': roofLeakRepair,
  'storm-damage-roof-repair': stormDamageRoofRepair,
  'hail-damage-roof-repair': hailDamageRoofRepair,
  'wind-damage-roof-repair': windDamageRoofRepair,
  'emergency-roof-repair': emergencyRoofRepair,
  'roof-inspection': roofInspection,
  'roof-maintenance-programs': roofMaintenancePrograms,
  'roof-cleaning-moss-removal': roofCleaningMossRemoval,
  'roof-patching': roofPatching,

  // Residential Roofing
  'residential-roof-installation': residentialRoofInstallation,
  'asphalt-shingle-roofing': asphaltShingleRoofing,
  'slate-roof-installation-repair': slateRoofInstallationRepair,
  'wood-shake-roofing': woodShakeRoofing,
  'metal-roof-installation-repair': metalRoofInstallationRepair,
  'flat-roof-installation-repair': flatRoofInstallationRepair,
  'tile-roof-installation-repair': tileRoofInstallationRepair,
  'cedar-shake-roofing': cedarShakeRoofing,
  'rubber-roofing-epdm': rubberRoofingEpdm,
}

export function getServiceContent(slug: string): ServiceContent | undefined {
  return serviceContentMap[slug]
}

export function getAllServiceContent(): ServiceContent[] {
  return Object.values(serviceContentMap)
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(serviceContentMap)
}

export function getServicesByCategory(): Record<string, ServiceContent[]> {
  const grouped: Record<string, ServiceContent[]> = {}
  for (const service of Object.values(serviceContentMap)) {
    if (!grouped[service.category]) {
      grouped[service.category] = []
    }
    grouped[service.category].push(service)
  }
  return grouped
}
