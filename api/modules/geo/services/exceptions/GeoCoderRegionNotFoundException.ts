import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

export class GeoCoderRegionNotFoundException extends Exception {
    public readonly name: string;

    constructor(
      cityName: string,
      addressComponents?: Array<{kind: string, name: string}>
    ) {
        addressComponents = addressComponents || [];
        super(
          `Not found region for "${cityName}" ` +
          `Adress component: ${JSON.stringify(addressComponents, null, 2)}`
        );

        this.name = 'GeoCoderRegionNotFoundException';
    }
}
