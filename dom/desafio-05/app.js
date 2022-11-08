new Vue({
	el: '#desafio',
	data: {
		aplicarDestaque: true,
		aplicarEncolher: false,
		classeCSS1: 'classe1',
		classeCSS2: 'classe2',
		classeCSS3: '',
		classeCSS4: '',
		classeCSS5: false,
		myStyles: '',
		progressBar: 'width: 0%',
		percentage: 0
	},
	computed: {
		efeito1() {
			return {
				destaque: this.aplicarDestaque,
				encolher: this.aplicarEncolher
			}
		}
	},
	watch: {
		// percentage() { //comentar a linha 37 e usar essa watch tb funciona
		// 	this.progressBar = `width: ${this.percentage}%`;
		// }
	},
	methods: {
		iniciarEfeito() {
			setInterval(() => {
				this.aplicarDestaque = !this.aplicarDestaque
				this.aplicarEncolher = !this.aplicarEncolher
			}, 1000)
		},
		iniciarProgresso() {
			var intervalId = setInterval(() => {
				//console.log(this.percentage)
				this.percentage += 5;
				this.progressBar = "width: " + this.percentage + "%";
				if(this.percentage == 100) {
					clearInterval(intervalId);
				}
			}, 500)
		},
		aplicar5() {
			if (event.target.value == "true") {
				this.classeCSS5 = true;
			} else if (event.target.value == "false") {
				this.classeCSS5 = false;
			}
		}
	}
})
