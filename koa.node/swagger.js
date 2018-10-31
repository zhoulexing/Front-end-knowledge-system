const { SwaggerRouter } = require("koa-swagger-decorator");
const router = new SwaggerRouter();

router.swagger({
    title: "Example Server",
    description: "API DOC",
    version: "1.0.0",
  
    // [optional] default is root path.
    prefix: "/api",
  
    // [optional] default is /swagger-html
    swaggerHtmlEndpoint: "/swagger-html",
  
    // [optional] default is /swagger-json
    swaggerJsonEndpoint: "/swagger-json",
  
    // [optional] additional options for building swagger doc
    swaggerOptions: {
        securityDefinitions: {
            api_key: {
                type: "apiKey",
                in: "header",
                name: "api_key",
            },
        },
    },
});

router.mapDir(__dirname, {});

module.exports = router;
