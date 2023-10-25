import "./styles/single-category-card.css";
export default function SingleCategoryCard(props) {
    return (
        <>
            <article className="single-category-card">
                <img src={props.imgUrl} alt={props.altText} />
                <h3>{props.name}</h3>
            </article>
        </>
    )
}