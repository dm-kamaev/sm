"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CityView {
    filtersRender(city) {
        return {
            value: city.id,
            label: city.name
        };
    }
    filtersListRender(cities) {
        return cities.map(this.filtersRender);
    }
}
exports.cityView = new CityView();
