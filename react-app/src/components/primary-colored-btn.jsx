import rightArrow from "../assests/btn-right-arrow.png";
import "./styles/primary-colored-btn.css";
export default function PrimaryColoredBtn(props) {
    return (
        <>
            <button className="primary-btn">
                <span>{props.value}</span>
                <img src={rightArrow} alt="A green arrow pointing to the right with a white background" />
            </button>
        </>
    )
}