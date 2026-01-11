import { Formula } from './types';

const formulas: Formula[] = [
  {
    id: "f1",
    name: "Inverse Square Law",
    latex: "E = \\frac{I}{d^2} \\times \\cos(\\theta)",
    description: "Calculates illuminance from a point source at a specific distance and angle. Valid when distance > 5x source size.",
    category: "Physics",
    variables: [
      { symbol: "I", definition: "Luminous Intensity", unit: "cd", defaultValue: 1000 },
      { symbol: "d", definition: "Distance to source", unit: "m", defaultValue: 2 },
      { symbol: "theta", definition: "Incident Angle", unit: "deg", defaultValue: 0 }
    ],
    calculate: (v) => (v["I"] / (v["d"] * v["d"])) * Math.cos(v["theta"] * Math.PI / 180)
  },
  {
    id: "f2",
    name: "Luminous Efficacy",
    latex: "\\eta = \\frac{\\Phi}{P}",
    description: "Measures source efficiency in converting power to visible light. Essential for comparing LED vs legacy tech.",
    category: "Physics",
    variables: [
      { symbol: "Φ", definition: "Total Luminous Flux", unit: "lm", defaultValue: 1200 },
      { symbol: "P", definition: "Power Consumption", unit: "W", defaultValue: 10 }
    ],
    calculate: (v) => v["Φ"] / v["P"]
  },
  {
    id: "f3",
    name: "Michelson Contrast",
    latex: "C = \\frac{L_{max} - L_{min}}{L_{max} + L_{min}}",
    description: "Evaluates the visibility of a task by measuring the luminance difference between object and background.",
    category: "Vision",
    variables: [
      { symbol: "Lmax", definition: "Maximum Luminance", unit: "cd/m²", defaultValue: 100 },
      { symbol: "Lmin", definition: "Minimum Luminance", unit: "cd/m²", defaultValue: 20 }
    ],
    calculate: (v) => (v["Lmax"] - v["Lmin"]) / (v["Lmax"] + v["Lmin"])
  },
  {
    id: "f4",
    name: "The Lumen Method",
    latex: "E_{avg} = \\frac{N \\times \\Phi \\times UF \\times MF}{A}",
    description: "Standard formula for calculating average maintained illuminance in a room based on AS/NZS 1680 guidelines.",
    category: "Design",
    variables: [
      { symbol: "N", definition: "Qty of Luminaires", unit: "qty", defaultValue: 4 },
      { symbol: "Φ", definition: "Flux per Luminaire", unit: "lm", defaultValue: 3000 },
      { symbol: "UF", definition: "Utilization Factor", unit: "0-1", defaultValue: 0.65 },
      { symbol: "MF", definition: "Maintenance Factor", unit: "0-1", defaultValue: 0.8 },
      { symbol: "A", definition: "Room Area (L×W)", unit: "m²", defaultValue: 24 }
    ],
    calculate: (v) => (v["N"] * v["Φ"] * v["UF"] * v["MF"]) / v["A"]
  },
  {
    id: "f5",
    name: "Room Index (K)",
    latex: "K = \\frac{L \\times W}{H_m \\times (L + W)}",
    description: "Geometric ratio used to look up the Utilization Factor (UF) from manufacturer photometry tables.",
    category: "Design",
    variables: [
      { symbol: "L", definition: "Room Length", unit: "m", defaultValue: 6 },
      { symbol: "W", definition: "Room Width", unit: "m", defaultValue: 4 },
      { symbol: "Hm", definition: "Height (Luminaire to Task)", unit: "m", defaultValue: 2.1 }
    ],
    calculate: (v) => (v["L"] * v["W"]) / (v["Hm"] * (v["L"] + v["W"]))
  },
  {
    id: "f6",
    name: "Lighting Power Density (LPD)",
    latex: "LPD = \\frac{\\sum P}{A}",
    description: "Used to verify compliance with NCC (BCA) Section J6 energy efficiency regulations.",
    category: "Compliance",
    variables: [
      { symbol: "SumP", definition: "Total Circuit Power", unit: "W", defaultValue: 120 },
      { symbol: "Area", definition: "Floor Area", unit: "m²", defaultValue: 30 }
    ],
    calculate: (v) => v["SumP"] / v["Area"]
  },
  {
    id: "f7",
    name: "Total Maintenance Factor (MF)",
    latex: "MF = LLMF \\times LSF \\times LMF \\times RSMF",
    description: "Combines individual light loss factors (aging, dirt, and failures). Professional default is typically 0.6 – 0.8.",
    category: "Compliance",
    variables: [
      { symbol: "LLMF", definition: "Lamp Lumen Maintenance", unit: "0-1", defaultValue: 0.9 },
      { symbol: "LSF", definition: "Lamp Survival Factor", unit: "0-1", defaultValue: 1.0 },
      { symbol: "LMF", definition: "Luminaire Maint. Factor", unit: "0-1", defaultValue: 0.95 },
      { symbol: "RSMF", definition: "Room Surface Maint.", unit: "0-1", defaultValue: 0.95 }
    ],
    calculate: (v) => v["LLMF"] * v["LSF"] * v["LMF"] * v["RSMF"]
  },
  {
    id: "f8",
    name: "Luminance (Lambertian)",
    latex: "L = \\frac{E \\times \\rho}{\\pi}",
    description: "Calculates the luminance of a diffuse reflecting surface. Assumes uniform reflectance in all directions.",
    category: "Physics",
    variables: [
      { symbol: "E", definition: "Illuminance", unit: "lx", defaultValue: 320 },
      { symbol: "rho", definition: "Reflectance (ρ)", unit: "0-1", defaultValue: 0.7 }
    ],
    calculate: (v) => (v["E"] * v["rho"]) / Math.PI
  }
];

export default formulas;