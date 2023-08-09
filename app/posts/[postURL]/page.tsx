'use client'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import CommentsPanel from '@/components/CommentsPanel/CommentsPanel'
import IPost from '@/interfaces/Post'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function PostView({ params }: { params: { postURL: string } }) {
    const [postData, setPostData] = useState<IPost | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        ;(async () => {
            // URL encode query
            const res = await fetch(
                `https://api.educahub.app/posts/` + params.postURL
            )
            if (!res.ok) {
                // If 404
                if (res.status === 404) {
                    setEmpty(true)
                    setLoading(false)
                    return
                }
                console.log('Error fetching posts')
                return
            }
            const json = (await res.json()) as IPost
            setPostData(json)
            setLoading(false)

            // Set metadata
            document.title = json.title + ' - EducaHub'
        })()
    }, [])

    return (
        <main className={styles.main}>
            <div>
                {loading ? ( // If loading
                    <div className={styles.center}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : empty ? ( // If empty
                    <div className={styles.center}>
                        <p>No se encontraron resultados</p>
                    </div>
                ) : (
                    // If loaded
                    <div>
                        <h2 className={styles.title}>{postData?.title}</h2>
                        <div id="key-data" className={styles.alignText}>
                            <span>
                                by{' '}
                                <a href={'/u/' + postData?.user}>
                                    u/{postData?.user}
                                </a>
                                {' · '}
                                {postData &&
                                    new Date(
                                        postData?.createdAt
                                    ).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                            </span>
                            <br />
                            <b>
                                {postData?.subject}
                                {' · '}
                                {postData?.unit}
                            </b>
                        </div>

                        {postData?.description && ( // If description exists
                            <div>
                                <h4>
                                    <span>Descripción</span>
                                </h4>
                                <div className={styles.postContent}>
                                    <p>{postData?.description}</p>
                                </div>
                            </div>
                        )}
                        {postData?.type === 'Document' && (
                            <ButtonGroup>
                                    <Button
                                        variant="primary"
                                        href={
                                            'https://educahub.s3.eu-central-1.amazonaws.com/' +
                                            postData.url +
                                            '.pdf'
                                        }
                                        target="_blank"
                                    >
                                        Ver
                                        <External />
                                    </Button>
                                    <Button
                                        variant="success"
                                        href={
                                            'https://educahub.s3.eu-central-1.amazonaws.com/' +
                                            postData.url +
                                            '.pdf'
                                        }
                                    >
                                        Descargar
                                    </Button>
                            </ButtonGroup>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.comments}>
                <h4>
                    <span>Comentarios</span>
                </h4>
                <CommentsPanel postURL={params.postURL} />
            </div>
        </main>
    )
}

function External() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z"
                fill="currentColor"
            />
            <path
                d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z"
                fill="currentColor"
            />
        </svg>
    )
}
