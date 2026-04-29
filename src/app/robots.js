export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/$',
            disallow: '/',
        },
        sitemap: 'https://demo.geophrase.com/sitemap.xml',
    }
}
