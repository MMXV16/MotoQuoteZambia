import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { PersonalInfo, VehicleInfo, CoverageInfo, PricingBreakdown } from "@shared/schema";

interface QuoteState {
  currentStep: number;
  personalInfo: Partial<PersonalInfo>;
  vehicleInfo: Partial<VehicleInfo>;
  coverageInfo: Partial<CoverageInfo>;
  pricing: PricingBreakdown | null;
}

type QuoteAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "SET_VEHICLE_INFO"; payload: Partial<VehicleInfo> }
  | { type: "SET_COVERAGE_INFO"; payload: Partial<CoverageInfo> }
  | { type: "SET_PRICING"; payload: PricingBreakdown }
  | { type: "RESET_QUOTE" }
  | { type: "LOAD_FROM_STORAGE"; payload: QuoteState };

const initialState: QuoteState = {
  currentStep: 1,
  personalInfo: {},
  vehicleInfo: {},
  coverageInfo: {
    addOns: {
      roadsideAssistance: false,
      theftCover: false,
      windscreenCover: false,
    },
  },
  pricing: null,
};

function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_PERSONAL_INFO":
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case "SET_VEHICLE_INFO":
      return { ...state, vehicleInfo: { ...state.vehicleInfo, ...action.payload } };
    case "SET_COVERAGE_INFO":
      return { ...state, coverageInfo: { ...state.coverageInfo, ...action.payload } };
    case "SET_PRICING":
      return { ...state, pricing: action.payload };
    case "RESET_QUOTE":
      return initialState;
    case "LOAD_FROM_STORAGE":
      return action.payload;
    default:
      return state;
  }
}

const QuoteContext = createContext<{
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
} | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("motoquote-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_FROM_STORAGE", payload: parsed });
      } catch (error) {
        console.error("Failed to load saved progress:", error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("motoquote-progress", JSON.stringify(state));
  }, [state]);

  return (
    <QuoteContext.Provider value={{ state, dispatch }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
}
