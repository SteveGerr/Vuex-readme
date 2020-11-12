# vuex readme

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Шпаргалка по Vuex

Последовательность действий:

Предполагается, что store уже создан!!!

#### 1. в state  указываем данные, которые хотим получать/изменять

    state: {
        array: [],
        object: {},
        numbers: 8,
        boolean: true,
        ...
    }
#### 2. в getters пишем функцию для получения данных из store
Например:

    getters: {

        usersList: ({ List }) => Object.values(List)

        usersList - имя геттера,
        List - деструктурированный state 
        Object.values(List) - соответственно способ получения данных
    }
    

#### 3. Создаём мутацию(mutations)(изменение данных в store).
Например:

    mutations: {

        ADD_USER(state, user) {
            //  Vue.set("куда", "под каким ключем", "что записываем")
            Vue.set(state.List, user.id, user);
            Чтобы работал Vue.set(), необходимо импортировать в store vue, в самом верху(import Vue from "vue";)
        }
        ADD_USER - имя мутации,
        user - данные, которые меняем
    }

#### 4. Создаём действия(actions), которые вызывают мутации. Если асинхронных данных нет, то в принципе можно обойтись и без них.
Например:

        Деструктурируем и вытягиваем функцию commit,
        чтобы не писать context.commit("ADD_USER"); :)
        user - это аргумент, данные, которые приходят из компонентов
        при вызове действия

        actions: {

            addNewUser({ commit }, user) {
                // описываем user
                const newUser = {
                    //ДЕструктурируем поступившие из компонента HelloWorld данные
                    ...user,
                    // добавляем id 
                    id: String(Math.random())
                };
                Вызываем мутацию, чтобы внести изменение в этот Store
                commit("ADD_USER", newUser);
            }
        }    

#### 5. НЕ забываем экспортировать store:

    export default usersStore

#### 6. Далее, идём в компонент, который будет обращаться к хранилищу.

#### 7. Вешаем событие, по которому будет происходить обращение
Например:

        <button @click="addUser">Add user</button>
#### 8. Импортируем actions.
 Например:

        import { mapActions } from "vuex";

#### 9. Вызываем action в методах.

    methods: {
        //users - имя стора, addNewUser - имя action    
        ...mapActions("users", ["addNewUser"])
    }

#### 10. Описываем метод.
Например:

    methods: {

        ..mapActions("users", ["addNewUser"])

        addUser() {
        const newUser = {
            name: "Dima",
            age: 2
        };

        //и передаём в action созданного пользователя
        this.addNewUser(newUser);
        }
    }

#### 11. Далее в компоненте, в котором необходимо отобразить изменения, импортируем геттеры.
    import { mapGetters } from 'vuex'

#### 12. и передаём их в вычисляемые свойства

    computed: {
        mapGetters('name store in modules', ['nameGetter', 'nameGetter2', ...])

        ...mapGetters('users', ['usersList'])
    }

#### Итоговый store:

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

#### Компонент выполняющий изменения:

        <template>
            <div class="hello">
                <button @click="addUser">Add user</button>
            </div>
        </template>

        <script>
            import { mapActions } from "vuex";

            export default {
                name: "HelloWorld",
                props: {
                    msg: String
                },

                methods: {
                //users - имя стора, addNewUser - имя action    
                    ...mapActions("users", ["addNewUser"]),
                    

                    addUser() {
                    // console.log("Click");
                    const newUser = {
                        name: "Dima",
                        age: 2
                    }; 
                    //Вызываем action из Store
                    //и передаём в него созданного пользователяы
                    this.addNewUser(newUser);
                    }
                },
            };
        </script>

        
        <style scoped>
            .hello {
            font-size: 26px;
            }
        </style>

#### Компонент отображающий изменения:

    <template>
        <div>
            {{ usersList }}
        </div>
    </template>

    <script>

        import { mapGetters } from 'vuex'

        export default {
        name: 'Header',

        computed: {
            //mapGetters('name store in modules', ['nameGetter', 'nameGetter2', ...])
            ...mapGetters('users', ['usersList'])
        }
        }
    </script>

    <style>

    </style>


