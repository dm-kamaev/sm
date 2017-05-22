import * as lodash from 'lodash';

import {
    service as programSearchDataService
} from '../../../api/modules/university/services/programSearchData';
import {SearchType} from '../../../api/modules/university/constants/SearchType';
import {PayType} from '../../../api/modules/university/constants/PayType';
import {
    ProgramFeature
} from '../../../api/modules/university/constants/ProgramFeature';

import {ProgramInstance} from '../../../api/modules/university/types/program';
import {
    ProgramSearchDataInstance
} from '../../../api/modules/university/types/programSearchData';
import {
    EntranceStatisticInstance
} from '../../../api/modules/university/models/EntranceStatistic';


export class ProgramActualizer {
    private program_: ProgramInstance;
    private programSearchData_: ProgramSearchDataInstance[];

    constructor(
            program: ProgramInstance,
            programSearchData: ProgramSearchDataInstance[]
    ) {
        this.program_ = program;

        this.programSearchData_ = programSearchData;
    }

    public async actualize(): Promise<void> {
        await Promise.all([
            this.actualizeCity_(),
            this.actualizeEge_(),
            this.actualizeMajor_(),
            this.actualizeDiscount_(),
            this.actualizeFeatures_(),
            this.actualizePaidType_()
        ]);
    }

    private async actualizeCity_(): Promise<void> {
        const cityId = this.program_.university.cityId;
        this.actualizeData_([cityId], SearchType.CITY);
    }

    private async actualizeEge_(): Promise<void> {
        const egeIds = this.program_.programEgeExams.map(programEgeExam =>
            programEgeExam.subjectId
        );
        this.actualizeData_(egeIds, SearchType.EGE);
    }

    private async actualizeMajor_(): Promise<void> {
        const programMajorId = this.program_.programMajorId;
        this.actualizeData_([programMajorId], SearchType.MAJOR);
    }

    private async actualizeDiscount_(): Promise<void> {
        const entranceStatisticLast = this.getLastStatistic_();
        const discount = entranceStatisticLast &&
            entranceStatisticLast.discount;
        const discountData = this.formatToBooleanData_(discount);
        this.actualizeData_(discountData, SearchType.DISCOUNT);
    }

    private async actualizeFeatures_(): Promise<void> {
        const features: number[] = [];
        const exchangeProgram = this.program_.exchangeProgram;
        const militaryDepartment = this.program_.university.militaryDepartment;
        const dormitory = this.program_.university.dormitory;
        if (exchangeProgram) {
            features.push(ProgramFeature.EXCHANGE_PROGRAM);
        }
        if (militaryDepartment) {
            features.push(ProgramFeature.MILITARY_DEPARTMENT);
        }
        if (dormitory) {
            features.push(ProgramFeature.DORMITORY);
        }
        this.actualizeData_(features, SearchType.FEATURES);
    }

    private async actualizePaidType_(): Promise<void> {
        const entranceStatistic = this.getLastStatistic_();
        let payType: number[] = [];
        if (entranceStatistic) {
            payType = this.getPayType_(entranceStatistic);
        }
        this.actualizeData_(payType, SearchType.PAY_TYPE);
    }

    private getPayType_(
            entranceStatistic: EntranceStatisticInstance
    ): number[] {
        const payType: number[] = [];
        if (entranceStatistic.egePassScore || entranceStatistic.budgetPlaces) {
            payType.push(PayType.BUDGET);
        }
        if (entranceStatistic.cost || entranceStatistic.commercialPlaces) {
            payType.push(PayType.COMMERCIAL);
        }
        return payType;
    }

    private formatToBooleanData_(value: string | boolean): [number] {
        return value ? [1] : [0];
    }

    private getLastStatistic_(): EntranceStatisticInstance | undefined {
        const entranceStatistics = this.program_.entranceStatistics;
        return entranceStatistics && entranceStatistics[0];
    }

    private async actualizeData_(
            values: number[],
            type: string
    ): Promise<void> {
        if (values && values.length) {
            const searchData = this.getSearchData_(type);
            if (!searchData) {
                programSearchDataService.create({
                    programId: this.program_.id,
                    values: values,
                    type: type
                });
            } else if (!lodash.isEqual(values, searchData.values)) {
                programSearchDataService.update(searchData.id, {values});
            }
        }
    }

    private getSearchData_(type: string): ProgramSearchDataInstance {
        return this.programSearchData_.find(searchItem =>
            searchItem.type === type &&
                searchItem.programId === this.program_.id
        );
    }
}
