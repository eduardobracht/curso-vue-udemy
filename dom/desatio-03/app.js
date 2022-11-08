new Vue({
    el: '#desafio',
    data: {
        valor: 0,
        // resultado: 'Valor Diferente'
    },
    computed: {
        resultado() {
            return this.valor == 37 ? 'Valor Igual' : 'Valor Diferente'
        }
    },
    watch: {
        // valor(valorNovo, valorVelho) {
        //     if (valorNovo == 37) {
        //         this.resultado = "Valor Igual"
        //     }
        // },
        resultado(resultadoNovo, resultadoVelho) {
            setTimeout(() => {
                this.valor = 0
                //this.resultado = "Valor Diferente"
            }, 5000)
        }
    }
});