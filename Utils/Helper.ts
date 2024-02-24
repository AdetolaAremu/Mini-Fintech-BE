export const filterObj = <T extends Record<string, unknown>>(
  obj: T,
  ...allowedFields: (keyof T)[]
): Partial<T> => {
  const newObj: Partial<T> = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el as keyof T)) {
      newObj[el as keyof T] = obj[el] as T[keyof T];
    }
  });
  return newObj;
};

export const generateTransactionId = () => {
  return Math.random().toString(36).substr(2, 9);
};
