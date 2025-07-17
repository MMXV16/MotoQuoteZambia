import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Link href="/">
          <Button variant="ghost" className="flex items-center text-primary hover:text-primary/80">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div className="text-sm text-neutral-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
