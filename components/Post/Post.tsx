import styles from './Post.module.css'
import Link from 'next/link'
// Post component with props for title, description, user, date, subject, unit and url
export default function Post({
    type,
    title,
    user,
    date,
    subject,
    unit,
    url,
}: {
    type: string
    title: string
    user: string
    date: string
    subject: string
    unit: string
    url: string
}) {
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <article className={styles.box}>
            <Link
                href={'/posts/' + url}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                {type === 'Document' && <Document />}
                {type === 'Question' && <Question />}
                {type === 'Link' && <URL />} {title}
                <br />
                u/{user} · {formattedDate} · {subject} · {unit}
            </Link>
        </article>
    )
}

function Document() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7 18H17V16H7V18Z" fill="currentColor" />
            <path d="M17 14H7V12H17V14Z" fill="currentColor" />
            <path d="M7 10H11V8H7V10Z" fill="currentColor" />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                fill="currentColor"
            />
        </svg>
    )
}

function Question() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4Z"
                fill="currentColor"
            />
            <path
                d="M4 13C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15H20C20.5523 15 21 14.5523 21 14C21 13.4477 20.5523 13 20 13H4Z"
                fill="currentColor"
            />
            <path
                d="M6 10C6 9.44772 6.44772 9 7 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H7C6.44772 11 6 10.5523 6 10Z"
                fill="currentColor"
            />
            <path
                d="M7 17C6.44772 17 6 17.4477 6 18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18C18 17.4477 17.5523 17 17 17H7Z"
                fill="currentColor"
            />
        </svg>
    )
}

function URL() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.8284 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z"
                fill="currentColor"
            />
            <path
                d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z"
                fill="currentColor"
            />
            <path
                d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z"
                fill="currentColor"
            />
        </svg>
    )
}
