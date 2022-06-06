import request from '@/request'

export function getPatients() {
    return request({
        url: '/patient',
        method: 'get',
    })
}

export function getPatientbyId(patientId) {
    return request({
        url: `/patient/${patientId}`,
        method: 'get',
    })
}

export function updateHistory(patientId, history) {
    const data = {
        patientId,
        history
    }
    return request({
        url: `/patient/history/${patientId}`,
        method: 'put',
        data:data
    })
}

export function deletePatientbyId(patientId) {
    return request({
        url: `/patient/${patientId}`,
        method: 'delete',
    })
}

export function insertPatient(patientName, patientAge, patientSex, history)
{
    const data={
        patientName,
        patientAge,
        patientSex,
        history
    }
    return request({
        url: '/patient',
        method: 'post',
        data
    })
}

export function updatePatient(patientId,patientName, patientAge, patientSex, history)
{
    const data={
        patientName,
        patientAge,
        patientSex,
        history
    }
    return request({
        url: `/patient/${patientId}`,
        method: 'put',
        data
    })
}

export function queryPatients(query)
{
    return request({
        url: `/patient/query/${query}`,
        method: 'get',
    })
}