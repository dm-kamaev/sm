export type AppConfig = {
    schools: {
        analyticsId: string,
        yandexMetrikaId: number,
        host: string
    },
    courses: {
        analyticsId: string,
        yandexMetrikaId: number,
        host: string,
        experimentId?: string
    },
    universities: {},
    facebookClientId: number
};
