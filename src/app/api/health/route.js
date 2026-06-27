export const dynamic = 'force-dynamic';

const upSinceIST = () => {
    const startMs = Date.now() - process.uptime() * 1000;
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(new Date(startMs));

    const get = type => parts.find(p => p.type === type).value;
    return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
};

export function GET() {
    return Response.json(
        {
            status: 'ok',
            upSince: upSinceIST(),
        },
        {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            }
        }
    );
}
