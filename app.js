function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        this.playerHealth = 0;
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw
        this.winner = 'draw';
      } else if (value <= 0) {
        //player lost
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Monster lost
        this.winner = 'player';
      }
    },
  },
  methods: {
    startNewGame() {
      (this.monsterHealth = 100),
        (this.playerHealth = 100),
        (this.currentRound = 0),
        (this.winner = null);
    },
    attackMonster() {
      this.currentRound++;
      const strikeValue = getRandomValue(5, 12);
      this.monsterHealth -= strikeValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const strikeValue = getRandomValue(8, 15);
      this.playerHealth -= strikeValue;
    },
    specialAttack() {
      this.currentRound++;
      const strikeValue = getRandomValue(10, 25);
      this.monsterHealth -= strikeValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
    },
  },
});

app.mount('#game');
