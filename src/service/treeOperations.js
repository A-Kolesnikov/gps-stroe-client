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