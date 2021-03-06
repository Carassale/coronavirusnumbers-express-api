/**
 * @api {get} /api/v1/country Country index
 * @apiGroup Country
 * @apiName CountryIndex
 * @apiDescription Returns information from all countries.
 * @apiVersion 0.1.0
 *
 * @apiParam (Query params) {Number{0..}} [page=0] Page to show.
 * @apiParam (Query params) {Number{0..}} [per_page=20] Element per page to show.
 * @apiParam (Query params) {String="name","confirmed","recovered","deaths","active","updatedAt"} [order_by=name] Order by value.
 * @apiParam (Query params) {String="asc","desc"} [order_direction=asc] Order direction.
 *
 * @apiSuccess {Object[]} countries Countries list.
 * @apiSuccess {String} countries._id Country id.
 * @apiSuccess {String} countries.name Country name.
 * @apiSuccess {Date} countries.updatedAt Country last update.
 * @apiSuccess {Number} countries.latitude Country geo latitude.
 * @apiSuccess {Number} countries.longitude Country geo longitude.
 * @apiSuccess {Number} countries.confirmed Confirmed patients.
 * @apiSuccess {Number} countries.recovered Recovered patients.
 * @apiSuccess {Number} countries.deaths Deaths.
 * @apiSuccess {Number} countries.active Active.
 *
 * @apiSuccess {Object} paginator Paginator object.
 * @apiSuccess {Number} paginator.page Indicates the current page.
 * @apiSuccess {Number} paginator.per_page Indicates the number of items per current page.
 * @apiSuccess {Number} paginator.total_elements Indicates the maximum number of items.
 */

/**
 * @api {get} /api/v1/country/:id Country show
 * @apiGroup Country
 * @apiName CountryShow
 * @apiDescription Returns the information for the selected country.
 * @apiVersion 0.1.0
 *
 * @apiParam (Query params) {String} id Country id.
 *
 * @apiSuccess {String} _id Country id.
 * @apiSuccess {String} name Country name.
 * @apiSuccess {Date} updatedAt Country last update.
 * @apiSuccess {Number} latitude Country geo latitude.
 * @apiSuccess {Number} longitude Country geo longitude.
 * @apiSuccess {Number} confirmed Confirmed patients.
 * @apiSuccess {Number} recovered Recovered patients.
 * @apiSuccess {Number} deaths Deaths.
 * @apiSuccess {Number} active Active.
 */
