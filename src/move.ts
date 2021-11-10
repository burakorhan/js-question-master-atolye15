type List = { id: string; name: string; files: { id: string; name: string }[] }[];

export default function move(list: List, source: string, destination: string): List {
  function findItem(id: string) {
    for (let i = 0; i < list.length; i += 1) {
      const folder = list[i];
      if (folder.id === id) {
        return folder;
      }

      const file = folder.files.find((f) => f.id === id);

      if (file) {
        return file;
      }
    }
    return null;
  }

  const destinationItem = findItem(destination);
  const sourceItem = findItem(source);

  if (destinationItem && sourceItem) {
    if (!Object.prototype.hasOwnProperty.call(destinationItem, 'files'))
      throw new Error('You cannot specify a file as the destination');
    if (Object.prototype.hasOwnProperty.call(sourceItem, 'files'))
      throw new Error('You cannot move a folder');

    list.forEach((folder) => {
      const indexFile = folder.files.indexOf(sourceItem);
      if (indexFile > -1) folder.files.splice(indexFile, 1);
    });

    list.forEach((folder) => {
      if (folder === destinationItem) folder.files.push(sourceItem);
    });
  }

  return list;
}
