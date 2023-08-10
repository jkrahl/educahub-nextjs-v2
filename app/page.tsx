'use client'
import styles from './page.module.css'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'

export default function Home() {
    // If the user is logged in, redirect to dashboard
    if (localStorage.getItem('token')) {
        window.location.href = '/dashboard'
        return <></>
    }
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>EducaHub</h1>
                <Link href="/login">
                    <Button variant="primary" href="/login">
                        Login
                    </Button>
                </Link>{' '}
                <Link href="/register">
                    {' '}
                    <Button variant="primary" href="/register">
                        Register
                    </Button>
                </Link>
                <br />
            <Link href="/dashboard">Continuar sin iniciar sesión</Link>
        </main>
    )
}
