import React, {useState} from "react"

function TreeNode ({ data }) {
    const [isCollapsed, setCollapsed ] = useState(true)

    const toggleCollapse = () => {
        setCollapsed(prevIsCollapsed => !prevIsCollapsed)
    }

    return(
        <div>
            <div>
                {data.name} <button  onClick={toggleCollapse} style={{ cursor: 'pointer' }}>{isCollapsed ? '▶' : '▼'}</button>
                {!isCollapsed && data.children && data.children.length > 0 && (
                    <div style={{ marginLeft: '20px' }}>
                        {data.children.map((child) =>(
                        <TreeNode key = {child.id} data={child} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function CollapsableTree ({ data }) {
    return(
        <div>
            {data.map((item) => (
                <TreeNode key = {item.id} data={item} />
            ))}
        </div>
    )
}