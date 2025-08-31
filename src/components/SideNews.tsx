import Link from 'next/link';
import { useRecentArticles } from '../hooks/useRecenArticles';

export const SideNews = () => {
    const recentArticles = useRecentArticles();

    return (
        <div>
            {recentArticles.slice(3, 5).map(({ title, id, publishedAt, slug }) => {

                const formattedDate = new Intl.DateTimeFormat('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(publishedAt));

                return (

                    <div key={id} className='w-2/3'>
                        <Link href={`/article/${slug}`} className="w-full no-underline text-inherit">
                            <div className="card w-full">
                                <div className="card-body">
                                    <h5 className="truncated-title font-title text-base large-desktop:text-xl">
                                        {title}
                                    </h5>
                                    <p className="card-text"><small className="text-date">{formattedDate}</small></p>
                                </div>
                            </div>
                        </Link>

                    </div>
                )
            })
            }
        </div>
    )
}
