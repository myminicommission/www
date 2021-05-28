export default function Page({ children }) {
  return (
    <div>
      <div className="lg:px-4">
        <div className="mx-auto my-0 max-w-none lg:max-w-7xl lg:my-8">
          {children}
        </div>
      </div>
    </div>
  );
}
