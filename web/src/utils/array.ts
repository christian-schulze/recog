function deleteElement(array: any[], elementToDelete: any) {
  const elements = [...array];
  const index = elements.findIndex((element) => element === elementToDelete);
  elements.splice(index, 1);

  return elements;
}

export { deleteElement };
