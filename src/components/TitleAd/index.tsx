import { isPropertySignature } from "typescript"

interface ITitleAd {
    value: string
    visible: boolean
}
const TitleAd = (props: ITitleAd) => {
    const mostra = props.visible ? "block" : "none"
    const divStyle = {
        display : mostra
    }
    return (
        <h2 style={divStyle}>
            {props.value}
        </h2>
    )
}

export default TitleAd