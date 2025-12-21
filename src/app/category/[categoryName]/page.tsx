import CategoryContent from "./CategoryContent";

export async function generateMetadata({
    params,
}: {
    params: { categoryName: string };
}) {
    const category = decodeURIComponent(params.categoryName);

    return {
        title: `FinanceSignal | ${category}`,
        alternates: {
            canonical: `https://www.financessignal.com/category/${params.categoryName}`,
        },
    };
}

export default function CategoryPage({
    params,
}: {
    params: { categoryName: string };
}) {
    return <CategoryContent categoryName={params.categoryName} />;
}
