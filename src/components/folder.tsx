import React, { useState } from 'react';

const FolderComponent = (props: any) => {
  const { folderData, handleInsertNode } = props;
  console.log('handleInsertNode :', handleInsertNode);
  const [expand, setExpand] = React.useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });
  const handlePropogation = (e: any, isFolder: any) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e: any) => {
    if (e.target.value && e.keyCode === 13) {
      //add folder
      handleInsertNode(folderData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (folderData.isFolder) {
    return (
      <div className="mt-2">
        <div
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span className="">📂{folderData.name}</span>
          <span className="bg-gray-500">
            <button
              onClick={(e) => handlePropogation(e, false)}
              className="ml-2"
            >
              Add Files+
            </button>
            <button
              onClick={(e) => handlePropogation(e, true)}
              className="ml-2"
            >
              Add Folder+
            </button>
          </span>
        </div>
        <div className="ml-3" style={{ display: expand ? 'block' : 'none' }}>
          {showInput.visible && (
            <div>
              <span> {showInput.isFolder ? '📂' : '📄'} </span>
              <input
                onKeyDown={onAddFolder}
                type="text"
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                }}
                autoFocus
              />
            </div>
          )}
          {folderData.items.map((item: any) => {
            return (
              <FolderComponent
                handleInsertNode={handleInsertNode}
                folderData={item}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div className="mt-0">{folderData.name}</div>;
  }
};

export default FolderComponent;
