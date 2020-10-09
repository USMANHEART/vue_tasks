
new Vue({
        el: '#app-vue',
        data() {
            return {
                tasks: [],
                currentTask: ''
            }
        },
        methods: {
            addTask: function()
            {
                // let post_data = {
                //     src: "en",
                //     dest: "zhCN",
                //     text: this.currentTask,
                //     email: "usmanheart@gmail.com",
                //     password: "PAKINDIA",
                //     premiumkey: null
                // }
                // axios.post("https://frengly.com/frengly/data/translateREST", post_data).
                // then((response) => {
                //     console.log(response.data.translation);
                //     this.tasks.push(response.data.translation)
                //   }
                // );
                this.tasks.push(this.currentTask);
                this.currentTask = '';
            },
            removeTask: function(index)
            {
                this.tasks.splice(index, 1);
            },
            copyTasks: function()
            {
                let el = document.createElement('textarea');
                let counter = 1;
                // el.value = this.tasks;
                el.value = '';
                for (const task of this.tasks) {
                    el.value += counter + ".";
                    el.value += task;
                    el.value += "\n";
                    counter++;
                }
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                console.log(el.value)
            }
        }
});
