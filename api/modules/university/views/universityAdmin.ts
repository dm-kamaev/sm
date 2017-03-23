import {UniversityInstance} from '../models/University';
import {UniversityAdmin} from '../types/university';

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
}

export const universityAdminView = new UniversityAdminView();
