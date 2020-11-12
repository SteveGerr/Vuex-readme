# projvuex

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

### Шпоргалка по Vuex

Последовательность действий:

Предполагается, что store уже создан!!!

1. в state  указываем данные, которое хотим получать/изменять
2. в getters пишем функцию для получения данных из store
Например:
    usersList: ({ List }) => Object.values(List)
    usersList - имя геттера,
    List - деструктурированный state 
    Object.values(List) - соответственно способ получения данных
    

3. Создаём мутацию(mutations)(изменение данных в store).
Например:
    ADD_USER(state, user) {
        //  Vue.set("куда", "под каким ключем", "что записываем")
        Vue.set(state.List, user.id, user);
        Чтобы работал Vue.set(), необходимо импортировать в store vue, в самом верху(import Vue from "vue";)
    }
    ADD_USER - имя мутации,
    user - данные, которые меняем

4. Создаём действия(actions), которые вызывают мутации. Если асинхронных данных нет, то в принципе можно обойтись и без них.
Например: 
        Деструктурируем и вытягиваем функцию commit,
        чтобы не писать context.commit("ADD_USER"); :)
        user - это аргумент, данные, которые приходят из компонентов
        при вызове действия
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

5. НЕ забываем экспортировать store(export default usersStore)

6. Далее, идём в компонент, который будет обращаться к хранилищу.

7. Вешаем событие, по которому будет происходить обращение
    Например:
        <button @click="addUser">Add user</button>
8. Импортируем actions.
    Например: 
        import { mapActions } from "vuex";

9. Вызываем action в методах.
      //users - имя стора, addNewUser - имя action    
    ...mapActions("users", ["addNewUser"])

10. Описываем метод.
        Например: 
            addUser() {
            const newUser = {
                name: "Dima",
                age: 2
            };

            //и передаём в action созданного пользователя
            this.addNewUser(newUser);
            }

11. Далее в компоненте, в котором необходимо отобразить изменения, импортируем геттеры.
    import { mapGetters } from 'vuex'

12. и передаём их в вычисляемые свойства
    computed: {
        mapGetters('name store in modules', ['nameGetter', 'nameGetter2', ...])

        ...mapGetters('users', ['usersList'])
    }

