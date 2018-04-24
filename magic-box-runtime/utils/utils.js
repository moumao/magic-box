export function componentFactory(createElement, components, componentList){
  const res = [];
  if (components && Array.isArray(components)){
    const list = components.map(component => {
      const { type, components } = component;
      return createElement(componentList[type], distributeData(component),
        componentFactory(createElement, components, componentList))
      });
    res.push(...list);
  }
  return res;
}

export function distributeData(component){
  const res = {};
  if (component && typeof component === 'object'){
    for(let key in component){
      if(key === 'style' || key === 'props'){
        res[key] = component[key];
      }
    }
  }
  return res;
}

export function getMockSchema(id) {
  return {
    "data":{
      "globalData":{
      },
      "components":[
          {
            "type":"button",
            "style": {
              "width":"100%",
              "height":"3rem",
              "line-height": "3rem",
              "color":"#4DA9EB",
              "background-color": "rgb(58,43,147)"
            },
            props: {
              innerText: 'bar'
            },
            "components":null
          },
          {
            "type":"button",
            "components":null
          },
          {
            "type":"button",
            "style": {
              "width":"50%",
              "height":"5rem",
              "line-height": "5rem",
              "color":"#cbeb4d",
              "background-color": "rgb(147,43,62)"
            },
            "components":null
          }
      ]
    }
  }
}
