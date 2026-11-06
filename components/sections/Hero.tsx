import { Button } from "@/components/ui/Button";
import { PhoneButton } from "@/components/ui/PhoneButton";
import { HeroQuoteForm } from "@/components/forms/HeroQuoteForm";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  headline?: string;
  subheadline?: string;
  backgroundImage?: string;
  readTime?: number;
  minHeight?: string;
  showQuoteForm?: boolean;
}

export function Hero({
  headline,
  subheadline,
  backgroundImage,
  readTime,
  minHeight,
  showQuoteForm = false,
}: HeroProps = {}) {
  const defaultHeadline =
    "Paterson\u2019s #1 Roofing Contractors \u2014 Serving All of Passaic County";
  const defaultSubheadline =
    "Paterson roofing contractor for roof repair, roof replacement, asphalt shingle repair, emergency leaks, and flat roofing in Paterson, NJ. Free estimates, 24/7 emergency service.";
  const isLocationPage = !!headline;
  const heightClass =
    minHeight ??
    (showQuoteForm
      ? "min-h-0"
      : isLocationPage
        ? "min-h-[70vh]"
        : "min-h-screen");

  const textBlock = (
    <div className={showQuoteForm ? "lg:col-span-3" : undefined}>
      <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl">
        {headline ?? defaultHeadline}
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-200">
        {subheadline ?? defaultSubheadline}
      </p>
      {readTime != null && (
        <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm text-gray-200">
          {readTime} min read
        </span>
      )}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
        {!showQuoteForm && (
          <Link href="#contact">
            <Button variant="primary" size="lg">
              Get a Paterson Roofing Estimate
            </Button>
          </Link>
        )}
        <PhoneButton compact={false} />
      </div>
    </div>
  );

  return (
    <section
      className={`relative flex ${heightClass} items-center bg-gradient-to-br from-navy-dark via-navy to-navy-light`}
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-section-sm text-center sm:px-6 lg:px-8 lg:py-section lg:text-left">
        {showQuoteForm ? (
          <div className="grid items-center gap-10 lg:grid-cols-5">
            {textBlock}
            <div className="lg:col-span-2">
              <HeroQuoteForm />
            </div>
          </div>
        ) : (
          textBlock
        )}
      </div>
    </section>
  );
}
