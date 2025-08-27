import { CarouselSlider, NewsDown, NewsDownLeft, Sidebar } from "../home";

// Cambiar de export const a export default
export default function LatestNews() {
  return (
    <>
      <div className="grid grid-cols-1 p-3 gap-3 w-full mx-auto items-start tablet:grid-cols-2 large-desktop:w-4/5 large-desktop:gap-5">
        <CarouselSlider />
        <Sidebar />
      </div>

      <div>
        <NewsDown />
        <NewsDownLeft />
      </div>
    </>
  )
}