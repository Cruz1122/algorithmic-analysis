export const metadata = {
  title: "Analizador de Complejidades",
  description: "Frontend Next.js"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
