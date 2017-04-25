import {BackendCity} from '../types/city';
import {Option} from '../../common/types/filterPanel';

class CityView {
    public filtersRender(city: BackendCity): Option {
        return {
            value: city.id,
            label: city.name
        };
    }

    public filtersListRender(cities: BackendCity[]): Option[] {
        return cities.map(this.filtersRender);
    }
}

export const cityView = new CityView();
