export function createTree(categories, parent_id = null){
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

export function defineSubTree(tree, newRootID) {
    let result = null
    function findCurrentRoot(tree) {
        if (tree.id == newRootID) {
            result = tree
            return
        } else if (tree.children) {
            for (const child of tree.children) {
                findCurrentRoot(child)
            }
        }
        return
    }
    findCurrentRoot(tree)
    return result
}

export function collectChildrenIDs(tree){
    const childrenIDs = []
    function pushChildren(node){
        childrenIDs.push(node.id)
        if (node.children){
            for (const child of node.children){
                pushChildren(child)
            }
        }
        return
    }
    pushChildren(tree)
    return childrenIDs
}