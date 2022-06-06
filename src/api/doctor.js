import request from '@/request'


export function getDoctors() {
    return request({
        url: '/doctor',
        method: 'get',
    })
}

export function getDoctorsbyDepartId(departId) {
    return request({
        url: `/doctor/depart/${departId}`,
        method: 'get',
    })
}

export function getNoStopDoctorsbyDepartId(departId) {
    return request({
        url: `/doctor/nostop/depart/${departId}`,
        method: 'get',
    })
}

export function deleteDoctorbyId(doctorId) {
    return request({
        url: `/doctor/${doctorId}`,
        method: 'delete',
    })
}

export function getDoctorbyId(doctorId) {
    return request({
        url: `/doctor/${doctorId}`,
        method: 'get',
    })
}

export function insertDoctor(doctorName, doctorAge, history, title, stop, hospitalTime, doctorDetail, doctorSex, doctorImg, departId)
{
    const data={
            doctorName,
            doctorAge,
            history,
            title,
            stop,
            hospitalTime,
            doctorDetail,
            doctorSex,
            doctorImg,
            departId
    }
    return request({
        url: '/doctor',
        method: 'post',
        data
    })
}

export function updateDoctor(doctorId,doctorName, doctorAge, history, title, stop, hospitalTime, doctorDetail, doctorSex, doctorImg, departId)
{
    const data={
        doctorName,
        doctorAge,
        history,
        title,
        stop,
        hospitalTime,
        doctorDetail,
        doctorSex,
        doctorImg,
        departId
    }
    return request({
        url: `/doctor/update/${doctorId}`,
        method: 'put',
        data
    })
}

