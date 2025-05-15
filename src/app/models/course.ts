//skapar interface för kurs och exporterar den
export interface Course {
    courseCode: string;
    subjectCode: string;
    level: string;
    progression: string;
    courseName: string;
    points: number;
    institutionCode: string;
    subject: string;
    syllabus: string;
}