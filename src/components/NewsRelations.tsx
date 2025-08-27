import { Link } from 'react-router-dom';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useRecentArticles } from '../hooks/useRecenArticles';

export const NewsRelations = () => {

    const recentArticles = useRecentArticles();

    return (
        <div className="grid grid-cols-1 tablet:grid-cols-2 w-full tablet:w-2/4 large-desktop:w-2/6 mx-auto gap-10 p-2 mt-3W large-desktop:mb-10">
            {
                recentArticles.slice(1, 3).map(({ id, title, cover, contenido, publishedAt, slug }) => {
                    const formattedDate = new Intl.DateTimeFormat('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(publishedAt));

                    return (
                        <div key={id}>
                            <div className="card w-full">
                                <Link to={`/article/${slug}`} className="no-underline text-inherit">
                                    <img src={cover} className="object-cover rounded-sm h-48 large-desktop:h-52" alt="foto" />
                                </Link>
                                <div className="card-body">
                                    <h3 className="truncated-title font-title text-lg large-desktop:text-xl">{title}</h3>
                                    <div className="truncated-text font-secondary text-sm desktop:text-base large-desktop:text-lg">
                                        <BlocksRenderer content={contenido} />
                                    </div>
                                    <p className="card-text"><small className="text-date">{formattedDate}</small></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
