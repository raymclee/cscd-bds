interface StatusIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function StatusIcon({ className, ...props }: StatusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={className}
      {...props}
    >
      <rect x="1" y="1" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="6" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}
