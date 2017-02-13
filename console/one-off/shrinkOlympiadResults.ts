/**
 * @fileOverview Class, designed for shrink several records of olympiad results
 * into one with amount of awardees
 */

import {
    every as lodashEvery,
    reduce as lodashReduce
} from 'lodash';

import {service as olympiadResultService}
    from '../../api/modules/study/services/olimpResult';
import {
    OlympiadResultInstance,
    OlympiadResultAttribute
} from '../../api/modules/study/models/olimpResult';

const db = require('../../app/components/db');

class OlympiadResultsShrinker {
    public async shrink() {
        db.options.logging = false;
        const olympiadResults = await this.getOlympiadResults_();
        const dbData = this.processOlympiadResults_(olympiadResults);
        try {
            await this.writeToDb_(dbData);
            await this.destroyProcessed_(olympiadResults);
        } catch (error) {
            console.log(error);
        }
        db.options.logging = true;
    }

    private  async getOlympiadResults_():
        Promise<Array<OlympiadResultInstance>> {
        return await olympiadResultService.getAll();
    }

    private processOlympiadResults_(
            olympiadResults: Array<OlympiadResultInstance>
    ): Array<OlympiadResultAttribute> {
        return olympiadResults.reduce((previous, current) => {
            const foundIndex = this.findIndex_(current, previous);
            if (~foundIndex) {
                previous[foundIndex].awardeeAmount =
                    previous[foundIndex].awardeeAmount + 1;
            } else {
                const newAttributesEntry = this.getAttributeEntry_(current);
                previous.push(newAttributesEntry);
            }

            return previous;
        }, []);
    }

    /**
     * Search value in items and return it index in case success,
     * or -1 in case of failure
     */
    private findIndex_(value: OlympiadResultAttribute,
            items: Array<OlympiadResultAttribute>): number {
        return items.findIndex(item => this.isAttributesEqual_(item, value));
    }

    /**
     * Compare two attribute objects by not excluded keys
     */
    private isAttributesEqual_(current: OlympiadResultAttribute,
            compare: OlympiadResultAttribute): boolean {

        return lodashEvery(current, (attributeValue, attributeName) =>
            this.isAttributeEqual_(attributeValue, attributeName, compare)
        );
    }

    private isAttributeEqual_(value: string | number,
            name: string,
            compare: OlympiadResultAttribute): boolean {

        let isEquals = false;
        const isExcludedAttribute = this.isExcludedAttribute_(name);

        if (isExcludedAttribute) {
            isEquals = true;
        } else {
            isEquals = (value === compare[name]);
        }

        return isEquals;
    }

    private getAttributeEntry_(
            data: OlympiadResultInstance): OlympiadResultAttribute {
        const awardeeAmount = 1;
        return lodashReduce(
            data,
            (result, value, key) => {
                const isExcludedAttribute = this.isExcludedAttribute_(key);

                if (!isExcludedAttribute) {
                    result[key] = value;
                }

                return result;
            },
            {awardeeAmount});
    }

    private isExcludedAttribute_(name: string): boolean {
        const excludedKeys = [
            'id', 'stage', 'awardeeAmount', 'created_at', 'updated_at'
        ];
        return !!~excludedKeys.findIndex(keyName =>
            keyName === name
        );
    }

    private async writeToDb_(
            data: Array<OlympiadResultAttribute>): Promise<any> {
        return await data.map(olympiadResultService.create);
    }

    private async destroyProcessed_(instances: Array<OlympiadResultInstance>) {
        const id: Array<number> = instances.map(instance => instance.id);
        return await olympiadResultService.delete(id);
    }
}

export = new OlympiadResultsShrinker().shrink();
