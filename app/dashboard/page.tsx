'use client'
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Post from '@/components/Post/Post'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

interface IPost extends Document {
    type: string
    title: string
    description?: string
    user: string
    url: string
    createdAt: string
    subject?: string
    unit?: string
}



export default function Home() {
    const [postsData, setPostsData] = useState([] as IPost[])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const res = await fetch('https://api.educahub.app/posts')
            if (!res.ok) {
                console.log('Error fetching posts')
                return
            }
            const json = (await res.json()) as IPost[]
            setPostsData(json)
            setLoading(false)
        })()
    }, [])

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>EducaHub</h1>
            <div id="buscador" className={styles.center}>
                <SearchBar />
            </div>

            <div className="recent-posts" style={{
                marginTop: '4rem'
            }}>
                <h2 className={styles.title}>Recientes</h2>
                {loading ? (
                    <div className={styles.center}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    postsData.map((post: IPost) => (
                        <Post
                            type={post.type}
                            title={post.title}
                            user={post.user}
                            date={post.createdAt}
                            subject={post.subject || ''}
                            unit={post.unit || ''}
                            url={post.url}
                        />
                    ))
                )}
            </div>
        </main>
    )
}

function SearchBar() {
    const [search, setSearch] = useState('')

    // Placeholder will be a random value from the array
    const placeholders = [
        'Derivadas',
        'Dinámica',
        'República',
        'Torque',
    ]
    const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)]

    const handleSearchWord = (e: any) => {
        e.preventDefault()
        // Redirect to search page
        if (search) {
            window.location.href = '/search/?q=' + search
        }
    }

    return (
        <div
            style={{
                width: '100%',
            }}
        >
            <Form onSubmit={handleSearchWord}>
            <InputGroup>
                <Form.Control
                    placeholder={placeholder}
                    aria-label="Buscador de apuntes"
                    aria-describedby="Buscador de apuntes"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-dark" id="button-addon2" type="submit">
                    Buscar
                </Button>
            </InputGroup>
            </Form>

        </div>
    )
}
