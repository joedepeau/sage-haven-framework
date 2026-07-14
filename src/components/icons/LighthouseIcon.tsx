import React from "react";

export const LighthouseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Finial */}
    <path d="M12 3V1.5" />
    {/* Lantern room */}
    <path d="M10 3h4v4h-4z" />
    {/* Triangular light rays */}
    <path d="M10 5 L4 3 L4 7 Z" />
    <path d="M14 5 L20 3 L20 7 Z" />
    {/* Balcony */}
    <path d="M9.25 7h5.5" />
    {/* Tower — widens toward the base */}
    <path d="M10.5 7 L8.5 19" />
    <path d="M13.5 7 L15.5 19" />
    {/* Mid-tower band */}
    <path d="M9.5 13h5" />
    {/* Base */}
    <path d="M7.5 19h9v2h-9z" />
    {/* Ground */}
    <path d="M4 22h16" />
  </svg>
);
