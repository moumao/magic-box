export function componentFactory(createElement, components, componentList){
  if (components && Array.isArray(components)){
    const res = components.map(component => {
      const { type, components } = component;
      return createElement(componentList[type], {},
        componentFactory(createElement, components, componentList))
      });
    return res
  }
}

export function distributeData(components){

}

export function getMockSchema(id) {
  return {
    "data":{
      "global":{
          "timeline":"TikTok大咖&紅人帶你飛紅人名單",
          "shareimage":"",
          "useCache":true,
      },

      "components":[
          {
            "type":"button",
            "style": {
              "width":750,
              "height":30,
              "color":"#4DA9EB"
            },
            "components":null
          },
          {
            "type":"button",
            "style": {
              "width":750,
              "height":30,
              "color":"#4DA9EB"
            },
            "components":null
          },
          {
            "type":"button",
            "style": {
              "width":750,
              "height":30,
              "color":"#4DA9EB"
            },
            "components":null
          }
      ]
    }
  }
}
