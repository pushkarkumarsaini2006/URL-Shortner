
import clientPromise from "@/lib/mongodb"

function normalizeBaseUrl(baseUrl, fallbackOrigin) {
    const rawBase = (baseUrl || "").trim()
    const fixedBase = rawBase
        .replace(/^ttp:\/\//i, "http://")
        .replace(/^ttps:\/\//i, "https://")

    if (!fixedBase) return fallbackOrigin

    try {
        return new URL(fixedBase).origin
    } catch {
        return fallbackOrigin
    }
}

function isLocalOrigin(origin) {
    try {
        const { hostname } = new URL(origin)
        return hostname === 'localhost' || hostname === '127.0.0.1'
    } catch {
        return false
    }
}

function resolvePublicBaseUrl(configuredBaseUrl, requestOrigin) {
    const normalizedConfigured = normalizeBaseUrl(configuredBaseUrl, requestOrigin)

    // If deployment env accidentally contains localhost, use the actual request origin.
    if (isLocalOrigin(normalizedConfigured) && !isLocalOrigin(requestOrigin)) {
        return requestOrigin
    }

    return normalizedConfigured
}

export async function POST(request) {
    try {
        const body = await request.json()
        
        // Validate input
        if (!body.url || !body.shorturl) {
            return Response.json({
                success: false, 
                error: true, 
                message: 'URL and short URL are required'
            }, { status: 400 })
        }

        // Validate URL format
        let url = body.url
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url
        }

        // Validate short URL format (alphanumeric and some special chars)
        const shortUrlRegex = /^[a-zA-Z0-9_-]+$/
        if (!shortUrlRegex.test(body.shorturl)) {
            return Response.json({
                success: false, 
                error: true, 
                message: 'Short URL can only contain letters, numbers, hyphens, and underscores'
            }, { status: 400 })
        }

        const client = await clientPromise();
        const db = client.db("bitlinks")
        const collection = db.collection("url")

        // Check if the short url already exists
        const existingDoc = await collection.findOne({ shorturl: body.shorturl })
        if (existingDoc) {
            return Response.json({
                success: false, 
                error: true, 
                message: 'Short URL already exists! Please choose a different one.'
            }, { status: 409 })
        }

        // Insert the new URL
        const result = await collection.insertOne({
            url: url,
            shorturl: body.shorturl,
            createdAt: new Date()
        })

        const requestOrigin = new URL(request.url).origin
        const baseUrl = resolvePublicBaseUrl(process.env.NEXT_PUBLIC_HOST, requestOrigin)

        return Response.json({
            success: true, 
            error: false, 
            message: 'URL Generated Successfully',
            shortUrl: `${baseUrl}/${body.shorturl}`
        })

    } catch (error) {
        console.error('API Error:', error)
        return Response.json({
            success: false, 
            error: true, 
            message: 'Internal server error'
        }, { status: 500 })
    }
}