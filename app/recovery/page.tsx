'use client'
import Button from 'react-bootstrap/Button'
import type { FormEvent } from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

function validateEmail(email: string) {
    const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return validRegex.test(email)
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setMessage('Correo electrónico inválido')
            return
        }
        const res = await fetch('https://api.educahub.app/auth/reset', {
            body: JSON.stringify({
                email,
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
            setMessage("Te hemos enviado un correo electrónico con las instrucciones para restablecer tu contraseña.")
        }
    }

    return (
        <>
            <h1>Recuperar contraseña</h1>
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
                <Button variant="primary" type="submit">
                    Recuperar
                </Button>
            </Form>
        </>
    )
}
