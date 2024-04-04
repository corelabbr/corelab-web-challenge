import StarFill from "../icons/StarFill"
import StarOutline from "../icons/StarOutline"

interface Props {
    checked : boolean
    onChange : (value : boolean) => void
}

const Star = (props : Props) => {
    const checked = props.checked
    const onChange = props.onChange

    return (
        <div onClick={() => onChange(!checked)}>
            {checked ?
                <StarFill/>
            :
                <StarOutline/>
            }
        </div>
    )
}

export default Star