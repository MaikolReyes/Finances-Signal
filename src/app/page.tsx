import { CarouselSlider, NewsDown, NewsDownLeft, Sidebar } from "../home";

// Cambiar de export const a export default
export default function LatestNews() {
  return (
    <>
      <div className="container-section">
        <CarouselSlider />
        <Sidebar />
      </div>

      <div className="w-11/12 mt-5 md:mt-0 md:w-full md:p-3 2xl:w-4/5 mx-auto">
        <NewsDown />
        <NewsDownLeft />
      </div>
    </>
  )
}