"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CONTACT, ENQUIRY_SERVICES } from "@/data/site";

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
  /**
   * Honeypot. Hidden from people and from screen readers, so anything that
   * fills it in is automated. Validated server-side, not here — a bot does not
   * run this resolver.
   */
  website: z.string().optional(),
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
      <div className="border border-white/10 bg-ink-900 p-8">
        <span className="text-[11px] font-bold uppercase tracking-label text-gold">
          Enquiry received
        </span>
        <p className="mt-4 text-lg text-white">
          Thank you — your enquiry has been sent to the CJ MUNI team. A member of
          the team will be in touch.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline-light mt-6"
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
        <p role="alert" className="border border-goat-light/60 bg-goat/15 px-4 py-3 text-sm text-white">
          Something went wrong submitting your enquiry. Please try again, or email{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-semibold underline underline-offset-4 hover:text-gold">
            {CONTACT.email}
          </a>{" "}
          directly.
        </p>
      ) : null}

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website (leave this field empty)</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Submitting…" : "Request an Enquiry"}
      </button>

      <p className="text-xs leading-relaxed text-white/50">
        Your enquiry is emailed directly to the CJ MUNI team. We use the details
        you provide only to respond to it — see our{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-gold">
          privacy policy
        </a>
        . Prefer email? Write to{" "}
        <a
          href={`mailto:${CONTACT.email}`}
          className="underline underline-offset-4 hover:text-gold"
        >
          {CONTACT.email}
        </a>
        .
      </p>
    </form>
  );
}

const inputClass =
  "w-full border border-white/20 bg-ink-800 px-4 py-3 font-sans text-sm text-white placeholder-white/40 outline-none duration-200 focus:border-gold";

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
        className="mb-2 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-label text-white/70"
      >
        {label}
        {optional ? <span className="text-white/50">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-goat-light">
          {error}
        </p>
      ) : null}
    </div>
  );
}
