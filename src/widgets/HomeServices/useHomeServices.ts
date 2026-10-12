"use client";
import { useState } from "react";
import useScrollSlider from "@/components/SliderArrows/useScrollSlider";

const useHomeServices = () => {
  const [active, setActive] = useState(0);
  const slider = useScrollSlider("[data-service-card]");

  return { ...slider, active, setActive };
};

export default useHomeServices;
