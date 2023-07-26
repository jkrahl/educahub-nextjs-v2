import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Restaurar contraseña - EducaHub',
    description: 'Red de estudiantes de Catalunya',
}

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main>   
        {children}
      </main>
    )
  }