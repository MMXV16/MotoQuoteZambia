import jsPDF from 'jspdf';
import type { PersonalInfo, VehicleInfo, CoverageInfo, PricingBreakdown } from '@shared/schema';

interface QuoteData {
  personalInfo: Partial<PersonalInfo>;
  vehicleInfo: Partial<VehicleInfo>;
  coverageInfo: Partial<CoverageInfo>;
  pricing: PricingBreakdown;
}

export function generateQuotePDF(quoteData: QuoteData): void {
  const doc = new jsPDF();
  
  // Set up colors and fonts
  const primaryColor: [number, number, number] = [51, 112, 255]; // Blue
  const secondaryColor: [number, number, number] = [34, 197, 94]; // Green
  const textColor: [number, number, number] = [31, 41, 55]; // Dark gray
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('MotoQuote Zambia', 20, 20);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Motor Insurance Quotation', 20, 26);
  
  // Quote number and date
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  const quoteNumber = `MQ-${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('en-GB');
  doc.text(`Quote #: ${quoteNumber}`, 140, 40);
  doc.text(`Date: ${currentDate}`, 140, 45);
  
  // Personal Information Section
  let yPos = 60;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Personal Information', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${quoteData.personalInfo.fullName || 'N/A'}`, 20, yPos);
  yPos += 5;
  doc.text(`NRC/Passport: ${quoteData.personalInfo.nrcPassport || 'N/A'}`, 20, yPos);
  yPos += 5;
  doc.text(`Phone: ${quoteData.personalInfo.phoneNumber || 'N/A'}`, 20, yPos);
  yPos += 5;
  doc.text(`Email: ${quoteData.personalInfo.email || 'N/A'}`, 20, yPos);
  
  // Vehicle Information Section
  yPos += 20;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Vehicle Information', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Make & Model: ${quoteData.vehicleInfo.make || 'N/A'} ${quoteData.vehicleInfo.model || 'N/A'}`, 20, yPos);
  yPos += 5;
  doc.text(`Year: ${quoteData.vehicleInfo.year || 'N/A'}`, 20, yPos);
  yPos += 5;
  doc.text(`Registration: ${quoteData.vehicleInfo.registrationNumber || 'N/A'}`, 20, yPos);
  yPos += 5;
  doc.text(`Engine Type: ${quoteData.vehicleInfo.engineType ? quoteData.vehicleInfo.engineType.charAt(0).toUpperCase() + quoteData.vehicleInfo.engineType.slice(1) : 'N/A'}`, 20, yPos);
  
  // Coverage Information Section
  yPos += 20;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Coverage Information', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Coverage Type: ${quoteData.coverageInfo.type ? quoteData.coverageInfo.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}`, 20, yPos);
  yPos += 5;
  doc.text(`Duration: ${quoteData.coverageInfo.duration || 'N/A'} months`, 20, yPos);
  
  // Add-ons
  const addOns = quoteData.coverageInfo.addOns || {};
  const selectedAddOns = [];
  if ((addOns as any).roadsideAssistance) selectedAddOns.push('Roadside Assistance');
  if ((addOns as any).theftCover) selectedAddOns.push('Theft Cover');
  if ((addOns as any).windscreenCover) selectedAddOns.push('Windscreen Cover');
  
  yPos += 5;
  doc.text(`Add-ons: ${selectedAddOns.length > 0 ? selectedAddOns.join(', ') : 'None'}`, 20, yPos);
  
  // Pricing Breakdown Section
  yPos += 20;
  doc.setFillColor(245, 245, 245);
  doc.rect(15, yPos - 5, 180, 60, 'F');
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Pricing Breakdown', 20, yPos + 5);
  
  yPos += 15;
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Pricing details
  doc.text(`Base Premium:`, 20, yPos);
  doc.text(`K${quoteData.pricing.basePremium.toFixed(2)}`, 150, yPos);
  yPos += 5;
  
  if (quoteData.pricing.ageFactor > 0) {
    doc.text(`Vehicle Age Factor:`, 20, yPos);
    doc.text(`K${quoteData.pricing.ageFactor.toFixed(2)}`, 150, yPos);
    yPos += 5;
  }
  
  if (quoteData.pricing.roadsideAssistance > 0) {
    doc.text(`Roadside Assistance:`, 20, yPos);
    doc.text(`K${quoteData.pricing.roadsideAssistance.toFixed(2)}`, 150, yPos);
    yPos += 5;
  }
  
  if (quoteData.pricing.theftCover > 0) {
    doc.text(`Theft Cover:`, 20, yPos);
    doc.text(`K${quoteData.pricing.theftCover.toFixed(2)}`, 150, yPos);
    yPos += 5;
  }
  
  if (quoteData.pricing.windscreenCover > 0) {
    doc.text(`Windscreen Cover:`, 20, yPos);
    doc.text(`K${quoteData.pricing.windscreenCover.toFixed(2)}`, 150, yPos);
    yPos += 5;
  }
  
  // Totals
  yPos += 5;
  doc.setLineWidth(0.5);
  doc.line(20, yPos, 180, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Monthly Total:`, 20, yPos);
  doc.text(`K${quoteData.pricing.monthlyTotal.toFixed(2)}`, 150, yPos);
  yPos += 8;
  
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(12);
  doc.text(`Total Amount (${quoteData.coverageInfo.duration || 1} months):`, 20, yPos);
  doc.text(`K${quoteData.pricing.totalAmount.toFixed(2)}`, 150, yPos);
  
  // Footer
  yPos = 270;
  doc.setTextColor(...textColor);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('This quote is valid for 30 days from the date of issue.', 20, yPos);
  yPos += 4;
  doc.text('For more information, contact us at +260 211 123 456 or info@motoquote.zm', 20, yPos);
  yPos += 4;
  doc.text('MotoQuote Zambia - Making motor insurance accessible and transparent.', 20, yPos);
  
  // Generate filename
  const filename = `MotoQuote_${quoteData.personalInfo.fullName?.replace(/\s+/g, '_') || 'Quote'}_${currentDate.replace(/\//g, '-')}.pdf`;
  
  // Save the PDF
  doc.save(filename);
}