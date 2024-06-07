export const getGroupName = (groupId, groups) => {    
    const group = groups.find(group => group.id === groupId);
    return group ? group.name : '';
  };
  