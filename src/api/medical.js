import request from '@/request'

export function getGuahao() {
    return request({
        url: '/medical',
        method: 'get',
    })
}

export function getGuahaobyId(medicalId) {
    return request({
        url: `/medical/${medicalId}`,
        method: 'get',
    })
}
export function updatePrescription(medicalId,prescription) {
    const data = {
        medicalId,
        prescription,
    }
    return request({
        url: `/medical/${medicalId}`,
        method: 'put',
        data:data
    })
}

export function deleteGuahaobyId(medicalId) {
    return request({
        url: `/medical/${medicalId}`,
        method: 'delete',
    })
}

export function insertGuahao(patientId,doctorId,date) {
    const data = {
        patientId,
        doctorId,
        date
    }
    return request({
        url: `/medical`,
        method: 'post',
        data:data
    })
}
