import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { vehicleInfoSchema } from "@/lib/validation";
import type { VehicleInfo } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuote } from "@/contexts/quote-context";

interface VehicleDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const vehicleMakes = [
  { value: "toyota", label: "Toyota" },
  { value: "nissan", label: "Nissan" },
  { value: "mazda", label: "Mazda" },
  { value: "honda", label: "Honda" },
  { value: "ford", label: "Ford" },
  { value: "bmw", label: "BMW" },
  { value: "mercedes", label: "Mercedes-Benz" },
];

const vehicleYears = Array.from({ length: 15 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export default function VehicleDetailsStep({ onNext, onPrevious }: VehicleDetailsStepProps) {
  const { state, dispatch } = useQuote();
  
  const form = useForm<VehicleInfo>({
    resolver: zodResolver(vehicleInfoSchema),
    defaultValues: state.vehicleInfo,
  });

  const onSubmit = (data: VehicleInfo) => {
    dispatch({ type: "SET_VEHICLE_INFO", payload: data });
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
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">Vehicle Details</h3>
        <p className="text-neutral-600 dark:text-gray-200">Tell us about your vehicle to calculate your quote.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Make *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle make" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleMakes.map((make) => (
                        <SelectItem key={make.value} value={make.value}>
                          {make.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Corolla, Hilux, Vitz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Year *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vehicleYears.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ABC 123 GP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="engineType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Engine Type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-4 border border-neutral-300 dark:border-gray-600 rounded-lg">
                      <RadioGroupItem value="petrol" id="petrol" />
                      <Label htmlFor="petrol" className="dark:text-white">Petrol</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-neutral-300 dark:border-gray-600 rounded-lg">
                      <RadioGroupItem value="diesel" id="diesel" />
                      <Label htmlFor="diesel" className="dark:text-white">Diesel</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={onPrevious}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button type="submit" size="lg">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
