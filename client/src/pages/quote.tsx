import { AnimatePresence } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProgressBar from "@/components/quote-form/progress-bar";
import PersonalInfoStep from "@/components/quote-form/personal-info-step";
import VehicleDetailsStep from "@/components/quote-form/vehicle-details-step";
import CoverageStep from "@/components/quote-form/coverage-step";
import SummaryStep from "@/components/quote-form/summary-step";
import { useQuote } from "@/contexts/quote-context";

const TOTAL_STEPS = 4;

export default function Quote() {
  const { state, dispatch } = useQuote();

  const handleNext = () => {
    if (state.currentStep < TOTAL_STEPS) {
      dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
    }
  };

  const handlePrevious = () => {
    if (state.currentStep > 1) {
      dispatch({ type: "SET_STEP", payload: state.currentStep - 1 });
    }
  };

  const handleRestart = () => {
    dispatch({ type: "RESET_QUOTE" });
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <PersonalInfoStep onNext={handleNext} />;
      case 2:
        return <VehicleDetailsStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <CoverageStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <SummaryStep onPrevious={handlePrevious} onRestart={handleRestart} />;
      default:
        return <PersonalInfoStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      <Header />
      
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressBar currentStep={state.currentStep} totalSteps={TOTAL_STEPS} />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl form-shadow p-8">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
