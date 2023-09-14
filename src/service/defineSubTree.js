export default function defineSubTree(tree, newRootID) {
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