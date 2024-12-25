<template>
  <button
    @click="triggerAction()"
    class="button"
    :class="buttonStyle"
    :type="buttontype"
  >
    {{ buttonlabel }}
  </button>
</template>

<script>
export default {
  props: {
    buttontype: {
      type: String,
      required: true,
    },
    buttonlabel: {
      type: String,
      required: true,
    },
    confirmation: {
      type: Boolean,
    },
    buttonstyle: {
      type: String,
    },
  },
  methods: {
    triggerAction() {
      if (this.confirmation) {
        if (confirm('Confirma a operação?')) {
          this.$emit('buttonActivated');
        }
        return;
      }
      this.$emit('buttonActivated');
    },
  },
  computed: {
    buttonStyle() {
      if (this.buttonstyle == 'warning') return 'warning-button';
      return 'standard-button';
    },
  },
};
</script>

<style>
.button {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.warning-button {
  background: firebrick;
  color: white;
}

.standard-button {
  background: darkcyan;
  color: white;
}
</style>
