export interface CareersAccordionSection {
  title: string;
  type: string;
  richText: React.ReactNode;
}

export interface CareersAccordionSettings {
  sections: CareersAccordionSection[];
  arrowIcon?: React.ReactNode;
  applyLabel?: string;
  /** Where the "Apply" link goes, e.g. "#careers-application". */
  applyHref?: string;
  theme?: "light" | "dark";
}
