'use client'
import Spinner from 'react-bootstrap/Spinner'
import Post from '@/components/Post/Post'
import SearchBar from '@/components/SearchBar/SearchBar'
import PostsPanel from '@/components/PostsPanel/PostsPanel'
import IPost from '@/interfaces/Post'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
    const [postsData, setPostsData] = useState<IPost[]>([])
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(false)

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

            if (json.length === 0) {
                setEmpty(true)
            }
        })()
    }, [])

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>EducaHub</h1>
            <div id="buscador" className={styles.center}>
                <SearchBar />
            </div>

            <div
                className="recent-posts"
                style={{
                    marginTop: '4rem',
                }}
            >
                <h2 className={styles.title}>Recientes</h2>
                <PostsPanel posts={postsData} loading={loading} empty={empty} />
            </div>
        </main>
    )
}
