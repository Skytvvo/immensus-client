<template>
  <button class="button" :class="variantClass">
    <span v-if="$slots.leftIcon" class="button-icon button-icon--left">
      <slot name="leftIcon" />
    </span>

    <span class="button--content">
      <slot name="default" />
    </span>

    <span v-if="$slots.rightIcon" class="button-icon button-icon--right">
      <slot name="rightIcon" />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    //todo: enum
    variant: {
      type: String,
      default: "filled"
    }
  },
  computed:{
    variantClass(){
      //todo: extract
      const classByVariant = {
        filled: "button--filled",
        clean: "button--clean",
        outlined: "button-outline",
      };

      return classByVariant[this.variant];
    }
  }
};
</script>

<style scoped>
  .button {
    padding: 8px;
    border-radius: 10px;
    outline: none;
    display: inline-flex;
  }

  .button--filled {
    background: var(--background--primary--light);
    color: var(--text--primary);
  }

  .button--clean {
    background: transparent;
  }

  .button--outlined{
    background: transparent;
    outline: 1px solid var(--border--primary);
  }

  .button-icon{
    display: inline-flex;
    height: 24px;
    width: 24px;
  }
</style>