'use client'
import Button from 'react-bootstrap/Button'
import type { FormEvent } from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

export default function Login({ params }: { params: { token: string } }) {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('https://api.educahub.app/auth/reset/'+params.token, {
            body: JSON.stringify({
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
            setMessage(`Contraseña restaurada. Redirigiendo..`)
            // Redirect to home page
            window.location.href = '/login'
        }
    }

    return (
        <>
            <h1>Nueva contraseña</h1>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nueva contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Mínimo 3 caracteres. Tu contraseña será encriptada
                        mediante SHA-256.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Confirmar
                </Button>
            </Form>
        </>
    )
}
