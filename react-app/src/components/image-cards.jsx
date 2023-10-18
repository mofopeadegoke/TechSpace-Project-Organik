export default function ImgCards(props) {
    return (
        <>
            <article className="img-card" style={{backgroundImage: props.imgUrl}}>
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