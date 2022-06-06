export default {
    state: {
        menu: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'el-icon-s-home',
            },
            {
                label: '门诊管理',
                icon: 'el-icon-school',
                name:'medical',
                children: [
                    {
                        path: '/medical/showdoctor/1',
                        label: '内科',
                        icon: 'el-icon-setting',
                    },
                    {
                        path: '/medical/showdoctor/2',
                        label: '外科',
                        icon: 'el-icon-setting',
                    },
                    {
                        path: '/medical/showdoctor/3',
                        label: '急诊科',
                        icon: 'el-icon-setting',
                    },
                    {
                        path: '/medical/getGuahao',
                        label: '挂号信息',
                        icon: 'el-icon-setting',
                    },
                ]
            },
            {
                label: '医生管理',
                name: 'doctor',
                icon: 'el-icon-s-custom',
                children: [
                    {
                      path:'/doctor',
                      label: '医生信息',
                      icon: 'el-icon-setting',
                    },
                    {
                        path: '/doctor/add',
                        label: '添加医生',
                        icon: 'el-icon-setting',
                    },
                ]
            },
            {
                label: '患者管理',
                icon: 'el-icon-user',
                name:'patient',
                children: [
                    {
                        path: '/patient',
                        label: '病人信息',
                        icon: 'el-icon-setting',
                    },
                    {
                        path: '/patient/add',
                        label: '添加病人',
                        icon: 'el-icon-setting',
                    }
                ]
            },
            {
                label: '药品管理',
                icon: 'el-icon-suitcase',
                name:'medicine',
                children: [
                    {
                        path: '/medicine',
                        label: '药品库存',
                        icon: 'el-icon-setting',
                    },
                    {
                        path: '/medicine/add',
                        label: '药品入库',
                        icon: 'el-icon-setting',
                    }
                ]
            },
            {
                label: '用户管理',
                icon: 'el-icon-bangzhu',
                name:'user',
                children: [
                    {
                        path: '/user/password',
                        name: 'page2',
                        label: '更改密码',
                        icon: 'el-icon-setting',
                        url: 'Other/PageTwo'
                    }
                ]
            },
        ]

    }
}