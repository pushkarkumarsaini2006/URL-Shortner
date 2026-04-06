import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

export default async function Page({ params }) {
    const shorturl = (await params).shorturl

    try {
        const client = await clientPromise();
        const db = client.db("bitlinks")
        const collection = db.collection("url")

        const doc = await collection.findOne({ shorturl: shorturl })
        
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
        } else {
            redirect('/')
        }
    } catch (error) {
        console.error('Database error:', error)
        redirect('/')
    }
}