import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Download, Mail, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/contexts/quote-context";
import { calculatePricing } from "@/lib/pricing";
import { generateQuotePDF } from "@/lib/pdf-generator";
import { useToast } from "@/hooks/use-toast";

interface SummaryStepProps {
  onPrevious: () => void;
  onRestart: () => void;
}

export default function SummaryStep({ onPrevious, onRestart }: SummaryStepProps) {
  const { state, dispatch } = useQuote();
  const { toast } = useToast();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (state.vehicleInfo && state.coverageInfo) {
      const pricing = calculatePricing(state.vehicleInfo, state.coverageInfo);
      dispatch({ type: "SET_PRICING", payload: pricing });
    }
  }, [state.vehicleInfo, state.coverageInfo, dispatch]);

  const handleDownloadQuote = async () => {
    if (!state.pricing || !state.personalInfo || !state.vehicleInfo || !state.coverageInfo) {
      toast({
        title: "Error",
        description: "Quote data is incomplete. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPDF(true);
    
    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      generateQuotePDF({
        personalInfo: state.personalInfo,
        vehicleInfo: state.vehicleInfo,
        coverageInfo: state.coverageInfo,
        pricing: state.pricing,
      });
      
      toast({
        title: "Download Complete",
        description: "Your quote PDF has been generated and downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailQuote = () => {
    if (!state.personalInfo?.email) {
      toast({
        title: "Email Required",
        description: "Please provide a valid email address to send the quote.",
        variant: "destructive",
      });
      return;
    }

    // Create email content
    const subject = encodeURIComponent("Your MotoQuote Zambia Insurance Quote");
    const body = encodeURIComponent(`
Dear ${state.personalInfo.fullName || 'Customer'},

Thank you for using MotoQuote Zambia to get your motor insurance quote.

Here are your quote details:

Vehicle: ${state.vehicleInfo.make} ${state.vehicleInfo.model} (${state.vehicleInfo.year})
Registration: ${state.vehicleInfo.registrationNumber}
Coverage: ${state.coverageInfo.type?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
Duration: ${state.coverageInfo.duration} months

Total Premium: K${state.pricing?.totalAmount.toFixed(2)}
Monthly Premium: K${state.pricing?.monthlyTotal.toFixed(2)}

This quote is valid for 30 days. To proceed with purchasing this insurance policy, please contact us at:
Phone: +260 211 123 456
Email: info@motoquote.zm

Best regards,
The MotoQuote Zambia Team
    `.trim());

    const mailtoUrl = `mailto:${state.personalInfo.email}?subject=${subject}&body=${body}`;
    
    try {
      window.open(mailtoUrl, '_blank');
      toast({
        title: "Email Client Opened",
        description: "Your quote details have been prepared in your email client.",
      });
    } catch (error) {
      toast({
        title: "Email Error", 
        description: "Unable to open email client. Please copy the quote details manually.",
        variant: "destructive",
      });
    }
  };

  if (!state.pricing) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600">Calculating your quote...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">Your Quote Summary</h3>
        <p className="text-neutral-600 dark:text-gray-200">Review your insurance quote and coverage details.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Coverage Details */}
        <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">Coverage Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-gray-200">Vehicle:</span>
              <span className="font-medium text-neutral-800 dark:text-white">
                {state.vehicleInfo.make} {state.vehicleInfo.model} ({state.vehicleInfo.year})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-gray-200">Registration:</span>
              <span className="font-medium text-neutral-800 dark:text-white">{state.vehicleInfo.registrationNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-gray-200">Coverage Type:</span>
              <span className="font-medium text-neutral-800 dark:text-white capitalize">
                {state.coverageInfo.type?.replace("-", " ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-gray-200">Duration:</span>
              <span className="font-medium text-neutral-800 dark:text-white">{state.coverageInfo.duration} months</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">Pricing Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-gray-200">Base Premium:</span>
              <span className="font-medium text-neutral-800 dark:text-white">K{state.pricing.basePremium.toFixed(2)}</span>
            </div>
            {state.pricing.ageFactor > 0 && (
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-gray-200">Vehicle Age Factor:</span>
                <span className="font-medium text-neutral-800 dark:text-white">K{state.pricing.ageFactor.toFixed(2)}</span>
              </div>
            )}
            {state.pricing.roadsideAssistance > 0 && (
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-gray-200">Roadside Assistance:</span>
                <span className="font-medium text-neutral-800 dark:text-white">K{state.pricing.roadsideAssistance.toFixed(2)}</span>
              </div>
            )}
            {state.pricing.theftCover > 0 && (
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-gray-200">Theft Cover:</span>
                <span className="font-medium text-neutral-800 dark:text-white">K{state.pricing.theftCover.toFixed(2)}</span>
              </div>
            )}
            {state.pricing.windscreenCover > 0 && (
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-gray-200">Windscreen Cover:</span>
                <span className="font-medium text-neutral-800 dark:text-white">K{state.pricing.windscreenCover.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-3 dark:border-gray-600" />
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-gray-200">Monthly Total:</span>
              <span className="font-bold text-lg text-primary">K{state.pricing.monthlyTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-gray-200">Total ({state.coverageInfo.duration} months):</span>
              <span className="font-bold text-2xl text-secondary">K{state.pricing.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleDownloadQuote}
          disabled={isGeneratingPDF}
          className="flex-1 bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download Quote
            </>
          )}
        </Button>
        <Button
          onClick={handleEmailQuote}
          className="flex-1 bg-secondary text-white hover:bg-secondary/90"
        >
          <Mail className="w-5 h-5 mr-2" />
          Email Quote
        </Button>
        <Button
          onClick={onRestart}
          variant="outline"
          className="px-6"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      <div className="flex justify-start mt-8">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
      </div>
    </motion.div>
  );
}
