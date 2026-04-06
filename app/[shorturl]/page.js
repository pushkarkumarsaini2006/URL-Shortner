import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
    const shorturl = ((await params).shorturl || '').trim().toLowerCase()
    let doc

    try {
        const client = await clientPromise();
        const db = client.db("bitlinks")
        const collection = db.collection("url")

        doc = await collection.findOne({ shorturl: shorturl })
    } catch (error) {
        console.error('Database error:', error)
        notFound()
    }

    if (doc && doc.url) {
        // Normalize known malformed protocol prefixes before redirect.
        let redirectUrl = doc.url
            .replace(/^ttp:\/\//i, 'http://')
            .replace(/^ttps:\/\//i, 'https://')

        // Ensure the URL has a protocol
        if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
            redirectUrl = 'https://' + redirectUrl
        }
        redirect(redirectUrl)
    }

    notFound()
}