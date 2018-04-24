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

export function getMockSchema(id) {
  return {
    "data": {
      "baseData": {

      },
      "meta": {

      },
      "components": [
          {
            "type": "div",
            "data": null,
            "components": [{
              "type": "button",
              "data": {
                "style": {
                  "width": "100%",
                  "height": "3rem",
                  "line-height": "3rem",
                  "color":"#4DA9EB",
                  "background-color": "rgb(58,43,147)"
                },
                "nativeOn": {
                  "click": "console.log('hhhh');alert('aaa')"
                },
                "props": {
                  "innerText": "bar"
                }
              },
              "components": null
            }, {
              "type": "div",
              "data": {
                "style": {
                  "width": "100%",
                  "height": "10rem",
                  "background-color": "rgb(145,147,43)"
                }
              },
              "components":[{
                "type":"button",
                "data": {
                  "style": {
                    "width": "50%",
                    "height": "5rem",
                    "line-height": "5rem",
                    "color":"#cbeb4d",
                    "background-color": "rgb(147,43,62)"
                  }
                },
                "components": null
              }],
            }],
          }
      ]
    }
  }
}
