function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },

  methods: {
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
