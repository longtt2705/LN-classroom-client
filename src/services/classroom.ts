import { Classroom } from '../slices/classroom-slice'
import api from './api'
import pick from 'lodash/pick'

const BASE_URL = 'classrooms/'

export const createClassroom = (classroom: Classroom) => {
    return api.post(BASE_URL, classroom)
}

export const getAllClassroom = () => {
    return api.get(BASE_URL)
}

export const joinClassByLink = (token: string) => {
    return api.post(BASE_URL + "invitation", { token })
}

export const getInviteLink = (classId: string | undefined, isStudent: boolean) => {
    return api.get(`${BASE_URL}${classId}/invitation`, { params: { isStudent } })
}

export const sendInviteLink = (payload: {
    classId: string,
    isStudent: boolean,
    classroomName: string,
    email: string
}) => {
    return api.post(BASE_URL + "send-invitation", pick(payload, 'isStudent', 'classroomName', 'email'))
}

export const resetClassCode = (classId: string | undefined) => {
    return api.post(`${BASE_URL}${classId}/reset-classcode`)
}

export const joinClassroomByClassCode = (classCode: string) => {
    return api.post(BASE_URL + "join-by-classcode", { classCode })
}

export const removeFromClassroom = (classId: string, userId: string, isStudent: boolean) => {
    return api.delete(`${BASE_URL}${classId}/users/${userId}`, { data: { isStudent } })
}

export const getGradeStructure = (classId: string) => {
    return api.get(`${BASE_URL}${classId}/grade-structure`)
}

export const addGradeStructure = (classId: string, title: string, description: string, point: number) => {
    return api.post(`${BASE_URL}${classId}/grade-structure`, { title, description, point })
}

export const removeGradeStructure = (classId: string, gradeStructureId: string) => {
    return api.delete(`${BASE_URL}${classId}/grade-structure`, { data: { gradeStructureId } })
}

export const updateGradeStructure = (classId: string, gradeStructureId: string, title: string, description: string, point: number) => {
    return api.put(`${BASE_URL}${classId}/grade-structure`, { gradeStructureId, title, description, point })
}