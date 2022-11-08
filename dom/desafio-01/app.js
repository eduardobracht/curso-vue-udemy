new Vue({
    el: '#desafio',
    data: {
        name: 'Eduardo',
        age: 30,
        imgUrl: 'https://f4.bcbits.com/img/a1682806295_10.jpg'
    },
    methods: {
        getRandomNumber: function() {
            return Math.random()
        }
    }
})