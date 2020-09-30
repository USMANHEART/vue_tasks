
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
                let value = this.currentTask;
                axios.post("https://frengly.com/frengly/data/translateREST", {
                    src: "en",
                    dest: "zhCN",
                    text: value,
                    email: "usmanheart@gmail.com",
                    password: "PAKINDIA",
                    premiumkey: null
                }).then((response) =>
                {
                    let translation = response.data.translation;
                    let english = value;
                    let data = {
                        eng: english,
                        trans: translation
                    }
                    this.tasks.push(data);
                });
                // this.tasks.push(this.currentTask);
            },
            removeTask: function(index)
            {
                this.tasks.splice(index, 1);
            }
        }
});
