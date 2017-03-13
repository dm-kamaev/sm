/**
 * @fileOverview View for olympiad results
 */

import {
    map as lodashMap,
    groupBy as lodashGroupBy
} from 'lodash';

import {
    OlympiadResultInstance
} from '../../../../api/modules/study/types/OlympiadResult';

type templateData = {
    years: Array<{
        label: string,
        text: string
    }>,
    results: Array<templateDataResults>
};

type templateDataResults = {
    top: Array<templateDataResult>,
    middle: Array<templateDataResult>,
    bottom: Array<templateDataResult>
};

type templateDataResult = {
    name: string,
    awardees?: number,
    winners?: number
};

class OlympiadResultsView {
    private static PositionType = {
        TOP: 'top',
        MIDDLE: 'middle',
        BOTTOM: 'bottom'
    };

    private static PrizeWinnerType = {
        AWARDEE: 'awardees',
        WINNER: 'winners'
    };

    private static PrizeWinnerValue = {
        AWARDEE: 'призер',
        WINNER: 'победитель'
    };

    public render(data: Array<OlympiadResultInstance>): templateData {
        const yearGrouped = lodashGroupBy(data, 'year');
        const years = Object.keys(yearGrouped);

        return {
            years: lodashMap(years, this.renderYear_),
            results: lodashMap(
                yearGrouped,
                yearResults => this.renderYearResults_(yearResults)
            )
        };
    }

    private renderYear_(yearValue) {
        return {
            label: yearValue,
            text: yearValue
        };
    }

    private renderYearResults_(
            yearResults: Array<OlympiadResultInstance>): templateDataResults {
        const result = yearResults.reduce(
            (result, value) => this.renderYearResult_(result, value),
            {
                top: [],
                middle: [],
                bottom: []
            }
        );
        return {
            top: result.top.sort(this.sorter_),
            middle: result.middle.sort(this.sorter_),
            bottom: result.bottom.sort(this.sorter_)
        };
    }

    private renderYearResult_(
            result: templateDataResults,
            value: OlympiadResultInstance): templateDataResults {
        const position = this.calculatePosition_(value),
            subject = this.getSubject_(value),
            positionResults = result[position],
            subjectResultIndex = positionResults.findIndex(
                item => item.name === subject
            );

        if (~subjectResultIndex) {
            const subjectResult = positionResults[subjectResultIndex];
            positionResults[subjectResultIndex] =
                this.increasePrizeWinnersAmount_(
                    value,
                    subjectResult
                );
        } else {
            positionResults.push(this.getSubjectResult_(value));
        }

        return result;
    }

    private calculatePosition_(value: OlympiadResultInstance): string {
        const grade = value.class;
        let position;

        if (grade > 9) {
            position = OlympiadResultsView.PositionType.BOTTOM;
        } else if (grade > 4) {
            position = OlympiadResultsView.PositionType.MIDDLE;
        } else {
            position = OlympiadResultsView.PositionType.TOP;
        }

        return position;
    }

    private getSubject_(value: OlympiadResultInstance): string {
        return value.subject.displayName;
    }

    private getSubjectResult_(
            value: OlympiadResultInstance): templateDataResult {
        const type = this.getPrizeWinnerType_(value);

        return {
            name: this.getSubject_(value),
            [type]: this.getPrizeWinnerAmount_(value)
        };
    }

    private increasePrizeWinnersAmount_(
            value: OlympiadResultInstance,
            subjectResult: templateDataResult): templateDataResult {
        const type = this.getPrizeWinnerType_(value),
            currentPrizeWinnerAmount = subjectResult[type] || 0,
            increasedPrizeWinnerAmount =
                currentPrizeWinnerAmount + this.getPrizeWinnerAmount_(value);

        return Object.assign(
            subjectResult,
            {
                [type]: increasedPrizeWinnerAmount
            }
        );
    }


    private getPrizeWinnerType_(value: OlympiadResultInstance): string {
        let result = null;

        if (value.status === OlympiadResultsView.PrizeWinnerValue.WINNER) {
            result = OlympiadResultsView.PrizeWinnerType.WINNER;
        } else if (
            value.status === OlympiadResultsView.PrizeWinnerValue.AWARDEE
        ) {
            result = OlympiadResultsView.PrizeWinnerType.AWARDEE;
        }

        return result;
    }

    private getPrizeWinnerAmount_(value: OlympiadResultInstance): number {
        return value.awardeeAmount;
    }

    private sorter_(value, other) {
        return (other.winners || 0) - (value.winners || 0) ||
            (other.awardees || 0) - (value.awardees || 0);
    }
}

export const olympiadResultsView = new OlympiadResultsView();
