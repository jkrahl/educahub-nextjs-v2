'use client'
import Button from 'react-bootstrap/Button'
import type { FormEvent } from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function validateEmail(email: string) {
        const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return validRegex.test(email)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setMessage('Correo electrónico inválido.')
            return
        }
        const res = await fetch('https://api.educahub.app/auth/register', {
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
        const response = await res.json()
        if (res.status != 201) {
            setMessage(response.message)
        } else {
            localStorage.setItem('token', response.token)
            setMessage(`Registro completado. Redirigiendo..`)
            // Redirect to home page
            window.location.href = '/'
        }
    }

    return (
        <>
            <h1>Registrarse en EducaHub</h1>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre de usuario"
                        onChange={(e: any) => setUsername(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Mínimo 3 caracteres. Tu nombre de usuario será visible
                        para todos los usuarios.
                    </Form.Text>
                </Form.Group>
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
                    <Form.Text className="text-muted">
                        Mínimo 3 caracteres. Tu contraseña será encriptada
                        mediante SHA-256.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Iniciar sesión
                </Button>
            </Form>
        </>
    )
}
