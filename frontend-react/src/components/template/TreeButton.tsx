import React, { ButtonHTMLAttributes, useState } from 'react'

interface TreeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    handleButtonClick?: Function
}

const TreeButton: React.FC<TreeButtonProps> = ({ handleButtonClick }) => {

    const [closed, setClosed] = useState(true)

    return (
        <button
            onClick={() => {
                // handleButtonClick()
                setClosed(!closed)
            }}
        >
            {closed ? <i className="fas fa-chevron-right"/> : <i className="fas fa-chevron-down"/>}
        </button>
    )
}

export default TreeButton;