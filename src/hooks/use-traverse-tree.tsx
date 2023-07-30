import React from 'react';

const useTravseTree = () => {
  function insertNode(tree: any, folderId: any, item: any, isFolder: any) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        items: [],
        name: item,
        isFolder
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj: any) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }

  const deleteFolder = () => {};
  const update = () => {};

  return { insertNode };
};

export default useTravseTree;
