const replaceStringsWithContextValues = (obj, replacements={}) => {
  // If the input is an object, return it as is
  if (typeof obj === "object" || obj === null) {
    return obj;
  }
  
  const newStr = Object.keys(replacements).reduce((carry,item)=>carry.replace(`{${item}}`,replacements[item]),obj)

  return newStr;
};

export default replaceStringsWithContextValues;
