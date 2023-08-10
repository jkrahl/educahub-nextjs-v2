'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './NavBar.css'

function logout() {
    localStorage.removeItem('token')
    window.location.href = '/'
}

export default function NavBar() {
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        // Get username from JWT
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        const payload = token.split('.')[1]
        const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8')
        const { username } = JSON.parse(decodedPayload)
        setUsername(username)
    }, [])

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/dashboard">
                    <Image
                        src="/logo.png"
                        alt="EducaHub"
                        width={32}
                        height={26}
                        layout="fixed"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="text-body">
                            Inicio
                        </Nav.Link>
                        <Nav.Link href="/documents" className="text-body">
                            Apuntes
                        </Nav.Link>
                        <Nav.Link href="/questions" className="text-body">
                            Foro
                        </Nav.Link>
                        <Nav.Link href="/links" className="text-body">
                            Links
                        </Nav.Link>
                        <Nav.Link href="/subjects" className="text-body">
                            Asignaturas
                        </Nav.Link>
                        {username ? (
                            <>
                                <Nav.Link href={'u/' + username} className="text-body">
                                    <Person /> {username}
                                </Nav.Link>
                                <Nav.Link href="" onClick={logout} className="text-body">
                                    Cerrar sesión
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/login" className="text-body">
                                    Iniciar sesión
                                </Nav.Link>
                                <Nav.Link
                                    href="/register"
                                    className="text-body"
                                >
                                    Registrarse
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function Person() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                fill="currentColor"
            />
            <path
                d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                fill="currentColor"
            />
        </svg>
    )
}
