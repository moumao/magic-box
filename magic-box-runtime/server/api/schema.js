const router = require('koa-router')()

router.get('/getById', async ( ctx ) => {
  ctx.body = {
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
})

module.exports = router
