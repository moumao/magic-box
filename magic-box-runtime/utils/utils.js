export const componentFactory = (createElement, components, componentList) => {
  const res = [];
  if (components && Array.isArray(components)){
    const list = components.map(component => {
      if (typeof component === 'string'){
          return component;
      }
      const { type, components, data } = component;
      return createElement(getComponent(componentList, type), distributeData(data),
        componentFactory(createElement, components, componentList))
      });
    res.push(...list);
  }
  return res
}

export const distributeData = data => {
  const res = {};
  if (data && typeof data === 'object'){
    for(let key in data){
      if(key === 'style' || key === 'props' || key === 'domProps' || key === 'class' || key === 'attrs'){
        res[key] = data[key];
      }
      if(key === 'nativeOn'){
        res[key] = {};
        for(let j in data[key]){
          res[key][j] = getFunction(data[key][j]);
        }
      }
    }
  }
  return res
}

export const getComponent = (componentList, type) => {
  if(type === 'div'){
    return type
  }
  return componentList[type]
}

export const getFunction = fun => {
  return () => eval(fun);
}

export const jsonToObjEscape = str =>  {
    return str.replace("\\n", "\\\\n").replace("\\r", "\\\\r").replace("\\t", "\\\\t");
}

export const objTojsonEscape = str =>  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}
