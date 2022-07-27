function getRandomStrikeValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      return { width: this.playerHealth + '%' };
    },
  },

  methods: {
    attackMonster() {
      const strikeValue = getRandomStrikeValue(5, 12);
      this.monsterHealth -= strikeValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const strikeValue = getRandomStrikeValue(8, 15);
      this.playerHealth -= strikeValue;
    },
  },
});

app.mount('#game');
