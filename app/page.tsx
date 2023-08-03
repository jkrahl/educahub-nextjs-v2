'use client'
import styles from './page.module.css'
import Button from 'react-bootstrap/Button'

export default function Home() {
    // If the user is logged in, redirect to dashboard
    if (localStorage.getItem('token')) {
        window.location.href = '/dashboard'
        return <></>
    }
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>EducaHub</h1>
                <a href="/login">
                    <Button variant="primary" href="/login">
                        Login
                    </Button>
                </a>{' '}
                <a href="/register">
                    {' '}
                    <Button variant="primary" href="/register">
                        Register
                    </Button>
                </a>
                <br />
            <a href="/dashboard">Continuar sin iniciar sesión</a>
        </main>
    )
}
