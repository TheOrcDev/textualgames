import { createUIMessageStreamResponse } from 'ai';
import { getRun } from 'workflow/api';

export const maxDuration = 60;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    const startIndexParam = searchParams.get('startIndex');
    const startIndex = startIndexParam
        ? parseInt(startIndexParam, 10)
        : undefined;

    const run = getRun(id);
    const readable = run.getReadable({ startIndex });

    const tailIndex = await readable.getTailIndex();

    return createUIMessageStreamResponse({
        stream: readable,
        headers: {
            'x-workflow-stream-tail-index': String(tailIndex),
        },
    });
}
