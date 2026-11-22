export type HardwareGradeConfig = {
  summary: string;
  components: [string, string][];
};

const ss304FunctionalHardware: [string, string][] = [
  ["Hinges", "SS 304"],
  ["Door knob", "SS 304"],
  ["Internal coat hook", "SS 304"],
  ["Indicator lock", "SS 304"],
];

export const hardwareGradeConfigs: Record<string, HardwareGradeConfig> = {
  nova: {
    summary: "SS 316 adjustable legs with SS 304 functional hardware",
    components: [["Adjustable legs", "SS 316"], ...ss304FunctionalHardware],
  },
  supernova: {
    summary: "SS 316 adjustable legs with SS 304 functional hardware",
    components: [["Adjustable pedestal legs", "SS 316"], ...ss304FunctionalHardware],
  },
  "base-box": {
    summary: "SS 304 functional hardware in the standard configuration",
    components: ss304FunctionalHardware,
  },
  "base-box-pro": {
    summary: "SS 304 functional hardware in the standard configuration",
    components: ss304FunctionalHardware,
  },
  float: {
    summary: "SS 304 functional hardware in the standard configuration",
    components: ss304FunctionalHardware,
  },
  "sky-hung": {
    summary: "SS 304 functional hardware in the standard configuration",
    components: ss304FunctionalHardware,
  },
};

export const hardwareUpgradeNote = "Complete SS 316 hardware is available on request. Final component grades, compatibility, pricing and lead time are confirmed in the approved quotation.";
