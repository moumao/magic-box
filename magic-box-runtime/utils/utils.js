export function componentFactory(createElement, components, componentList){
  const res = [];
  if (components && Array.isArray(components)){
    const list = components.map(component => {
      const { type, components, data } = component;
      return createElement(getComponent(componentList, type), distributeData(data),
        componentFactory(createElement, components, componentList))
      });
    res.push(...list);
  }
  return res
}

export function distributeData(data){
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

export function getComponent(componentList, type) {
  if(type === 'div'){
    return type
  }
  return componentList[type]
}

export function getFunction(fun) {
  return () => eval(fun);
}
