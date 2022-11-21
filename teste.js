const users = [
    {
        "_id": "6377df2665c7b40017e8f1da",
        "nome": "Marcos",
        "email": "marcos@gmail.com",
        "setor": "Webdev",
        "foto": "",
        "tarefas": [
            {
                "nome": "teste1",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "teste2",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "task3",
                "feito": 0,
                "data_conclusao": ""
            }
        ]
    },
    {
        "_id": "6377df4065c7b40017e8f1db",
        "nome": "Luiz",
        "email": "luiz@gmail.com",
        "setor": "webdev",
        "foto": "https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg",
        "tarefas": [
            {
                "nome": "tarefa1",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "tarefa2",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "tarefa3",
                "feito": 0,
                "data_conclusao": ""
            }
        ]
    },
    {
        "_id": "6377df5665c7b40017e8f1dc",
        "nome": "Augusto",
        "email": "augusto@gmail.com",
        "setor": "Webdev",
        "foto": "",
        "tarefas": [
            {
                "nome": "job1",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "job2",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "job3",
                "feito": 0,
                "data_conclusao": ""
            }
        ]
    },
    {
        "_id": "6377df6e65c7b40017e8f1dd",
        "nome": "Tibério",
        "email": "tiberio@gmail.com",
        "setor": "Webdev",
        "foto": "",
        "tarefas": [
            {
                "nome": "task1",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "task2",
                "feito": 0,
                "data_conclusao": ""
            },
            {
                "nome": "task3",
                "feito": 0,
                "data_conclusao": ""
            }
        ]
    }
]

let tarefas = users.map(user => {
    return user.tarefas.map(tarefa => {
        return tarefa.nome
    })
})

console.log(tarefas.flat())