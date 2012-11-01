var oauthModule = require('./oauth2')
  , querystring= require('querystring');

var shopify = module.exports =
oauthModule.submodule('shopify')
  .configurable({
      storeName: 'specify types of access: See http://developers.facebook.com/docs/authentication/permissions/',
      fields: 'specify returned fields: See http:/developers.facebook.com/docs/reference/api/user/'
  })
  .oauthHost('https://' + this.storeName() + '.myshopify.com')
  .apiHost('https://' + this.storeName() + '.myshopify.com')
  .authPath('/admin/oauth/authorize')
  .fetchOAuthUser(function (accessToken) {
    console.log("Access Token: ", accessToken);
    var promise = this.Promise();
    request.get({
        url: this.apiHost() + '/user'
      , headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }, function (err, res, body) {
      if (err) return promise.fail(err);
      if (parseInt(res.statusCode / 100, 10) !== 2) {
        return promise.fail(body);
      }
      return promise.fulfill(JSON.parse(body));
    });

    return promise;
  });