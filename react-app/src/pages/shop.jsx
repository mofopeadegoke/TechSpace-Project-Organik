import TitleImage from "../components/title-image"
import titlebg from '../assets/aboutbg.png';
import darkSearchIcon from "../assets/dark-search-icon.png";
export default function ShopPage() {
    return (
        <>
            <article className="shop-page-main">
                <TitleImage text='Shop Product' imageUrl={titlebg} />
                <article className="search-container">

                </article>
            </article>
        </>
    )
}