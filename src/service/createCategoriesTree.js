export default function createTree(categories, parent_id = null){
    const result = []
    categories.forEach((item) => {
        if (item.parent_id == parent_id) {
            const children = createTree(categories, item.id)

                if (children.length) {
                    item.children = children
                }

                result.push(item)
        }
    })
    return result
}