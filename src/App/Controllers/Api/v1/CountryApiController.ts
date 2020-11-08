import { Request, Response } from 'express';

import CountryDataHandler from '../../../DataHandlers/CountryDataHandler';
import CountryService from '../../../Services/CountryService';
import { Country } from '../../../Models/CountryModel';
import Paginator from '../../../../utils/paginator';

export default class CountryApiController {
  private countryService: CountryService;

  private countryDataHandler: CountryDataHandler;

  constructor() {
    this.countryService = new CountryService();
    this.countryDataHandler = new CountryDataHandler();
  }

  public async index(req: Request, res: Response) {
    const page = req.query.page ? +req.query.page : 0;
    const per_page = req.query.per_page ? +req.query.per_page : 200;
    const order_by = req.query.order_by ? req.query.order_by : 'name';
    const order_direction = req.query.order_direction ? req.query.order_direction : 'asc';

    const paginator: Paginator = new Paginator(page, per_page);
    const countries = await this.countryService.all(undefined, undefined, paginator, {
      [order_by]: order_direction == 'desc' ? -1 : 1,
    });
    res.json({
      countries: countries.map((country: Country) => this.countryDataHandler.mapToShow(country)),
      paginator: {
        page: paginator.page,
        per_page: paginator.perPage,
        total_elements: paginator.recordsTotal,
      },
    });
  }

  public async show(req: Request, res: Response) {
    const {id} = req.params;

    const country = await this.countryService.get(id);
    res.json(this.countryDataHandler.mapToShow(country));
  }
}
