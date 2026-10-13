export const csvToHierarchy = (data) => {
    const hierarchyGenerator = d3.stratify()
        .id(d=>d.child)
        .parentId(d=>d.parent);
    
    const root = hierarchyGenerator(data);
    const descendants = root.descendants();
    const leaves = root.leaves();

    return [root, descendants, leaves];
};