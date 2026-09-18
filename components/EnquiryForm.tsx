"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ENQUIRY_SERVICES } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  company: z.string().min(2, "Please enter your company."),
  email: z.string().min(1, "Please enter your email.").email("Enter a valid email address."),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /[0-9+()\-\s]{6,}/.test(v), "Enter a valid phone number."),
  service: z.string().min(1, "Please select a service or capability."),
  message: z.string().min(10, "Please add a few words about your requirement."),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-black/10 bg-white p-8">
        <span className="text-[11px] font-bold uppercase tracking-label text-gold-600">
          Enquiry received
        </span>
        <p className="mt-4 text-lg text-ink">
          Thank you — your enquiry has been logged. A member of the CJ MUNI team will
          be in touch.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline-dark mt-6"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} htmlFor="name">
          <input id="name" type="text" autoComplete="name" className={inputClass} {...register("name")} />
        </Field>
        <Field label="Company" error={errors.company?.message} htmlFor="company">
          <input id="company" type="text" autoComplete="organization" className={inputClass} {...register("company")} />
        </Field>
        <Field label="Email" error={errors.email?.message} htmlFor="email">
          <input id="email" type="email" autoComplete="email" className={inputClass} {...register("email")} />
        </Field>
        <Field label="Phone" error={errors.phone?.message} htmlFor="phone" optional>
          <input id="phone" type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
        </Field>
      </div>

      <Field label="Service / Capability" error={errors.service?.message} htmlFor="service">
        <select id="service" defaultValue="" className={inputClass} {...register("service")}>
          <option value="" disabled>
            Select a service or capability
          </option>
          {ENQUIRY_SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" error={errors.message?.message} htmlFor="message">
        <textarea id="message" rows={5} className={`${inputClass} resize-y`} {...register("message")} />
      </Field>

      {status === "error" ? (
        <p role="alert" className="border border-goat/50 bg-goat/5 px-4 py-3 text-sm text-ink">
          Something went wrong submitting your enquiry. Please try again, or email{" "}
          <span className="font-semibold">Kassman@icloud.com</span> directly.
        </p>
      ) : null}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Submitting…" : "Request an Enquiry"}
      </button>

      <p className="text-xs leading-relaxed text-charcoal-light">
        This form is ready for integration with an email or CRM backend. Until a
        service is connected, submissions are validated and acknowledged but not
        delivered by email.
      </p>
    </form>
  );
}

const inputClass =
  "w-full border border-black/20 bg-white px-4 py-3 font-sans text-sm text-ink placeholder-charcoal-light outline-none duration-200 focus:border-gold";

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-label text-charcoal"
      >
        {label}
        {optional ? <span className="text-charcoal-light">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-goat">
          {error}
        </p>
      ) : null}
    </div>
  );
}
