"use client";

import { Link } from "@/components/compat/router";
import "./SpecularButton.css";

const VARIANTS = {
  dark: {
    tint: "#111827",
    tintOpacity: 1,
    textColor: "#f5f5f5",
    shine: "rgba(255,255,255,0.45)",
  },
  light: {
    tint: "#ffffff",
    tintOpacity: 1,
    textColor: "#111111",
    shine: "rgba(255,255,255,0.85)",
  },
  brand: {
    tint: "#0b5f58",
    tintOpacity: 1,
    textColor: "#ffffff",
    shine: "rgba(255,255,255,0.55)",
  },
};

export default function SpecularButton({
  children = "Get Started",
  size = "md",
  radius = 999,
  tint,
  tintOpacity,
  blur = 0,
  textColor,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  to,
  variant = "dark",
  fullWidth = false,
  // Kept for API compatibility — shine is CSS-driven now
  autoAnimate = true,
  followMouse = false,
  lineColor,
  baseColor,
  intensity,
  shineSize,
  shineFade,
  thickness,
  speed,
  proximity,
}) {
  const preset = VARIANTS[variant] || VARIANTS.dark;
  const resolved = {
    tint: tint ?? preset.tint,
    tintOpacity: tintOpacity ?? preset.tintOpacity,
    textColor: textColor ?? preset.textColor,
    shine: preset.shine,
  };

  const sharedProps = {
    disabled,
    onClick,
    className: [
      "specular-button",
      `specular-button--${size}`,
      `specular-button--${variant}`,
      fullWidth ? "specular-button--full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" "),
    style: {
      "--sb-radius": `${radius}px`,
      "--sb-tint": resolved.tint,
      "--sb-tint-opacity": resolved.tintOpacity,
      "--sb-blur": `${blur}px`,
      "--sb-text-color": resolved.textColor,
      "--sb-shine": resolved.shine,
    },
  };

  const inner = (
    <>
      <span className="specular-button__shine" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} {...sharedProps}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} {...sharedProps}>
      {inner}
    </button>
  );
}
