export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080c12] flex items-center justify-center relative overflow-hidden px-4">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.05)_0%,transparent_70%)] pointer-events-none" />
      {/* Hex pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 17.5 L55 42.5 L30 55 L5 42.5 L5 17.5 Z' fill='none' stroke='%2339FF14' stroke-width='1'/%3E%3C/svg%3E\")", backgroundSize: "60px 60px" }} />
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}
