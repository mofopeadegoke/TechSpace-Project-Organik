import TitleImage from "../components/title-image"
import titlebg from '../assests/aboutbg.png';
export default function ShopPage() {
    return (
        <>
            <article className="shop-page-main">
                <TitleImage text='Shop Product' imageUrl={titlebg} />
            </article>
        </>
    )
}