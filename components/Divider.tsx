type DividerProps = {
  className?: string;
};
export default function Divider({ className }: DividerProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-600" />
      </div>
    </div>
  );
}
