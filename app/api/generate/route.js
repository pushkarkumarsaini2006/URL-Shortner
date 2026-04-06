
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

function resolveBaseUrl(configuredBaseUrl, requestOrigin) {
    const normalizedConfigured = normalizeBaseUrl(configuredBaseUrl, requestOrigin)
    if (isLocalOrigin(normalizedConfigured) && !isLocalOrigin(requestOrigin)) {
        return requestOrigin
    }

    return normalizedConfigured
}

function normalizeShortCode(value) {
    return (value || '').trim().toLowerCase()
}

export async function POST(request) {
    try {
        const body = await request.json()
        const requestOrigin = new URL(request.url).origin
        
        // Validate input
        const shortCode = normalizeShortCode(body.shorturl)
        if (!body.url || !shortCode) {
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

        // Prevent self-referential links that just reopen this application.
        const normalizedBaseUrl = resolveBaseUrl(process.env.NEXT_PUBLIC_HOST, requestOrigin)
        let targetHostname
        let appHostname
        try {
            targetHostname = new URL(url).hostname.toLowerCase()
            appHostname = new URL(normalizedBaseUrl).hostname.toLowerCase()
        } catch {
            return Response.json({
                success: false,
                error: true,
                message: 'Please enter a valid destination URL'
            }, { status: 400 })
        }

        if (targetHostname === appHostname) {
            return Response.json({
                success: false,
                error: true,
                message: 'Destination URL cannot be this BitLinks domain. Please enter a different website URL.'
            }, { status: 400 })
        }

        // Validate short URL format (alphanumeric and some special chars)
        const shortUrlRegex = /^[a-zA-Z0-9_-]+$/
        if (!shortUrlRegex.test(shortCode)) {
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
        const existingDoc = await collection.findOne({ shorturl: shortCode })
        if (existingDoc) {
            await collection.updateOne(
                { _id: existingDoc._id },
                {
                    $set: {
                        url,
                        updatedAt: new Date()
                    }
                }
            )

            return Response.json({
                success: true,
                error: false,
                message: 'Short URL updated successfully',
                shortUrl: `${resolveBaseUrl(process.env.NEXT_PUBLIC_HOST, requestOrigin)}/${shortCode}`
            })
        }

        // Insert the new URL
        const result = await collection.insertOne({
            url: url,
            shorturl: shortCode,
            createdAt: new Date()
        })

        const baseUrl = resolveBaseUrl(process.env.NEXT_PUBLIC_HOST, requestOrigin)

        return Response.json({
            success: true, 
            error: false, 
            message: 'URL Generated Successfully',
            shortUrl: `${baseUrl}/${shortCode}`
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