/**
 * @api {get} /api/v1/user/:deviceToken/status/:country_id User notification status for country
 * @apiGroup User
 * @apiName UserNotificationStatus
 * @apiDescription Returns if the user already has notifications active for the selected country id.
 * @apiVersion 0.1.0
 *
 * @apiParam (Query params) {String} deviceToken Device token.
 * @apiParam (Query params) {String} country_id Country id.
 *
 * @apiSuccess {Boolean} active True if notifications are active.
 */

/**
 * @api {post} /api/v1/country/:device_token/subscribe/:country_id User subscribe notification for country
 * @apiGroup User
 * @apiName UserSubscribeNotification
 * @apiDescription Subscribes a token device to country notifications.
 * @apiVersion 0.1.0
 *
 * @apiParam (Query params) {string} device_token Device token.
 * @apiParam (Query params) {String} country_id Country id to subscribe.
 */

/**
 * @api {post} /api/v1/country/:device_token/unsubscribe/:country_id User unsubscribe notification for country
 * @apiGroup User
 * @apiName UserUnsubscribeNotification
 * @apiDescription Unsubscribe a token device from country notifications.
 * @apiVersion 0.1.0
 *
 * @apiParam (Query params) {string} device_token Device token to unsubscribe.
 * @apiParam (Query params) {String} country_id Country id to subscribe.
 */
