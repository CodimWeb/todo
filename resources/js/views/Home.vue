<script>

import { onMounted, toRefs, reactive } from 'vue';
import axios from 'axios'

export default {
    name: 'Home',
    components: {

    },
    setup(props) {
        const state = reactive({
            todoList: [],
            todo: {
                id: null,
                title: '',
                is_done: false
            },
            todoRules: [
                value => {
                    if(value && value.length > 0) return true
                    return 'Enter todo name'
                }
            ]

        })

        onMounted(() => {
            axios.get('/api/todo/').then((res) => {
                state.todoList = res.data
            })
        })

        const addTodo = (e) => {
            e.preventDefault()
            axios.post('/api/todo/', state.todo).then((res) => {
                state.todoList = res.data
                state.todo.title = ''
            })
        }

        const doneTodo = (todo) => {
            todo.is_done = true
            axios.put(`/api/todo/${todo.id}`, todo).then((res) => {
                console.log(res.data)
            })
        }

        const removeTodo = (todo) => {
            axios.delete(`/api/todo/${todo.id}`).then((res) => {
                if(res.data.success) {
                    state.todoList = state.todoList.filter(item => item.id != todo.id)
                }
            })
        }



        return {
            ...toRefs(state),
            addTodo,
            doneTodo,
            removeTodo
        }
    }
}

</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="8" offset-sm="2">
                <v-form @submit="addTodo">
                    <div class="d-flex align-center">
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            color="primary"
                            v-model="todo.title"
                            :rules="todoRules"
                            hide-details="true"
                        />
                        <v-btn
                            variant="elevated"
                            color="success"
                            class="ml-2"
                            type="submit"
                        >
                            Add
                        </v-btn>
                    </div>
                </v-form>
                <div v-if="todoList.length" class="mt-4">
                    <v-card v-for="todo in todoList" :key="todo.id" class="mb-2">
                        <v-card-item>
                            <div class="d-flex justify-content-between w-100">
                                <div class="h5">{{todo.title}}</div>
                                <div class="ml-auto d-flex">
                                    <v-icon v-if="todo.is_done" icon="mdi-check" class="mx-1" color="success"/>
                                    <v-btn v-else color="warning" size="x-small" class="mx-1" @click.prevent="doneTodo(todo)">Done</v-btn>
                                    <v-btn color="error" size="x-small" class="mx-1" @click.prevent="removeTodo(todo) ">Delete</v-btn>
                                </div>
                            </div>
                        </v-card-item>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
