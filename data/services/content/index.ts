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

// Components & Specialty (10)
import { roofFlashingInstallationRepair } from './roof-flashing-installation-repair'
import { chimneyFlashingRepair } from './chimney-flashing-repair'
import { skylightInstallationRepair } from './skylight-installation-repair'
import { fasciaInstallationRepair } from './fascia-installation-repair'
import { soffitInstallationRepair } from './soffit-installation-repair'
import { roofVentInstallationRepair } from './roof-vent-installation-repair'
import { roofWaterproofing } from './roof-waterproofing'
import { roofDeckRepairReplacement } from './roof-deck-repair-replacement'
import { roofVentilationInstallation } from './roof-ventilation-installation'
import { atticInsulation } from './attic-insulation'

// Roof Replacement (15)
import { fullRoofTearOff } from './full-roof-tear-off'
import { roofOverlayInstallation } from './roof-overlay-installation'
import { reRoofing } from './re-roofing'
import { insuranceRoofReplacement } from './insurance-roof-replacement'
import { stormDamageRoofReplacement } from './storm-damage-roof-replacement'
import { agingRoofReplacement } from './aging-roof-replacement'
import { asphaltShingleReplacement } from './asphalt-shingle-replacement'
import { metalRoofReplacement } from './metal-roof-replacement'
import { flatRoofReplacement } from './flat-roof-replacement'
import { tileRoofReplacement } from './tile-roof-replacement'
import { slateRoofReplacement } from './slate-roof-replacement'
import { woodShakeReplacement } from './wood-shake-replacement'
import { cedarShakeReplacement } from './cedar-shake-replacement'
import { rubberRoofReplacement } from './rubber-roof-replacement'
import { commercialRoofMembraneReplacement } from './commercial-roof-membrane-replacement'

// Design & Specialty (5)
import { customRoofDesignConsultation } from './custom-roof-design-consultation'
import { historicRoofRestoration } from './historic-roof-restoration'
import { roofIceDamPrevention } from './roof-ice-dam-prevention'
import { roofThermalImagingInspections } from './roof-thermal-imaging-inspections'
import { infraredRoofLeakDetection } from './infrared-roof-leak-detection'

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

  // Components & Specialty
  'roof-flashing-installation-repair': roofFlashingInstallationRepair,
  'chimney-flashing-repair': chimneyFlashingRepair,
  'skylight-installation-repair': skylightInstallationRepair,
  'fascia-installation-repair': fasciaInstallationRepair,
  'soffit-installation-repair': soffitInstallationRepair,
  'roof-vent-installation-repair': roofVentInstallationRepair,
  'roof-waterproofing': roofWaterproofing,
  'roof-deck-repair-replacement': roofDeckRepairReplacement,
  'roof-ventilation-installation': roofVentilationInstallation,
  'attic-insulation': atticInsulation,

  // Roof Replacement
  'full-roof-tear-off': fullRoofTearOff,
  'roof-overlay-installation': roofOverlayInstallation,
  're-roofing': reRoofing,
  'insurance-roof-replacement': insuranceRoofReplacement,
  'storm-damage-roof-replacement': stormDamageRoofReplacement,
  'aging-roof-replacement': agingRoofReplacement,
  'asphalt-shingle-replacement': asphaltShingleReplacement,
  'metal-roof-replacement': metalRoofReplacement,
  'flat-roof-replacement': flatRoofReplacement,
  'tile-roof-replacement': tileRoofReplacement,
  'slate-roof-replacement': slateRoofReplacement,
  'wood-shake-replacement': woodShakeReplacement,
  'cedar-shake-replacement': cedarShakeReplacement,
  'rubber-roof-replacement': rubberRoofReplacement,
  'commercial-roof-membrane-replacement': commercialRoofMembraneReplacement,

  // Design & Specialty
  'custom-roof-design-consultation': customRoofDesignConsultation,
  'historic-roof-restoration': historicRoofRestoration,
  'roof-ice-dam-prevention': roofIceDamPrevention,
  'roof-thermal-imaging-inspections': roofThermalImagingInspections,
  'infrared-roof-leak-detection': infraredRoofLeakDetection,
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
