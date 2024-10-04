import React, { useState } from 'react'
import CircleColor from './button-circle-color'

const ContentColor: React.FC = () => {

    const [isClicked, setIsClicked] = useState(false)

    const handleButtonClick = () => {
        setIsClicked(!isClicked)
    }

    return (
        <div className="mb-4 p-4 rounded">
            <CircleColor fill={isClicked ? "#FF9AA2" : "#BAE2FF"}
                onClick={handleButtonClick}
                ariaLabel="Toggle Color Button" />
        </div>
    )
}

export default ContentColor
