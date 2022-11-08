new Vue({
    el: '#projeto1',
    data: {
        lifePlayer: 100,
        lifeMonster: 100,
        hitLog: [],
        playerAnim: 'player-idle',
        monsterAnim: 'monster-idle',
        splashScreen: true,
        endGame: false,
        givingUp: false,
        performingAction: false
    },
    computed: {
        gameResults() {
            return this.endGame ? ((this.lifePlayer > this.lifeMonster) && !this.givingUp ? "You win!" : "You lose...") : "Game still going";
        }
    },
    watch: {
        lifePlayer(newValue, oldValue) {
            // Alternative approach to call finishGame() after monster attack
            const playerDeath = () => {setTimeout(() => {this.addLogEntry("Monster", "defeated player", null);this.updateAnim("death", "player"); finishWithDelay();}, 2000)};
            const finishWithDelay = () => {setTimeout(() => {this.finishGame(false);},2300)};
            if(this.lifePlayer == 0) {
                playerDeath();
                
                // Here's another approach using promises - which I have not studied yet.
                // let promise = new Promise((resolve) => {
                //     setTimeout(() => {
                //         this.addLogEntry("Monster", "defeated player", null);
                //         this.updateAnim("death", "player");
                //         resolve();
                //     }, 2000)
                // });
                // // timeout to endgame + timeout of the animation above
                // promise.then(() => {
                //     setTimeout(() => {
                //         this.finishGame(false);
                //     }, 2300)
                // });
            }
        },
        lifeMonster(newValue, oldValue) {
            const monsterDeath = () => {setTimeout(() => {this.addLogEntry("Player", "defeated mosnter", null);this.updateAnim("death", "mosnter"); finishWithDelay();}, 1650)};
            const finishWithDelay = () => {setTimeout(() => {this.finishGame(false);}, 1450)};
            if(this.lifeMonster == 0) {
                monsterDeath();
            }
        }
    },
    methods: {
        startGame() {
            this.lifePlayer = 100;
            this.lifeMonster = 100;
            this.hitLog = [];
            this.playerAnim = 'player-idle';
            this.monsterAnim = 'monster-idle';
            this.splashScreen = false;
            this.endGame = false;
            this.givingUp = false;
            this.performingAction = false;
        },
        finishGame(givingUp) {
            if(givingUp) this.givingUp = true;
            this.splashScreen = true;
            this.endGame = true;
            
        },
        getLifebarBg(characterType) {
            if(characterType == 'player') {
                return this.lifePlayer > 20? 'green' : 'red';
            } else {
                return this.lifeMonster > 20? 'green' : 'red';
            }
        },
        addLogEntry(characterType, action, actionValue) {
            actionValue != null ? 
                this.hitLog.unshift({[`${characterType}`]: `${characterType} ${action} with ${actionValue}`})
                : this.hitLog.unshift({[`${characterType}`]: `${characterType} ${action}`});
        },
        getRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        updateAnim(animation, characterType) {
            // Ideally this should return promises
            if(characterType == "player") {
                this.playerAnim = "player-" + animation;
                if(animation == "attack" || animation == "specialAttack") {
                    this.monsterAnim = "monster-hit";
                }
            } else {
                if(animation == "attack" || animation == "specialAttack") {
                    this.playerAnim = "player-hit";
                }
                this.monsterAnim = "monster-" + animation;
            }

            if(animation != "death") {
                setTimeout(() => {
                    this.playerAnim = "player-idle",
                    this.monsterAnim = "monster-idle"
                }, characterType == "player" ? 1650 : 2000);
            }
        },
        updateLife(characterType, value, action) {
            if(action == "heal") {
                //Math.min prevents life going over 100
                this.lifePlayer = Math.min(this.lifePlayer + value, 100);
                return false;
            }
            switch(characterType) {
                case 'player': {
                    this.lifePlayer = Math.max(this.lifePlayer - value, 0);
                    if(this.lifePlayer == 0) {
                        return true;
                    }
                    break;
                }
                case 'monster': {
                    this.lifeMonster = Math.max(this.lifeMonster - value, 0);
                    if(this.lifeMonster == 0) {
                        return true;
                    }
                    break;
                }
            }

            return false;
        },
        attack(special, characterType = null) {
            this.performingAction = true;
            // random hit attack
            // only player has special attack
            let playerAttack = special ? this.getRandom(9, 15) : this.getRandom(5, 10);
            let monsterAttack = this.getRandom(8, 12);
            
            // characterType null means both characters will attack
            // TODO: update this to be recursive
            if(characterType == null) {
                // player attacks first
                if (special) {
                    this.addLogEntry("Player", "used a special attack against monster", playerAttack);
                    this.updateAnim("specialAttack", "player");
                } else {
                    this.addLogEntry("Player", "attacked monster", playerAttack);
                    this.updateAnim("attack", "player");
                }
                // stop attack function if monster dies here so monster doesn't attack after dying
                if(this.updateLife("monster", playerAttack, "attack")) {
                    return;
                }
                // Then monster attacks
                setTimeout(() => {
                    this.attack(false, "monster");
                }, 1700);
            } else {
                switch(characterType) {
                    case "player":
                        this.addLogEntry("Player", "attacked enemy", playerAttack);
                        this.updateAnim("attack", "player");
                        this.updateLife("monster", playerAttack, "attack");
                        break;
                    case "monster":
                        this.addLogEntry("Monster", "attacked player", monsterAttack);
                        this.updateAnim("attack", "monster");
                        this.updateLife("player", monsterAttack, "attack");
                        break;
                }
                setTimeout(() => {
                    if(this.lifePlayer > 0 && this.lifeMonster > 0)
                        this.performingAction = false;
                }, 2000);
            }
        },
        heal() {
            this.performingAction = true;
            // random hit attack
            let playerAttack = this.getRandom(8, 20);
            let monsterAttack = this.getRandom(8, 12);;

            // player heals first
            this.updateLife("player", playerAttack, "heal");
            this.addLogEntry("Player", "healed themself", playerAttack);
            this.updateAnim("heal", "player");

            // then monster attacks
            setTimeout(() => {
                this.attack(false, "monster");
            }, 2000);
        }
    }
})