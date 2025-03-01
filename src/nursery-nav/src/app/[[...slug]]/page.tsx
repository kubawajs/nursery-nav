import '../../index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
    return [{ slug: [''] }, { slug: ['about'] }, { slug: ['institutions', 'compare'] }]
}

export default function Page() {
    return <ClientOnly />
}