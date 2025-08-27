export const ShareButtons = ({ title, url }: { title: string; url: string }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(`📢 Mirá esta nota: ${title}`);

    return (
        <div className="flex gap-4 mt-6">
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                📘 Compartir en Facebook
            </a>

            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
            >
                🐦 Compartir en Twitter
            </a>
        </div>
    );
};
