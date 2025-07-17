import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { coverageInfoSchema } from "@/lib/validation";
import type { CoverageInfo } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/contexts/quote-context";

interface CoverageStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function CoverageStep({ onNext, onPrevious }: CoverageStepProps) {
  const { state, dispatch } = useQuote();
  
  const form = useForm<CoverageInfo>({
    resolver: zodResolver(coverageInfoSchema),
    defaultValues: state.coverageInfo,
  });

  const onSubmit = (data: CoverageInfo) => {
    dispatch({ type: "SET_COVERAGE_INFO", payload: data });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">Insurance Coverage</h3>
        <p className="text-neutral-600 dark:text-gray-200">Choose your preferred insurance coverage and duration.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium text-neutral-700 dark:text-gray-200">Coverage Type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-start p-6 border border-neutral-300 dark:border-gray-600 rounded-lg space-x-3">
                      <RadioGroupItem value="third-party" id="third-party" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="third-party" className="font-medium text-neutral-800 dark:text-white cursor-pointer">
                          Third Party
                        </Label>
                        <div className="text-sm text-neutral-600 dark:text-gray-300 mt-1">
                          Basic legal coverage for damage to other vehicles and property
                        </div>
                        <div className="text-sm font-medium text-secondary mt-2">From K150/month</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-6 border border-neutral-300 dark:border-gray-600 rounded-lg space-x-3">
                      <RadioGroupItem value="comprehensive" id="comprehensive" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="comprehensive" className="font-medium text-neutral-800 dark:text-white cursor-pointer">
                          Comprehensive
                        </Label>
                        <div className="text-sm text-neutral-600 dark:text-gray-300 mt-1">
                          Complete coverage including damage to your vehicle
                        </div>
                        <div className="text-sm font-medium text-secondary mt-2">From K350/month</div>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium text-neutral-700 dark:text-gray-200">Duration *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {[
                      { value: "1", label: "1 Month" },
                      { value: "3", label: "3 Months" },
                      { value: "6", label: "6 Months" },
                      { value: "12", label: "12 Months" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center p-4 border border-neutral-300 dark:border-gray-600 rounded-lg space-x-3">
                        <RadioGroupItem value={option.value} id={`duration-${option.value}`} />
                        <Label htmlFor={`duration-${option.value}`} className="cursor-pointer dark:text-white">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel className="text-sm font-medium text-neutral-700 dark:text-gray-200">Add-ons (Optional)</FormLabel>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="addOns.roadsideAssistance"
                render={({ field }) => (
                  <FormItem className="flex items-center p-4 border border-neutral-300 dark:border-gray-600 rounded-lg space-x-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex-1">
                      <FormLabel className="font-medium text-neutral-800 dark:text-white">Roadside Assistance</FormLabel>
                      <div className="text-sm text-neutral-600 dark:text-gray-300">24/7 emergency roadside support</div>
                    </div>
                    <div className="text-sm font-medium text-secondary">+K50/month</div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="addOns.theftCover"
                render={({ field }) => (
                  <FormItem className="flex items-center p-4 border border-neutral-300 dark:border-gray-600 rounded-lg space-x-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex-1">
                      <FormLabel className="font-medium text-neutral-800 dark:text-white">Theft Cover</FormLabel>
                      <div className="text-sm text-neutral-600 dark:text-gray-300">Protection against vehicle theft</div>
                    </div>
                    <div className="text-sm font-medium text-secondary">+K80/month</div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="addOns.windscreenCover"
                render={({ field }) => (
                  <FormItem className="flex items-center p-4 border border-neutral-300 dark:border-gray-600 rounded-lg space-x-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex-1">
                      <FormLabel className="font-medium text-neutral-800 dark:text-white">Windscreen Cover</FormLabel>
                      <div className="text-sm text-neutral-600 dark:text-gray-300">Windscreen repair and replacement</div>
                    </div>
                    <div className="text-sm font-medium text-secondary">+K30/month</div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={onPrevious}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button type="submit" size="lg">
              Generate Quote
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
