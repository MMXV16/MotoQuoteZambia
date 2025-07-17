import type { VehicleInfo, CoverageInfo, PricingBreakdown } from "@shared/schema";

const BASE_PREMIUMS = {
  "third-party": 150,
  "comprehensive": 350,
};

const VEHICLE_MAKE_MULTIPLIERS: Record<string, number> = {
  toyota: 1.0,
  nissan: 1.0,
  mazda: 1.0,
  honda: 1.0,
  ford: 1.1,
  bmw: 1.3,
  mercedes: 1.4,
};

const ADD_ON_COSTS = {
  roadsideAssistance: 50,
  theftCover: 80,
  windscreenCover: 30,
};

export function calculatePricing(
  vehicleInfo: Partial<VehicleInfo>,
  coverageInfo: Partial<CoverageInfo>
): PricingBreakdown {
  const basePremium = BASE_PREMIUMS[coverageInfo.type as keyof typeof BASE_PREMIUMS] || 150;
  
  // Calculate vehicle age factor
  const currentYear = new Date().getFullYear();
  const vehicleYear = parseInt(vehicleInfo.year || "2020");
  const vehicleAge = currentYear - vehicleYear;
  let ageFactor = Math.max(0, vehicleAge * 10); // K10 per year of age
  
  // Apply vehicle make multiplier
  const makeMultiplier = VEHICLE_MAKE_MULTIPLIERS[vehicleInfo.make?.toLowerCase() || "toyota"] || 1.0;
  const adjustedBasePremium = basePremium * makeMultiplier;
  
  // Calculate add-on costs
  const addOns = coverageInfo.addOns || {
    roadsideAssistance: false,
    theftCover: false,
    windscreenCover: false,
  };
  const roadsideAssistance = addOns.roadsideAssistance ? ADD_ON_COSTS.roadsideAssistance : 0;
  const theftCover = addOns.theftCover ? ADD_ON_COSTS.theftCover : 0;
  const windscreenCover = addOns.windscreenCover ? ADD_ON_COSTS.windscreenCover : 0;
  
  // Calculate monthly total
  const monthlyTotal = adjustedBasePremium + ageFactor + roadsideAssistance + theftCover + windscreenCover;
  
  // Calculate total amount based on duration
  const duration = parseInt(coverageInfo.duration || "1");
  const totalAmount = monthlyTotal * duration;
  
  return {
    basePremium: adjustedBasePremium,
    ageFactor,
    roadsideAssistance,
    theftCover,
    windscreenCover,
    monthlyTotal,
    totalAmount,
  };
}
