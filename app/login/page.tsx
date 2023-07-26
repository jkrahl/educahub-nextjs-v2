'use client'
import Button from 'react-bootstrap/Button'
import type { FormEvent } from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('https://api.educahub.app/auth/login', {
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
        const response = await res.json()
        if (res.status != 200) {
            setMessage(response.message)
        } else {
            localStorage.setItem('token', response.token)
            setMessage(`Inicio de sesión correcto. Redirigiendo..`)
            // Redirect to home page
            window.location.href = '/'
        }
    }

    return (
        <>
            <h1>Iniciar sesión en EducaHub</h1>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="E-Mail"
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Iniciar sesión
                </Button>
                &nbsp;
                <a href="/recovery">
                    {' '}
                    <Button variant="secondary">Olvidé mi contraseña</Button>
                </a>
            </Form>
        </>
    )
}
