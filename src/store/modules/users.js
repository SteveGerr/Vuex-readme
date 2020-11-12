import Vue from "vue"; //Чтобы использовать функции vue в store

const usersStore = {
    namespaced: true,

    state: {
        List: {
            name: 'Ivan',
            h: 177
        }
    },

    getters: {
                                //Получаем значения свойств объекта List
        usersList: ({ List }) => Object.values(List)
    },

    mutations: {
        // переопределяем state
        ADD_USER(state, user) {
            // console.log(state);
            // console.log(user);
            //  Vue.set("куда", "под каким ключем", "что записываем")
            Vue.set(state.List, user.id, user);
        }
    },

    actions: {
        //Создаём экшн:)
        //Деструктурируем и вытягиваем функцию commit,
        //чтобы не писать context.commit("ADD_USER"); :)
        //user - это аргумент
        addNewUser({ commit }, user) {
            // описываем user
            const newUser = {
                //ДЕструктурируем поступившие из компонента HelloWorld данные
                ...user,
                // добавляем id 
                id: String(Math.random())
            };
            // console.log(newUser);
            //Вызываем мутацию, чтобы внести изменение в этот Store
            commit("ADD_USER", newUser);
        }
    },
}

export default usersStore;