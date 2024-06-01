export async function POST(req) {
    const formData = await req.formData();

    if (formData.has('file')) {
        const file = formData.get('file');
    }
};