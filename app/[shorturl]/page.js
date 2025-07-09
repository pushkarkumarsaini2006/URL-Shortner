import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
    const shorturl = (await params).shorturl

    try {
        const client = await clientPromise;
        const db = client.db("bitlinks")
        const collection = db.collection("url")

        const doc = await collection.findOne({ shorturl: shorturl })
        
        if (doc && doc.url) {
            // Ensure the URL has a protocol
            let redirectUrl = doc.url
            if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
                redirectUrl = 'https://' + redirectUrl
            }
            redirect(redirectUrl)
        } else {
            redirect(process.env.NEXT_PUBLIC_HOST || '/')
        }
    } catch (error) {
        console.error('Database error:', error)
        redirect(process.env.NEXT_PUBLIC_HOST || '/')
    }
}