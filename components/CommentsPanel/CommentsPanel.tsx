import styles from './page.module.css'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Comment from '@/components/Comment/Comment'
import IComment from '@/interfaces/Comment'

export default function CommentsPanel({ postURL }: { postURL: string }) {
    const [comments, setComments] = useState<IComment[]>([])
    const [loadingComments, setLoadingComments] = useState(true)
    const [emptyComments, setEmptyComments] = useState(false)

    useEffect(() => {
        ;(async () => {
            // URL encode query
            const res = await fetch(
                `https://api.educahub.app/posts/` + postURL + '/comments'
            )
            if (!res.ok) {
                // If 404
                if (res.status === 404) {
                    setEmptyComments(true)
                    setLoadingComments(false)
                    return
                }
                console.log('Error fetching comments')
                return
            }
            const json = (await res.json()) as IComment[]
            setComments(json)
            setLoadingComments(false)
        })()
    }, [])

    return (
        <div>
            {loadingComments ? (
                <div className={styles.center}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : emptyComments ? (
                <div className={styles.center}>
                    <p>No se encontraron comentarios</p>
                </div>
            ) : (
                <>
                    <CreateCommentBar postURL={postURL} />
                    {comments.map((comment: IComment) => (
                        <Comment
                            user={comment.user}
                            date={comment.createdAt}
                            text={comment.text}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

function CreateCommentBar({ postURL }: { postURL: string }) {
    const [comment, setComment] = useState<string>('')

    const handlePostComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // If not logged in, alert
        if (!localStorage.getItem('token')) {
            alert('Debes iniciar sesión para comentar')
            return
        }

        // If comment is empty, alert
        if (comment.length < 1) {
            alert('El comentario no puede estar vacío')
            return
        }

        // Post comment
        const res = await fetch(
            `https://api.educahub.app/posts/` + postURL + '/comments',
            {
                body: JSON.stringify({
                    content: comment,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                method: 'POST',
            }
        )
        if (!res.ok) {
            alert('Error al publicar comentario')
            return
        }
        // Reload page
        window.location.reload()
    }

    return (
        <div>
            <Form onSubmit={handlePostComment}>
                <InputGroup>
                    <Form.Control
                        placeholder="Escribe un comentario"
                        aria-label="Escribe un comentario"
                        aria-describedby="Escribe un comentario"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        variant="outline-dark"
                        id="button-addon2"
                        type="submit"
                    >
                        Comentar
                    </Button>
                </InputGroup>
            </Form>
        </div>
    )
}
