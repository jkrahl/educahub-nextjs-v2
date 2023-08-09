import styles from './page.module.css'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Comment from '@/components/Comment/Comment'
import IComment from '@/interfaces/Comment'

export default function CommentsPanel({ postURL }:{postURL: string}) {
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
                    comments.map((comment: IComment) => (
                        <Comment
                            user={comment.user}
                            date={comment.createdAt}
                            text={comment.text}
                        />
                    ))
                )}
                </div>
    )
}