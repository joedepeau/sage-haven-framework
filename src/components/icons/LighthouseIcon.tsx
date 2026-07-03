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
    <path d="M12 2v2" />
    <path d="M8 6h8l-2 14H10L8 6z" />
    <path d="M10 6V4h4v2" />
    <path d="M8 20h8" />
    <path d="M10 12h4" />
    <path d="M6 10l-2 2" />
    <path d="M18 10l2 2" />
  </svg>
);
