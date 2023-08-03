'use client'
import Spinner from 'react-bootstrap/Spinner'
import Post from '@/components/Post/Post'
import SearchBar from '@/components/SearchBar/SearchBar'
import PostsPanel from '@/components/PostsPanel/PostsPanel'
import IPost from '@/interfaces/Post'
import styles from './page.module.css'
import { useEffect, useState } from 'react'


export default function SearchResults() {
    // Get query from URL
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get('q')

    if (!query) {
        return (
            <div className={styles.center}>
                <h1>404</h1>
                <p>No se encontró la página</p>
            </div>
        )
    }

    const [postsData, setPostsData] = useState<IPost[]>([])
    const [loading, setLoading] = useState(true)
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        ;(async () => {
            // URL encode query
            const queryE = encodeURIComponent(urlParams.get('q') as string)
            const res = await fetch(
                `https://api.educahub.app/posts?q=` + queryE
            )
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
                <h2 className={styles.title}>Resultados de búsqueda</h2>
                <PostsPanel posts={postsData} loading={loading} empty={empty} />
            </div>
        </main>
    )
}
