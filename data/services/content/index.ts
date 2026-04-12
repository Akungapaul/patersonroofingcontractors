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

// Commercial Roofing (11)
import { commercialRoofInstallation } from './commercial-roof-installation'
import { commercialRoofRepair } from './commercial-roof-repair'
import { commercialRoofReplacement } from './commercial-roof-replacement'
import { tpoRoofingInstallation } from './tpo-roofing-installation'
import { epdmCommercialRoofing } from './epdm-commercial-roofing'
import { modifiedBitumenRoofing } from './modified-bitumen-roofing'
import { builtUpRoofing } from './built-up-roofing'
import { commercialMetalRoofing } from './commercial-metal-roofing'
import { pvcRoofing } from './pvc-roofing'
import { greenRoofInstallation } from './green-roof-installation'
import { sprayFoamRoofing } from './spray-foam-roofing'

// Gutters & Drainage (2)
import { gutterInstallationRepair } from './gutter-installation-repair'
import { gutterGuardInstallation } from './gutter-guard-installation'

// Energy & Solar (5)
import { solarPanelRoofingInstallation } from './solar-panel-roofing-installation'
import { solarShingleInstallation } from './solar-shingle-installation'
import { energyEfficientRoofingSolutions } from './energy-efficient-roofing-solutions'
import { siliconeRoofCoating } from './silicone-roof-coating'
import { elastomericRoofCoating } from './elastomeric-roof-coating'

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

  // Commercial Roofing
  'commercial-roof-installation': commercialRoofInstallation,
  'commercial-roof-repair': commercialRoofRepair,
  'commercial-roof-replacement': commercialRoofReplacement,
  'tpo-roofing-installation': tpoRoofingInstallation,
  'epdm-commercial-roofing': epdmCommercialRoofing,
  'modified-bitumen-roofing': modifiedBitumenRoofing,
  'built-up-roofing': builtUpRoofing,
  'commercial-metal-roofing': commercialMetalRoofing,
  'pvc-roofing': pvcRoofing,
  'green-roof-installation': greenRoofInstallation,
  'spray-foam-roofing': sprayFoamRoofing,

  // Gutters & Drainage
  'gutter-installation-repair': gutterInstallationRepair,
  'gutter-guard-installation': gutterGuardInstallation,

  // Energy & Solar
  'solar-panel-roofing-installation': solarPanelRoofingInstallation,
  'solar-shingle-installation': solarShingleInstallation,
  'energy-efficient-roofing-solutions': energyEfficientRoofingSolutions,
  'silicone-roof-coating': siliconeRoofCoating,
  'elastomeric-roof-coating': elastomericRoofCoating,
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
