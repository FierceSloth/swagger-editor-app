interface IProps {
  className?: string;
}

export function BracketsIcon({ className }: IProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        d="M9.5 5H9a2 2 0 0 0-2 2v2c0 1-.6 3-3 3 1 0 3 .6 3 3v2a2 2 0 0 0 2 2h.5m5-14h.5a2 2 0 0 1 2 2v2c0 1 .6 3 3 3-1 0-3 .6-3 3v2a2 2 0 0 1-2 2h-.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
