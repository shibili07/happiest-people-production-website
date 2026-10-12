import React from "react";
import Button from "@/components/Button";
import Select from "react-select";
import useContactForm from "@/components/ContactForm/useContactForm";
import Icons from "@/utils/icons";

interface ContactFormProps {
  /** Service names for the dropdown; falls back to the built-in list. */
  services?: string[];
  theme?: "light" | "dark";
}

const themes = {
  light: {
    form: "mt-10",
    input: "text-grey-900",
    label: "text-gray-600",
    phone: "text-black",
    button: "black" as const,
  },
  dark: {
    form: "form-dark mt-0 text-base 2xl:text-[24px]",
    input: "text-white",
    label: "text-white/70",
    phone: "text-white",
    button: "primary" as const,
  },
};

const ContactForm = ({ services, theme = "light" }: ContactFormProps) => {
  const { formik, phoneInputRef, serviceOptions } = useContactForm(services);
  const t = themes[theme];
  const isDark = theme === "dark";

  return (
    <form onSubmit={formik.handleSubmit} className={`space-y-8 ${t.form}`}>
      {/* Top Row - Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name Field */}
        <div className="form-field">
          <div className="floating-label-container">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`floating-input ${t.input} ${
                formik.errors.fullName && formik.touched.fullName
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=""
            />
            <label htmlFor="fullName" className={`floating-label ${t.label}`}>
              Full name
            </label>
          </div>
          {formik.errors.fullName && formik.touched.fullName && (
            <div className="error-message">{formik.errors.fullName}</div>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <div className="floating-label-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`floating-input ${t.input} ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=""
            />
            <label htmlFor="email" className={`floating-label ${t.label}`}>
              Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="form-field">
          <div className={`floating-label-container phone-field ${t.phone}`}>
            <input
              ref={phoneInputRef}
              type="tel"
              id="phone"
              name="phone"
              onBlur={() => {
                formik.setFieldTouched("phone", true);
                if (phoneInputRef.current) {
                  formik.setFieldValue("phone", phoneInputRef.current.value);
                }
              }}
              onInput={() => {
                if (phoneInputRef.current) {
                  formik.setFieldValue("phone", phoneInputRef.current.value);
                }
              }}
              className={`floating-input ${t.input} !pl-22 ${
                formik.errors.phone && formik.touched.phone
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=""
            />
            <label htmlFor="phone" className={`floating-label ${t.label}`}>
              Phone number
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="error-message">{formik.errors.phone}</div>
          )}
        </div>

        {/* Services Field */}
        <div className="form-field">
          <div className="floating-label-container select-field">
            <Select
              instanceId="services"
              id="services"
              name="services"
              value={
                serviceOptions?.find(
                  (option) => option.value === formik.values.services
                ) || null
              }
              onChange={(option) =>
                formik.setFieldValue("services", option?.value)
              }
              onBlur={() => formik.setFieldTouched("services", true)}
              options={serviceOptions?.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              placeholder=""
              styles={isDark ? darkSelectStyles : customSelectStyles}
              isSearchable={false}
              className={`${
                formik.errors.services && formik.touched.services
                  ? "border-red-500"
                  : ""
              }`}
            />
            <label htmlFor="services" className={`floating-label ${t.label}`}>
              Services
            </label>
          </div>
          {formik.errors.services && formik.touched.services && (
            <div className="error-message">{formik.errors.services}</div>
          )}
        </div>

        {/* Message Field - Single Column */}
        <div className="form-field md:col-span-2">
          <div className="floating-label-container">
            <textarea
              id="message"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`floating-input ${t.input} min-h-[80px] resize-none ${
                formik.errors.message && formik.touched.message
                  ? "border-red-500"
                  : ""
              }`}
              placeholder=""
            />
            <label htmlFor="message" className={`floating-label ${t.label}`}>
              Message
            </label>
          </div>
          {formik.errors.message && formik.touched.message && (
            <div className="error-message">{formik.errors.message}</div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        as="button"
        type="submit"
        text={formik.isSubmitting ? "Submitting..." : "Submit"}
        icon={<Icons.ChevronRight className="h-3 mt-px" />}
        variant="filled-with-icon"
        color={t.button}
        className="lg:mt-16 mt-12 2xl:h-[60px] 2xl:min-w-[230px]"
      />
    </form>
  );
};

export default ContactForm;

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: state.isFocused ? "2px solid #292929" : "2px solid #7e8695",
    borderRadius: 0,
    boxShadow: "none",
    paddingTop: "16px",
    paddingBottom: "16px",
    height: "57.6px",
    "&:hover": {
      borderBottom: "2px solid #7e8695",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#7e8695",
    fontSize: "14px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "16px",
    color: "#000"
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#171717",
    fontSize: "14px",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    border: "1px solid #7e8695",
    borderRadius: "6px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    marginTop: "4px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#fbcf1dae !important" : "white",
    color: state.isSelected ? "#000 !important" : "#535353",
    fontSize: "14px",
    padding: "8px 12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f9fafb",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#7e8695",
    padding: "0 8px 0 0",
  }),
};

const darkSelectStyles = {
  ...customSelectStyles,
  control: (provided: any, state: any) => ({
    ...customSelectStyles.control(provided, state),
    borderBottom: state.isFocused ? "2px solid #fbcf1d" : "2px solid rgba(255,255,255,0.45)",
    "&:hover": { borderBottom: "2px solid rgba(255,255,255,0.45)" },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#7c7c7c",
    fontSize: "14px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "16px",
    color: "#fff",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#141414",
    border: "1px solid #3a3a3a",
    borderRadius: "6px",
    boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.6)",
    marginTop: "4px",
    zIndex: 20,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#fbcf1d !important" : "transparent",
    color: state.isSelected ? "#000 !important" : "#d6d6d6",
    fontSize: "14px",
    padding: "8px 12px",
    cursor: "pointer",
    "&:hover": { backgroundColor: state.isSelected ? "#fbcf1d" : "#242424" },
  }),
};
