new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods: {
        showAlert() {
            alert('Alerta!')
        },
        keyUp() {
            this.valor = event.target.value
        },
        keyDown() {
            this.valor = event.target.value
        }
    }
})