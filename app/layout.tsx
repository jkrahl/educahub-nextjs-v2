import { UserProvider } from '@auth0/nextjs-auth0/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import NavBar from '@/components/NavBar/NavBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'EducaHub',
    description: 'Recursos para estudiantes de Catalunya',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <UserProvider>
                <body>
                    <NavBar />
                    <div className="container">{children}</div>
                </body>
            </UserProvider>
        </html>
    )
}
