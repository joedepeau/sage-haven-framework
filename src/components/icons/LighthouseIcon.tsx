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
    <path d="M9 3h6l1 3H8z" />
    <path d="M8 6h8l-2 14H10z" />
    <path d="M10 10h4" />
    <path d="M9.5 14h5" />
    <path d="M5 8l-3 2" />
    <path d="M19 8l3 2" />
    <path d="M6 11.5L3 13" />
    <path d="M18 11.5l3 1.5" />
  </svg>
);
