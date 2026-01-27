
// export const getSortedTasks = (a: TaskBase, b: TaskBase) => {
//     if (a.canClaim && !b.canClaim) return -1;
//     if (!a.canClaim && b.canClaim) return 1;

//     if (a.canClaim && b.canClaim) {
//         return new Date(b.createdAt).getTime() - new Date(a.claimedAt).getTime();
//     }

//     return 0;
// }