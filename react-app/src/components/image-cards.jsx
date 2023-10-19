import "../components/styles/image-cards.css";
export default function ImgCards(props) {
    return (
        <>
            <article className="img-card" style={{backgroundImage: "../assests/home-section-two-cardImg-one.jpg"}}>
                <article className="content">
                    <p className="curvy-text white-text">
                        {props.curvyText}
                    </p>
                    <h2>{props.mainCardTxt}</h2>
                </article>
            </article>
        </>
    )
}