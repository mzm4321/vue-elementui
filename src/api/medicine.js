import request from '@/request'

export function getMedicines() {
    return request({
        url: '/medicine',
        method: 'get',
    })
}

export function getMedicinebyId(medicineId) {
    return request({
        url: `/medicine/${medicineId}`,
        method: 'get',
    })
}

export function deleteMedicinebyId(medicineId) {
    return request({
        url: `/medicine/${medicineId}`,
        method: 'delete',
    })
}

export function addMedicine(medicineName,medicineNum)
{
    const data={
        medicineName,medicineNum
    }
    return request({
        url: '/medicine',
        method: 'post',
        data
    })
}

export function updateMedicine(medicineId,medicineName, medicineNum)
{
    const data={
        medicineName, medicineNum
    }
    return request({
        url: `/medicine/${medicineId}`,
        method: 'put',
        data
    })
}


export function queryMedicines(query)
{
    return request({
        url: `/medicine/query/${query}`,
        method: 'get',
    })
}
