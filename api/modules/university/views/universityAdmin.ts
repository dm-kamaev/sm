import {UniversityInstance} from '../models/University';
import {UniversityAdmin, UniversityAdminList} from '../types/university';

class UniversityAdminView {
    public render(university: UniversityInstance): UniversityAdmin {
        return {
            id: university.id,
            name: university.name,
            abbreviation: university.abbreviation,
            description: university.description,
            image: university.imageUrl,
            relapImage: university.relapImageUrl,
            links: university.links,
            militaryDepartment: university.militaryDepartment,
            dormitory: university.dormitory,
            totalScore: university.totalScore,
            score: university.score,
            scoreCount: university.scoreCount,
            reviewCount: university.reviewCount,
            createdAt: university['created_at'],
            updatedAt: university['updated_at'],
            city: university.city,
            profiles: university.profiles
        };
    }

    public renderAll(
        universities: UniversityAdminList[]
    ): UniversityAdminList[] {
        const hashUniversities: {[key: string]: UniversityAdminList} = {};
        const res = universities.forEach((university: UniversityAdminList) => {
            const universityId = university.id;
            if (hashUniversities[universityId]) {
                hashUniversities[universityId].profilesName +=
                    ', ' + university.profileName;
            } else {
                hashUniversities[universityId] = {
                    id: universityId,
                    name: university.name,
                    abbreviation: university.abbreviation,
                    cityName: university.cityName,
                    profilesName: university.profileName,
                    programCount: university.programCount,
                    updatedAt: university.updatedAt,
                };
            }
        });
        return Object.keys(hashUniversities).map(function(
            universityId: string
        ): UniversityAdminList {
            return hashUniversities[universityId];
        });
    }
}

export const universityAdminView = new UniversityAdminView();

// program_id