# nodejs_exercise
练习用nodejs写API和数据库交互
# 卡住的地方
> node:_http_outgoing:573
    throw new ERR_HTTP_HEADERS_SENT('set');
    ^

> Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:371:5)
    at ServerResponse.setHeader (node:_http_outgoing:573:11)
    at /Users/pan/Desktop/pumyung/国科大春季/实用生物信息/002HW/scripts/nodejs_exercise/scripts2/server.js:24:13
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3) {
  code: 'ERR_HTTP_HEADERS_SENT'
> }
