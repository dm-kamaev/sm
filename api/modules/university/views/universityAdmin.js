"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UniversityAdminView {
    render(university) {
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
    renderAll(universities) {
        const hashUniversities = {};
        const res = universities.forEach((university) => {
            const universityId = university.id;
            if (hashUniversities[universityId]) {
                hashUniversities[universityId].profilesName +=
                    ', ' + university.profileName;
            }
            else {
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
        return Object.keys(hashUniversities).map(function (universityId) {
            return hashUniversities[universityId];
        });
    }
}
exports.universityAdminView = new UniversityAdminView();
// program_id 
